# ChronoDesk

ChronoDesk is a smart desktop clock that brings time, weather information, and a Pomodoro timer together in a compact device for everyday study and work. Its dedicated display keeps essential information within sight, helping users check the time, monitor their surroundings, and follow focused work sessions while their computer is being used for other tasks.

The system is built around an ESP32-C3 Super Mini, a 0.96-inch ST7735 TFT display, and an SHT31 temperature and humidity sensor. It uses Wi-Fi to synchronize the clock through NTP and retrieve outdoor weather data from OpenWeatherMap, while the sensor measures indoor conditions. The current firmware includes four screens: animation, clock, weather, and a 25-minute work / 5-minute break Pomodoro timer, all controlled with a single push button.

The hardware is housed in a custom 3D-printed enclosure. This repository includes the firmware, display resources, circuit diagrams, enclosure STL files, and setup documentation to help others understand, assemble, and develop their own version of ChronoDesk.

### Website
https://waratepbhn.github.io/ChronoDesk-PC-Project/

### VDO
https://youtu.be/xJjyy5MB8Cg?si=4JZR6Z6MDQ1oD-sn

### [Hardware folder](./Hardware/)
This folder contains the hardware design and documentation for the ChronoDesk device, including the enclosure design and circuit diagrams.

![ESP32](https://img.shields.io/badge/ESP32--C3-E7352C.svg?style=for-the-badge&logo=espressif&logoColor=white)
![Hardware](https://img.shields.io/badge/Hardware-Design-0078D4?style=for-the-badge)
![Circuit Design](https://img.shields.io/badge/Circuit-Diagram-6C757D?style=for-the-badge)

### [Software folder](./Software/)
This folder contains the firmware source code, display resources, and program logic for the ChronoDesk system.

![C++](https://img.shields.io/badge/C%2B%2B-00599C.svg?style=for-the-badge&logo=cplusplus&logoColor=white)
![Embedded Systems](https://img.shields.io/badge/Embedded-Systems-2E8B57?style=for-the-badge)

<img src="assets/images/poster.png" width="594" height="841" alt="Poster">

## Contributors

| ID       | Name                  | Role         | Img                                                                          |
| -------- | --------------------- | ------------ | ---------------------------------------------------------------------------- |
| 68070169 | นายวราเทพ ภานนท์      | Hardware Dev | <img src="assets/images/waratep.jpg" width="150" height="150" alt="Waratep"> |
| 68070179 | นายศุภวิชญ์ สุขจันทร์ | Software Dev | <img src="assets/images/supawit.png" width="150" height="150" alt="Supawit"> |

## Present 06016409 PHYSICAL COMPUTING
<img src="assets/images/panwit.jpg" width="300" height="300" alt="panwit">
รองศาสตราจารย์ ดร. ปานวิทย์ ธุวะนุติ
