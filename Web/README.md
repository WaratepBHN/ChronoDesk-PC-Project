# ChronoDesk website

เว็บไซต์โครงงาน Physical Computing แบบสลับไทย–อังกฤษ ใช้ HTML, CSS และ JavaScript โดยไม่มีแพ็กเกจที่ต้องติดตั้งเพื่อใช้งานเว็บไซต์ ฟอนต์ Noto Sans Thai เก็บไว้ใน `assets/fonts/` พร้อมใบอนุญาต OFL

## แก้เนื้อหา

- `content.js` — เนื้อหาสองภาษา (`th` / `en`)
- `app.js` — โครงหน้าและการทำงานของปุ่มจำลอง
- `styles.css` — รูปแบบและสี
- `index.template.html` — metadata, ส่วนหัว และแม่แบบ HTML
- `assets/` — รูป วงจร animation และไฟล์ดาวน์โหลด

หลังแก้เนื้อหาหรือโครงหน้า รัน:

```sh
node build.mjs
```

จะได้ `index.html` ที่มีเนื้อหาภาษาไทยใน HTML อยู่แล้ว ส่วนปุ่มภาษาใช้ JavaScript เปลี่ยนทั้งเว็บและจดจำตัวเลือกไว้ในเบราว์เซอร์

## เปิดดูในเครื่อง

เปิด Terminal ในโฟลเดอร์นี้แล้วรันคำสั่งต่อไปนี้ หากมี Python:

```sh
python -m http.server 8790
```

จากนั้นเปิด `http://localhost:8790/` ใช้เว็บเซิร์ฟเวอร์แทนการดับเบิลคลิกไฟล์ HTML เพราะ JavaScript modules ต้องโหลดผ่าน HTTP

## GitHub Pages

โฟลเดอร์ที่เผยแพร่คือ `Web` เท่านั้น Workflow ของ repository อยู่ที่ `.github/workflows/chronodesk-pages.yml`

ตั้งค่า GitHub ครั้งแรกที่ **Settings → Pages → Build and deployment → Source → GitHub Actions** จากนั้น push การเปลี่ยนแปลงไป `main` หรือสั่ง workflow **Deploy ChronoDesk website** จากแท็บ Actions

URL ที่คาดหวังเมื่อ GitHub Pages เผยแพร่สำเร็จ:

<https://waratepbhn.github.io/ChronoDesk-PC-Project/>

URL นี้จะใช้งานได้หลังจากตั้งค่า Pages และ workflow สำเร็จแล้วเท่านั้น

## เนื้อหาและพฤติกรรม

- เว็บไซต์อิงเฟิร์มแวร์ `Software/ChronoDeskCode.ino` ในวันที่จัดทำ มี 4 หน้า
- เดโมเป็นข้อมูลตัวอย่าง ไม่ได้ติดต่อบอร์ดหรือดึง Weather API
- กดปุ่มจำลองค้าง 2 วินาทีเพื่อเปลี่ยนหน้า; ที่ Pomodoro กดครั้งเดียวเริ่ม/พัก และสองครั้งรีเซ็ต
- เดโม Pomodoro นับเฉพาะเมื่อเปิดหน้านั้น เมื่อครบช่วงจะเปลี่ยนโหมดและรอเริ่มตามโค้ดปัจจุบัน
- วิดีโอโหลดจาก YouTube หลังผู้ใช้กดเล่น มีลิงก์เปิดบน YouTube โดยตรงเป็นทางเลือก
- ไฟล์ starter ZIP แทนค่า Wi-Fi และ API Key ด้วย placeholder; ไม่ได้คัดลอกรหัสส่วนตัวลงเว็บไซต์
- `support.stl` คือชุดแถบยึดอุปกรณ์ภายใน ไม่ใช่ support ที่ slicer สร้าง
- ใช้รูปจากโครงการจริง และเฟรม animation จาก header ของเฟิร์มแวร์

## ฟอนต์และแหล่งอ้างอิง

- [Noto Sans Thai — Google Fonts](https://github.com/google/fonts/tree/main/ofl/notosansthai); ดูใบอนุญาต `assets/fonts/OFL.txt`
- [Arduino IDE](https://www.arduino.cc/en/software/)
- [ESP32 Arduino installation](https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

แรงบันดาลใจด้านการเล่าเรื่องและแบ่งเนื้อหาจาก [KMITL Expo](https://expo.kmitl.ac.th/th), [Google I/O](https://io.google/2026/) และ [Techsauce Summit](https://summit.techsauce.co/) โดยใช้รูปและเนื้อหาของ ChronoDesk เอง
