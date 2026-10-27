#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7735.h>
#include <SPI.h>
#include <Wire.h>
#include <time.h>
#include <Adafruit_SHT31.h>

// --- สีเพิ่มเติมสำหรับหน้า Weather ---
#define ST77XX_DARKGREY   0x7BEF
#define ST77XX_LIGHTGREY  0xC618

// --- ปรับโครงสร้าง tImage ให้รับ 4 ค่าตามที่ไฟล์ Header กำหนด (data, width, height, bpp/16) ---
typedef struct {
  const uint16_t *data;
  uint16_t width;
  uint16_t height;
  uint16_t colorDepth;
} tImage;

// --- รวมไฟล์ Header สำหรับอนิเมชั่น GIF ทั้ง 8 เฟรม ---
#include "frame_000.h"
#include "frame_001.h"
#include "frame_002.h"
#include "frame_003.h"
#include "frame_004.h"
#include "frame_005.h"
#include "frame_006.h"
#include "frame_007.h"

// กำหนดพินหน้าจอตามเดิม
#define TFT_CS    9
#define TFT_DC    8
#define TFT_RST   7
#define TFT_MOSI  6
#define TFT_SCL   5

// กำหนดพินปุ่มกด (ตามแผนผังต่อเข้ากับพิน 3)
#define BUTTON_PIN 3

Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC, TFT_MOSI, TFT_SCL, TFT_RST);

// ตั้งค่าเซนเซอร์ SHT31 ตามแผนผัง (SDA = GPIO 0, SCL = GPIO 1)
Adafruit_SHT31 sht31 = Adafruit_SHT31();

// ตั้งค่า Wi-Fi
const char* ssid = "Your 2.4GHz WiFi SSID";
const char* password = "Your WiFi Password";

// ตั้งค่า API OpenWeatherMap (พิกัด KMITL)
String weatherApiKey = "29a54cc77dd691139c7ac31c477928c5";
String lat = "13.7299"; 
String lon = "100.7781";
String weatherEndpoint = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + weatherApiKey;

unsigned long lastWeatherFetch = 0;
const long weatherInterval = 600000; // อัปเดต API ทุกๆ 10 นาที

// ตัวแปรเก็บค่าสภาพอากาศภายนอก (Outdoor)
float outdoorTemp = 0.0;
float currentFeelsLike = 0.0;
int currentHumidity = 0;
String weatherDesc = "";

// ตัวแปรเก็บค่าสภาพอากาศภายใน (Indoor จาก SHT31)
float indoorTemp = 0.0;
int indoorHumidity = 0;

// ตั้งค่า Timezone ประเทศไทย GMT+7
const long gmtOffset_sec = 7 * 3600; 
const int daylightOffset_sec = 0;

unsigned long lastTimeUpdate = 0;
const long timeInterval = 1000; // เช็คเวลาทุกๆ 1 วินาที
int lastDisplayedMinute = -1; // ตัวแปรเก็บคาสถานะนาทีล่าสุด

// ตัวแปรสำหรับอัปเดตหน้าจอ Weather แบบ Non-blocking
unsigned long lastWeatherScreenUpdate = 0;
const long weatherScreenInterval = 2000; // อัปเดตหน้าจอ Weather ทุก 2 วินาที

// --- ระบบจัดการหน้าจอ (0 = Animation, 1 = นาฬิกา, 2 = สภาพอากาศ, 3 = Pomodoro) ---
int currentScreen = 0; 
bool lastButtonState = HIGH;
unsigned long buttonPressStartTime = 0;
bool buttonStateHandled = false;
const unsigned long HOLD_TIME = 2000; // กดค้าง 2 วินาทีเพื่อเปลี่ยนหน้า

// --- ตัวแปรสำหรับระบบ Animation GIF (ขนาด 48x48) ---
const tImage* animationFrames[] = {
  &frame_000, &frame_001, &frame_002, &frame_003,
  &frame_004, &frame_005, &frame_006, &frame_007
};
int currentFrame = 0;
unsigned long lastFrameTime = 0;
const long frameInterval = 60; 

// --- ตัวแปรสำหรับระบบ Pomodoro ---
enum TimerState { IDLE, RUNNING, PAUSED };
enum PomodoroMode { WORK_MODE, BREAK_MODE };

TimerState pomodoroState = IDLE;
PomodoroMode pomodoroMode = WORK_MODE;

const int WORK_TIME = 25 * 60; // 25 นาที
const int BREAK_TIME = 5 * 60;  // 5 นาที
int pomodoroTimeRemaining = WORK_TIME;
unsigned long lastPomodoroTick = 0;

// ตัวแปรสำหรับเช็ค Single / Double Click ของปุ่มในหน้า Pomodoro
unsigned long lastClickTime = 0;
int clickCount = 0;
const int doubleClickDelay = 300;

// ประกาศ Prototype ฟังก์ชันไว้ด้านบน ป้องกันปัญหา Scope Error
void updateAnimationScreen();
void updatePomodoroScreen();
void displayClockAndDate();
void drawStaticWeatherScreen();
void updateWeatherScreen();
void fetchWeatherData();

void setup() {
  Serial.begin(115200);

  // เริ่มต้นใช้งาน I2C สำหรับ SHT31 ตามแผนผัง (SDA = 0, SCL = 1)
  Wire.begin(0, 1);
  
  if (!sht31.begin(0x44) && !sht31.begin(0x45)) {
    Serial.println("Could not find a valid SHT31 sensor, check wiring!");
  }

  // ตั้งค่าพินปุ่มกด (ใช้ Pull-up ภายใน เนื่องจากต่อสวิตช์ลง GND)
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  tft.initR(INITR_MINI160x80_PLUGIN);
  tft.setRotation(3);
  tft.fillScreen(ST77XX_BLACK);

  // แสดงข้อความกำลังเชื่อมต่อ Wi-Fi บนจอ
  tft.setCursor(15, 35);
  tft.setTextColor(ST77XX_WHITE, ST77XX_BLACK);
  tft.setTextSize(1);
  tft.print("Connecting WiFi...");

  // เชื่อมต่อ Wi-Fi ครั้งเดียวใช้ร่วมกันทั้งระบบ
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // ซิงค์เวลากับ NTP Server
  configTime(gmtOffset_sec, daylightOffset_sec, "pool.ntp.org", "time.google.com");

  tft.fillScreen(ST77XX_BLACK);

  // ดึงข้อมูลสภาพอากาศครั้งแรกทันที
  fetchWeatherData(); 
}

void loop() {
  unsigned long currentMillis = millis();

  // ตรวจสอบการกดปุ่มแบบ Non-blocking (กดค้าง = เปลี่ยนหน้า, กดสั้น = ควบคุม Pomodoro เมื่ออยู่หน้า 3)
  bool currentButtonState = digitalRead(BUTTON_PIN);
  
  if (currentButtonState == LOW && lastButtonState == HIGH) {
    buttonPressStartTime = currentMillis;
    buttonStateHandled = false;
  } 
  else if (currentButtonState == LOW && lastButtonState == LOW) {
    if (!buttonStateHandled && (currentMillis - buttonPressStartTime >= HOLD_TIME)) {
      // --- เมื่อกดค้างครบ 2 วินาที: สลับหน้าจอวนลูป 4 หน้า (0 -> 1 -> 2 -> 3 -> 0) ---
      currentScreen = (currentScreen + 1) % 4; 
      tft.fillScreen(ST77XX_BLACK);      
      
      if (currentScreen == 0) {
        // หน้า Animation: เริ่มเล่นเฟรมแรกใหม่
        currentFrame = 0;
        lastFrameTime = 0;
      } else if (currentScreen == 1) {
        lastDisplayedMinute = -1; // บังคับให้นาฬิกาวาดใหม่ทันที
      } else if (currentScreen == 2) {
        // วาดโครงสร้างหน้า Weather แบบแบ่งครึ่ง Outdoor / Indoor
        drawStaticWeatherScreen();
        lastWeatherScreenUpdate = 0; 
      } else if (currentScreen == 3) {
        tft.fillRect(0, 0, 160, 16, ST77XX_MAGENTA);
        tft.setCursor(6, 4);
        tft.setTextColor(ST77XX_WHITE, ST77XX_MAGENTA);
        tft.setTextSize(1);
        tft.print("POMODORO 25:5");
        updatePomodoroScreen();
      }
      
      buttonStateHandled = true; 
    }
  } 
  else if (currentButtonState == HIGH && lastButtonState == LOW) {
    // ปล่อยปุ่ม
    if (!buttonStateHandled) {
      if (currentScreen == 3) {
        if (currentMillis - lastClickTime < doubleClickDelay) {
          clickCount++;
        } else {
          clickCount = 1;
        }
        lastClickTime = currentMillis;
      }
    }
    buttonStateHandled = false;
  }
  
  lastButtonState = currentButtonState;

  // ตรวจสอบจัดการคลิกปุ่มเดี่ยว / ดับเบิลคลิกสำหรับหน้า Pomodoro (หน้าจอที่ 3)
  if (currentScreen == 3 && clickCount > 0 && (currentMillis - lastClickTime > doubleClickDelay)) {
    if (clickCount >= 2) {
      // ดับเบิลคลิก: Reset เวลา
      pomodoroState = IDLE;
      pomodoroTimeRemaining = (pomodoroMode == WORK_MODE) ? WORK_TIME : BREAK_TIME;
    } else {
      // คลิกเดียว: Start / Pause
      if (pomodoroState == IDLE || pomodoroState == PAUSED) {
        pomodoroState = RUNNING;
      } else if (pomodoroState == RUNNING) {
        pomodoroState = PAUSED;
      }
    }
    clickCount = 0;
    updatePomodoroScreen();
  }

  // ทำงานเบื้องหลัง: อัปเดตข้อมูล Weather จาก API ทุกๆ 10 นาที
  if (currentMillis - lastWeatherFetch >= weatherInterval || lastWeatherFetch == 0) {
    lastWeatherFetch = currentMillis;
    fetchWeatherData();
  }

  // แยกการทำงานตามหน้าจอปัจจุบันแบบ Non-blocking ทั้งหมด
  if (currentScreen == 0) {
    // --- โหมดหน้าจอ Animation GIF ---
    if (currentMillis - lastFrameTime >= frameInterval) {
      lastFrameTime = currentMillis;
      updateAnimationScreen();
    }
  }
  else if (currentScreen == 1) {
    // --- โหมดหน้าจอนาฬิกา (Clock) ---
    if (currentMillis - lastTimeUpdate >= timeInterval) {
      lastTimeUpdate = currentMillis;
      displayClockAndDate();
    }
  } 
  else if (currentScreen == 2) {
    // --- โหมดหน้าจอสภาพอากาศ (Weather) ---
    if (currentMillis - lastWeatherScreenUpdate >= weatherScreenInterval || lastWeatherScreenUpdate == 0) {
      lastWeatherScreenUpdate = currentMillis;
      updateWeatherScreen();
    }
  } 
  else if (currentScreen == 3) {
    // --- โหมดหน้าจอ Pomodoro ---
    if (pomodoroState == RUNNING) {
      if (currentMillis - lastPomodoroTick >= 1000) {
        lastPomodoroTick = currentMillis;
        pomodoroTimeRemaining--;

        if (pomodoroTimeRemaining <= 0) {
          if (pomodoroMode == WORK_MODE) {
            pomodoroMode = BREAK_MODE;
            pomodoroTimeRemaining = BREAK_TIME;
          } else {
            pomodoroMode = WORK_MODE;
            pomodoroTimeRemaining = WORK_TIME;
          }
          pomodoroState = IDLE; 
        }
        updatePomodoroScreen();
      }
    }
  }
}

void updateAnimationScreen() {
  if (currentScreen != 0) return;

  // แสดงผลภาพขนาด 48x48 พิกเซล ที่ตำแหน่ง X=56, Y=16
  tft.drawRGBBitmap(56, 16, (uint16_t*)animationFrames[currentFrame]->data, 48, 48);

  currentFrame = (currentFrame + 1) % 8; // วนลูปเฟรม 0 ถึง 7
}

void fetchWeatherData() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(weatherEndpoint);
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      String payload = http.getString();
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);
      
      outdoorTemp = doc["main"]["temp"];
      currentFeelsLike = doc["main"]["feels_like"];
      currentHumidity = doc["main"]["humidity"];
      weatherDesc = doc["weather"][0]["description"].as<String>();
    }
    http.end();
  }
}

// ฟังก์ชันวาดโครงสร้างคงที่ของหน้า Weather แบบแยกซ้าย-ขวา
void drawStaticWeatherScreen() {
  tft.fillRect(0, 0, 160, 16, ST77XX_WHITE);
  tft.setCursor(6, 4);
  tft.setTextColor(ST77XX_BLACK, ST77XX_WHITE);
  tft.setTextSize(1);
  tft.print("WEATHER");

  // วาดเส้นคั่นกลางจอแนวตั้ง (X = 80)
  tft.drawFastVLine(80, 16, 64, ST77XX_DARKGREY);

  // หัวข้อฝั่ง OUTDOOR (ซ้าย)
  tft.setCursor(4, 18);
  tft.setTextColor(ST77XX_CYAN, ST77XX_BLACK);
  tft.setTextSize(1);
  tft.print("OUTDOOR");

  // หัวข้อฝั่ง INDOOR (ขวา)
  tft.setCursor(84, 18);
  tft.setTextColor(ST77XX_GREEN, ST77XX_BLACK);
  tft.setTextSize(1);
  tft.print("INDOOR");
}

void updateWeatherScreen() {
  if (currentScreen != 2) return;

  // อ่านค่าจากเซนเซอร์ SHT31 (ภายใน)
  float inT = sht31.readTemperature();
  float inH = sht31.readHumidity();
  
  if (!isnan(inT)) indoorTemp = inT;
  if (!isnan(inH)) indoorHumidity = (int)inH;

  char buf[15];
  char descBuf[15];

  // ==================== อัปเดตฝั่งซ้าย (OUTDOOR) ====================
  tft.setCursor(4, 28);
  tft.setTextColor(ST77XX_WHITE, ST77XX_BLACK);
  tft.setTextSize(2);
  snprintf(buf, sizeof(buf), "%-5.1fC", outdoorTemp);
  tft.print(buf);

  tft.setCursor(4, 50);
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_LIGHTGREY, ST77XX_BLACK);
  String shortDesc = weatherDesc;
  if (shortDesc.length() > 10) shortDesc = shortDesc.substring(0, 10);
  snprintf(descBuf, sizeof(descBuf), "%-10s", shortDesc.c_str());
  tft.print(descBuf);

  tft.setCursor(4, 64);
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE, ST77XX_BLACK);
  snprintf(buf, sizeof(buf), "H:%-3d%%  ", currentHumidity);
  tft.print(buf);

  // ==================== อัปเดตฝั่งขวา (INDOOR จาก SHT31) ====================
  tft.setCursor(84, 28);
  tft.setTextColor(ST77XX_WHITE, ST77XX_BLACK);
  tft.setTextSize(2);
  snprintf(buf, sizeof(buf), "%-5.1fC", indoorTemp);
  tft.print(buf);

  tft.setCursor(84, 64);
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_WHITE, ST77XX_BLACK);
  snprintf(buf, sizeof(buf), "H:%-3d%%  ", indoorHumidity);
  tft.print(buf);
}

void displayClockAndDate() {
  if (currentScreen != 1) return;

  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    return;
  }

  if (timeinfo.tm_min == lastDisplayedMinute) {
    return; 
  }
  
  lastDisplayedMinute = timeinfo.tm_min;

  char hourStr[3], minStr[3], ampmStr[3];
  char dateStr[30];

  strlcpy(hourStr, "", sizeof(hourStr)); 
  strlcpy(minStr, "", sizeof(minStr));
  strlcpy(ampmStr, "", sizeof(ampmStr));

  strftime(hourStr, 3, "%I", &timeinfo);   
  strftime(minStr, 3, "%M", &timeinfo);    
  strftime(ampmStr, 3, "%p", &timeinfo);   
  strftime(dateStr, 30, "%a %d %b %Y", &timeinfo); 

  tft.fillRect(0, 0, 160, 16, ST77XX_BLUE);
  tft.setCursor(6, 4);
  tft.setTextColor(ST77XX_WHITE, ST77XX_BLUE); 
  tft.setTextSize(1);
  tft.print("CLOCK");

  tft.fillRect(0, 20, 160, 50, ST77XX_BLACK);

  tft.setCursor(8, 25);
  tft.setTextColor(ST77XX_WHITE, ST77XX_BLACK); 
  tft.setTextSize(3);
  tft.print(hourStr);
  tft.print(":");
  tft.print(minStr);
  
  tft.setCursor(108, 32);
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_BLUE, ST77XX_BLACK);
  tft.print(ampmStr);

  tft.setCursor(8, 58);
  tft.setTextColor(ST77XX_WHITE, ST77XX_BLACK);
  tft.setTextSize(1);
  tft.print(dateStr);
}

void updatePomodoroScreen() {
  if (currentScreen != 3) return;

  tft.setCursor(6, 20);
  tft.setTextSize(1);
  if (pomodoroMode == WORK_MODE) {
    tft.setTextColor(ST77XX_CYAN, ST77XX_BLACK);
    tft.print("STUDY "); 
  } else {
    tft.setTextColor(ST77XX_GREEN, ST77XX_BLACK);
    tft.print("REST "); 
  }

  tft.setCursor(110, 20);
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_RED, ST77XX_BLACK);
  if (pomodoroState == RUNNING) tft.print("[RUN]  ");
  else if (pomodoroState == PAUSED) tft.print("[PAUSE]");
  else tft.print("[READY]");

  int minutes = pomodoroTimeRemaining / 60;
  int seconds = pomodoroTimeRemaining % 60;
  char timeStr[6];
  snprintf(timeStr, sizeof(timeStr), "%02d:%02d", minutes, seconds);

  tft.setCursor(35, 36);
  tft.setTextSize(3);
  tft.setTextColor(ST77XX_WHITE, ST77XX_BLACK);
  tft.print(timeStr);
}