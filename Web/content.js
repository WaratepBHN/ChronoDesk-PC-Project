export const CONTENT = {
  th: {
    meta: {
      title: 'ChronoDesk — เวลา อากาศ และช่วงโฟกัสบนโต๊ะคุณ',
      description: 'โครงงาน Physical Computing: นาฬิกาตั้งโต๊ะ ESP32-C3 พร้อมสภาพอากาศ เซนเซอร์ SHT31 ภาพเคลื่อนไหว และ Pomodoro รวมวงจร โค้ด และคู่มือทำตาม'
    },
    nav: { overview: 'แนวคิด', modes: 'ฟังก์ชัน', hardware: 'ฮาร์ดแวร์', build: 'ทำตามได้', files: 'ไฟล์โครงการ', team: 'ทีมผู้พัฒนา' },
    hero: {
      eyebrow: 'PHYSICAL COMPUTING · ESP32-C3',
      title: 'เวลาที่สำคัญ', accent: 'อยู่ตรงหน้า',
      lead: 'ChronoDesk รวมเวลา สภาพอากาศ และ Pomodoro ไว้บนโต๊ะ ให้เหลือบดูได้โดยไม่ต้องเปิดมือถือหรือสลับหน้าต่างบนคอมพิวเตอร์',
      primary: 'ดูการทำงาน', secondary: 'เริ่มทำตาม',
      small: 'นาฬิกาตั้งโต๊ะจาก ESP32-C3 · จอสี · เคสพิมพ์สามมิติ',
      stats: [{ value: '4', label: 'หน้าการใช้งาน' }, { value: '1', label: 'ปุ่มควบคุม' }, { value: '3D', label: 'เคสพิมพ์สามมิติ' }]
    },
    abstract: {
      eyebrow: 'ABSTRACT / บทคัดย่อ', title: 'อุปกรณ์เล็ก ๆ สำหรับข้อมูลที่ใช้ทุกวัน',
      body: 'ChronoDesk เป็นอุปกรณ์นาฬิกาตั้งโต๊ะที่พัฒนาขึ้นเพื่อให้ดูเวลา สภาพอากาศ และช่วงเวลาทำงานได้จากอุปกรณ์ตรงหน้า โดยไม่ต้องเปิดโทรศัพท์หรือสลับไปยังเว็บไซต์ระหว่างอ่านหนังสือหรือทำงาน ระบบใช้ ESP32-C3 Super Mini ควบคุมจอสี ST7735 และอ่านอุณหภูมิพร้อมความชื้นภายในห้องจากเซนเซอร์ SHT31 การเชื่อมต่อ Wi-Fi ใช้สำหรับซิงค์เวลาผ่าน NTP และดึงสภาพอากาศภายนอกบริเวณ KMITL จาก OpenWeatherMap ผู้ใช้สลับระหว่างหน้าภาพเคลื่อนไหว นาฬิกา สภาพอากาศ และ Pomodoro ด้วยปุ่มเดียว ตัวจับเวลากำหนดช่วงทำงาน 25 นาทีและพัก 5 นาที พร้อมเริ่ม หยุดพัก ทำต่อ และรีเซ็ตได้ โครงการเผยแพร่วงจร ซอร์สโค้ด ไฟล์เคสพิมพ์สามมิติ และแนวทางทำตาม เพื่อให้ผู้สนใจศึกษา ประกอบ และพัฒนาต่อได้ โดยระบุข้อจำกัดของเฟิร์มแวร์ปัจจุบันไว้อย่างชัดเจน'
    },
    story: {
      eyebrow: 'THE IDEA / จุดเริ่มต้น', title: 'ไม่ต้องเปิดอีกหน้าจอ เพื่อดูเรื่องใกล้ตัว',
      problemTitle: 'ปัญหาที่เจอระหว่างนั่งโต๊ะ',
      problem: 'จะดูเวลาและสภาพอากาศที เรามักต้องเลื่อนเมาส์ไปมุมจอ เปิดมือถือ หรือเข้าเว็บไซต์อีกหน้า ระหว่างอ่านหนังสือ ถ้าจะใช้ Pomodoro ก็อาจต้องเปิดเว็บหรือวิดีโอ YouTube เพิ่ม ทั้งที่ใช้คอมพิวเตอร์ทำอย่างอื่นอยู่ หรือไม่ได้จ้องหน้าจอตลอด เราจึงอยากมีอุปกรณ์ตรงหน้าที่เหลือบดูข้อมูลและจับเวลาได้เลย',
      solutionTitle: 'รวมไว้บนโต๊ะ ควบคุมด้วยปุ่มเดียว',
      solution: 'นำเวลา สภาพอากาศ และตัวจับเวลามาอยู่ในอุปกรณ์เดียว ใช้จอเล็กที่แสดงทีละหน้าและปุ่มเดียวสำหรับเปลี่ยนหน้า ภายในเคสพิมพ์สามมิติ ESP32-C3 รับข้อมูลจากเซนเซอร์และอินเทอร์เน็ตแล้วแสดงผลในตำแหน่งที่มองเห็นได้ระหว่างอ่านหนังสือหรือทำงาน',
      steps: [
        { title: 'กำหนดสิ่งที่ต้องเห็น', body: 'เลือกเวลา อุณหภูมิ ความชื้น และตัวจับเวลา แบ่งเป็นสี่หน้าสำหรับจอขนาดเล็ก' },
        { title: 'ต่อวงจรและเขียนระบบ', body: 'เชื่อม ESP32-C3 จอ SHT31 และปุ่ม แล้วพัฒนา NTP, Weather และการควบคุมหน้าจอ' },
        { title: 'ประกอบและส่งต่อ', body: 'พิมพ์เคส ตรวจการแสดงผลและปุ่ม แล้วจัดทำวงจร โค้ด คู่มือ และวิดีโอให้ทำตาม' }
      ]
    },
    modes: {
      eyebrow: 'FOUR SCREENS / สี่หน้าการใช้งาน', title: 'เลือกสิ่งที่อยากเห็น',
      lead: 'กดค้าง 2 วินาทีเพื่อวนหน้า Animation → Clock → Weather → Pomodoro',
      items: [
        { id: 'animation', name: 'Animation', headline: 'เติมภาพเคลื่อนไหวให้โต๊ะ', body: 'เล่นภาพ 48 × 48 พิกเซลจาก 8 เฟรมที่ฝังไว้ในเฟิร์มแวร์ เป็นหน้าแรกหลังเชื่อมต่อ Wi-Fi และดึงข้อมูลเริ่มต้นเสร็จ', source: 'ภาพจาก frame_000.h ถึง frame_007.h', detail: 'หากต้องการเปลี่ยนภาพ ให้แทนข้อมูลเฟรมแล้วอัปโหลดเฟิร์มแวร์ใหม่ ยังไม่มีระบบอัปโหลด GIF ผ่านหน้าเว็บ' },
        { id: 'clock', name: 'Clock', headline: 'เวลาและวันที่ในมุมที่มองเห็น', body: 'ซิงค์เวลาด้วย NTP แสดงเวลาไทย GMT+7 แบบ 12 ชั่วโมงพร้อม AM/PM และวันเดือนปีภาษาอังกฤษ', source: 'NTP: pool.ntp.org / time.google.com', detail: 'ตัวเลขบนจอวาดใหม่เมื่อนาทีเปลี่ยน การตั้งเวลาครั้งแรกต้องเชื่อมอินเทอร์เน็ต' },
        { id: 'weather', name: 'Weather', headline: 'ในห้องและภายนอก อยู่ข้างกัน', body: 'Outdoor แสดงอุณหภูมิ ความชื้น และคำอธิบายอากาศบริเวณ KMITL ส่วน Indoor แสดงค่าจากเซนเซอร์ที่อุปกรณ์', source: 'OpenWeatherMap + SHT31', detail: 'ตั้งรอบดึงข้อมูลภายนอกไว้ทุก 10 นาที ส่วน SHT31 อ่านประมาณทุก 2 วินาทีขณะเปิดหน้านี้ พิกัดภายนอกเปลี่ยนได้จากโค้ด' },
        { id: 'pomodoro', name: 'Pomodoro', headline: 'แบ่งเวลาทำงานและพัก', body: 'ทำงาน 25 นาที พัก 5 นาที กดสั้นเพื่อเริ่ม หยุดพัก หรือทำต่อ กดสองครั้งเพื่อรีเซ็ตช่วงปัจจุบัน', source: 'ตัวจับเวลาในเฟิร์มแวร์', detail: 'นับเฉพาะขณะเปิดหน้า Pomodoro เมื่อครบเวลาจะเปลี่ยนช่วงและรอให้กดเริ่มอีกครั้ง' }
      ]
    },
    flow: {
      eyebrow: 'HOW IT WORKS / การทำงาน', title: 'จากข้อมูล สู่จอที่อยู่ตรงหน้า',
      steps: [
        { number: '01', title: 'รับข้อมูล', body: 'SHT31 อ่านอุณหภูมิและความชื้น ปุ่มรับคำสั่ง และ Wi-Fi เชื่อม NTP กับ OpenWeatherMap' },
        { number: '02', title: 'ประมวลผล', body: 'ESP32-C3 จัดการหน้าจอ ข้อมูล JSON การกดปุ่ม และสถานะของ Pomodoro' },
        { number: '03', title: 'แสดงผล', body: 'จอ ST7735 แสดงข้อมูลของหน้าที่เลือก ภายในเคสที่พิมพ์สามมิติ' }
      ]
    },
    hardware: {
      eyebrow: 'HARDWARE / อุปกรณ์และวงจร', title: 'ชิ้นส่วนไม่มาก เริ่มต่อได้จากแผนภาพ',
      lead: 'อุปกรณ์หลักห้ารายการ พร้อมไฟล์วงจรสำหรับเปิดดูและแก้ไข เตรียมสายเชื่อมต่อและสาย USB ที่รับส่งข้อมูลได้เพิ่มเติม',
      diagramCaption: 'วงจร ChronoDesk — พินตรงกับเฟิร์มแวร์ปัจจุบัน ใช้ไฟ 3.3V และ GND ร่วมกัน',
      components: [
        { id: 'esp', name: 'ESP32-C3 Super Mini', spec: 'Wi-Fi 2.4 GHz', qty: '1 บอร์ด', body: 'หน่วยควบคุม เชื่อมต่ออินเทอร์เน็ต อ่านเซนเซอร์ และจัดการหน้าจอ' },
        { id: 'display', name: 'TFT IPS 0.96″', spec: 'ST7735 · 80 × 160 px', qty: '1 จอ', body: 'จอสี ใช้งานแนวนอน 160 × 80 พิกเซลสำหรับทั้งสี่หน้า' },
        { id: 'sensor', name: 'GY-SHT31-D', spec: 'Temperature + Humidity · I²C', qty: '1 โมดูล', body: 'อ่านอุณหภูมิและความชื้นในห้องที่ติดตั้งอุปกรณ์' },
        { id: 'button', name: 'Momentary Button', spec: 'GPIO3 · INPUT_PULLUP', qty: '1 ตัว', body: 'กดค้างเพื่อเปลี่ยนหน้า กดสั้นและกดสองครั้งเพื่อควบคุม Pomodoro' },
        { id: 'resistor', name: 'ตัวต้านทาน 1 kΩ', spec: 'TFT Backlight', qty: '1 ตัว', body: 'ต่ออนุกรมระหว่างไฟ 3.3V กับขา BLK ของจอ' }
      ],
      pinsTitle: 'ต่อสายตามพินนี้', pinHeaders: ['อุปกรณ์', 'สัญญาณ', 'พิน ESP32-C3'],
      pins: [
        { device: 'TFT', signal: 'VCC', pin: '3.3V' }, { device: 'TFT', signal: 'GND', pin: 'GND' },
        { device: 'TFT', signal: 'SCL', pin: 'GPIO5' }, { device: 'TFT', signal: 'SDA / MOSI', pin: 'GPIO6' },
        { device: 'TFT', signal: 'RES', pin: 'GPIO7' }, { device: 'TFT', signal: 'DC', pin: 'GPIO8' },
        { device: 'TFT', signal: 'CS', pin: 'GPIO9' }, { device: 'TFT', signal: 'BLK', pin: '3.3V ผ่าน 1 kΩ' },
        { device: 'SHT31', signal: 'VIN', pin: '3.3V' }, { device: 'SHT31', signal: 'G / GND', pin: 'GND' },
        { device: 'SHT31', signal: 'SDA', pin: 'GPIO0' }, { device: 'SHT31', signal: 'SCL', pin: 'GPIO1' },
        { device: 'ปุ่มกด', signal: 'สวิตช์', pin: 'GPIO3 ↔ GND' }
      ]
    },
    build: {
      eyebrow: 'BUILD YOUR OWN / ทำตามได้', title: 'จากไฟล์โครงการ สู่ ChronoDesk ของคุณ',
      lead: 'คู่มือนี้อิงโค้ดปัจจุบัน ใช้ข้อมูลเครือข่ายและ API ของคุณเอง Repository ยังไม่ระบุเวอร์ชัน core และไลบรารีที่ใช้ทดสอบ',
      steps: [
        { title: 'เตรียมอุปกรณ์และไฟล์', body: 'ดาวน์โหลดโครงการจาก GitHub เตรียมอุปกรณ์ตามรายการ สายเชื่อมต่อ และสาย USB ที่รับส่งข้อมูลได้', bullets: ['เก็บ Software, Hardware/Diagram และ Hardware/Case ไว้ครบ', 'สร้างโฟลเดอร์ ChronoDeskCode แล้ววาง ChronoDeskCode.ino พร้อม frame_000.h ถึง frame_007.h ไว้ด้วยกัน', 'เปิด CircuitDiagram.png และ HWSpec.md ประกอบการต่อวงจร'] },
        { title: 'ต่อวงจรตามแผนภาพ', body: 'ต่อจอ เซนเซอร์ และปุ่มตามตารางพิน ตรวจชื่อขาบนโมดูลจริงก่อนจ่ายไฟ', bullets: ['ใช้ 3.3V และ GND ร่วมกัน ต่อ BLK ผ่านตัวต้านทาน 1 kΩ', 'SHT31: SDA ไป GPIO0, SCL ไป GPIO1; โค้ดตรวจ address 0x44 แล้ว 0x45', 'ปุ่มต่อ GPIO3 กับ GND โดยใช้ Pull-up ภายใน', 'ตรวจสายจ่ายไฟและไม่ให้ลัดวงจรก่อนเสียบ USB'] },
        { title: 'ติดตั้งเครื่องมือและไลบรารี', body: 'ติดตั้ง Arduino IDE และแพ็กเกจ ESP32 ของ Espressif ผ่าน Boards Manager จากนั้นเพิ่มไลบรารีผ่าน Library Manager', bullets: ['ArduinoJson', 'Adafruit GFX Library', 'Adafruit ST7735 and ST7789 Library', 'Adafruit SHT31 Library และ dependency ที่ Library Manager เสนอ', 'WiFi, HTTPClient, SPI, Wire และ time มากับ ESP32 core ไม่ต้องหาไลบรารีชื่อเดียวกันมาติดตั้งเพิ่ม'] },
        { title: 'ตั้งค่าแล้วอัปโหลด', body: 'เปิด sketch ตั้งค่า Wi-Fi 2.4 GHz และ OpenWeatherMap ของคุณ เลือกบอร์ด ESP32-C3 และพอร์ตให้ตรง จากนั้น Verify และ Upload', bullets: ['แก้ ssid, password และ weatherApiKey ด้วยค่าของคุณเอง อย่านำข้อมูลส่วนตัวขึ้น repository', 'ค่า lat / lon เดิมเป็นบริเวณ KMITL; แก้ได้หากต้องการสถานที่อื่น', 'โค้ดตั้งเวลาไทย GMT+7 ไว้แล้ว ไม่มีหน้า setup Wi-Fi บนอุปกรณ์', 'Repository ไม่บันทึก board menu หรือ USB setting ที่ใช้จริง ให้ตรวจตามบอร์ดและ core ที่ติดตั้ง', 'ถ้าคอมไพล์หาเฟรมไม่พบ ให้ตรวจว่า header ทั้งแปดอยู่ในโฟลเดอร์เดียวกับ sketch'] },
        { title: 'พิมพ์และทดลองประกอบเคส', body: 'อ่านคู่มือพิมพ์เคสก่อน Slice ใช้ STL ที่ Scale 100% เคสจริงใช้ eSUN PLA+ สีดำบน Bambu Lab A1 mini หัวฉีด 0.4 mm', bullets: ['ไฟล์ประกอบด้วย front.stl, body.stl, rear.stl และ support.stl', 'ค่าตั้งต้นในคู่มือ: หัวฉีด 220°C ฐาน 60°C ชั้นพิมพ์ 0.20 mm ผนัง 3 ชั้น infill 15–20%', 'ใช้ tree support สำหรับ body ตามคู่มือ; front และ rear ไม่ใช้ support', 'support.stl คือแถบยึด 14 ชิ้น ใช้ infill 100% เฉพาะชุดนี้ ไม่ใช่ support ที่ slicer สร้าง', 'ตรวจโปรไฟล์เครื่องและวัสดุจริง รอชิ้นงานเย็นแล้วลองประกอบ ตรวจจอ ปุ่ม และสายก่อนปิดฝา'] },
        { title: 'ตรวจทั้งสี่หน้า', body: 'เปิด Serial Monitor ที่ 115200 baud หากต้องการดูสถานะ หลังเปิดเครื่องรอ Wi-Fi และข้อมูลเริ่มต้น แล้วทดสอบการแสดงผลกับปุ่ม', bullets: ['ค้างที่ Connecting WiFi... ให้ตรวจชื่อเครือข่าย รหัสผ่าน และ Wi-Fi 2.4 GHz; ปัจจุบันไม่มี timeout', 'กดค้าง 2 วินาทีเพื่อวน Animation, Clock, Weather และ Pomodoro', 'ถ้าเวลาไม่แสดง ให้ตรวจอินเทอร์เน็ตและ NTP; ถ้า SHT31 ไม่ตอบ ให้ตรวจไฟและ GPIO0/1', 'Outdoor เป็นศูนย์หรือข้อมูลเดิม ให้ตรวจ API key สิทธิ์ Current Weather อินเทอร์เน็ต และพิกัด', 'หน้า Pomodoro: กดสั้นเริ่ม/หยุดพัก/ทำต่อ กดสองครั้งรีเซ็ต และต้องอยู่หน้านี้เพื่อให้เวลานับต่อ'] }
      ]
    },
    limits: {
      eyebrow: 'CURRENT STATE / ข้อจำกัดปัจจุบัน', title: 'สิ่งที่ควรรู้ก่อนทำตาม',
      lead: 'อธิบายตามพฤติกรรมของเฟิร์มแวร์ที่เผยแพร่ เพื่อให้เห็นทั้งสิ่งที่ทำได้และสิ่งที่ยังพัฒนาต่อได้',
      items: [
        { title: 'ต้องเชื่อม Wi-Fi ตอนเริ่ม', body: 'เปิดเครื่องแล้วจะรอจนกว่า Wi-Fi เชื่อมต่อสำเร็จ ยังไม่มี timeout หรือหน้าแก้เครือข่ายบนอุปกรณ์' },
        { title: 'Pomodoro ต้องอยู่หน้าของตัวเอง', body: 'เปลี่ยนหน้าแล้วตัวจับเวลาหยุดนับ เมื่อครบช่วงจะเปลี่ยนโหมดแล้วรอให้กดเริ่มใหม่ ระยะ 25/5 นาทีแก้ได้จากโค้ด' },
        { title: 'Weather ใช้พิกัดในโค้ด', body: 'ค่าปัจจุบันเป็นบริเวณ KMITL ต้องมีอินเทอร์เน็ตเพื่อดึงข้อมูล การรอ API อาจทำให้จอและปุ่มตอบสนองช้าลง' },
        { title: 'ยังไม่มีสถานะข้อมูลล้าสมัย', body: 'จอยังไม่แจ้งข้อผิดพลาดหรือเวลาอัปเดตล่าสุด หากอ่านเซนเซอร์ไม่ได้อาจคงค่าล่าสุด และยังไม่มีผลทดสอบความแม่นยำที่บันทึกไว้ใน repository' }
      ],
      futureTitle: 'แนวทางพัฒนาต่อ',
      future: 'ข้อเสนอต่อไปนี้ยังไม่อยู่ในเฟิร์มแวร์ปัจจุบัน: ให้ Pomodoro เดินเบื้องหลังและปรับเวลารอบได้ เพิ่มหน้าตั้งค่า Wi-Fi และการเชื่อมต่อใหม่ ตรวจ HTTP/JSON พร้อมแสดงสถานะข้อมูล ลดการขัดจังหวะจากการเรียก API และทดสอบความแม่นยำ การใช้พลังงาน และประสบการณ์ใช้งานอย่างเป็นระบบ'
    },
    files: {
      eyebrow: 'PROJECT FILES / ไฟล์โครงการ', title: 'เปิดดู ดาวน์โหลด แล้วพัฒนาต่อ',
      lead: 'รวมเฟิร์มแวร์ วงจร โมเดลเคส และคู่มือ ให้เริ่มจากส่วนที่สนใจได้',
      items: [
        { id: 'starter', title: 'เฟิร์มแวร์เริ่มต้น', body: 'Arduino sketch พร้อมเฟรมภาพเคลื่อนไหว ใช้ตั้งค่าของคุณเองก่อนอัปโหลด', format: 'ZIP · Arduino + Headers' },
        { id: 'diagram', title: 'แผนภาพวงจร', body: 'ดูตำแหน่งพินและการต่อจอ SHT31 ปุ่ม และไฟเลี้ยง', format: 'PNG' },
        { id: 'fritzing', title: 'วงจรฉบับแก้ไขได้', body: 'ไฟล์ต้นฉบับสำหรับเปิดและปรับวงจรใน Fritzing', format: 'FZZ' },
        { id: 'case', title: 'โมเดลเคสสามมิติ', body: 'ฝาหน้า ตัวเคส ฝาหลัง และชุดแถบยึดสำหรับพิมพ์ที่ Scale 100%', format: 'ZIP · 4 STL files' },
        { id: 'print-guide', title: 'คู่มือพิมพ์และแก้เคส', body: 'ขนาด ท่าวาง วัสดุ ค่าเริ่มต้น และแนวทางแก้ STL', format: 'Markdown' },
        { id: 'poster', title: 'โปสเตอร์โครงการ', body: 'ภาพรวม ChronoDesk อุปกรณ์ และหน้าจอทั้งสี่', format: 'PNG' }
      ]
    },
    team: {
      eyebrow: 'THE TEAM / ทีมผู้พัฒนา', title: 'ผู้พัฒนา ChronoDesk',
      lead: 'โครงงานรายวิชา 06016409 PHYSICAL COMPUTING',
      members: [
        { id: 'waratep', name: 'นายวราเทพ ภานนท์', studentId: '68070169', role: 'Hardware Developer' },
        { id: 'supawit', name: 'นายศุภวิชญ์ สุขจันทร์', studentId: '68070179', role: 'Software Developer' }
      ],
      course: '06016409 PHYSICAL COMPUTING', instructorLabel: 'อาจารย์ผู้สอน', instructorName: 'รองศาสตราจารย์ ดร. ปานวิทย์ ธุวะนุติ'
    },
    footer: { line: 'ChronoDesk · เวลา อากาศ และช่วงโฟกัสบนโต๊ะคุณ', credit: 'โครงงานรายวิชา Physical Computing · วงจร โค้ด และไฟล์เคสสำหรับศึกษาและพัฒนาต่อ' },
    ui: {
      language: 'เปลี่ยนภาษา', menu: 'เปิดเมนู', close: 'ปิด', skip: 'ข้ามไปเนื้อหา', backToTop: 'กลับด้านบน', copy: 'คัดลอก', copied: 'คัดลอกแล้ว', download: 'ดาวน์โหลด', view: 'เปิดดู', openGithub: 'ดูบน GitHub', watchVideo: 'ดูบน YouTube',
      videoTitle: 'ดู ChronoDesk ทำงานจริง', videoLead: 'วิดีโอสาธิตอุปกรณ์และการใช้งานทั้งสี่หน้า', videoConsent: 'กดเล่นเพื่อโหลดวิดีโอจาก YouTube', videoPlay: 'เล่นวิดีโอ', fullscreen: 'เต็มหน้าจอ', expandDiagram: 'ขยายแผนภาพวงจร',
      simLabel: 'ลองหน้าจอ ChronoDesk', simCaption: 'แบบจำลองการกดปุ่มเพื่ออธิบายการใช้งาน ข้อมูลบนจอเป็นตัวอย่าง ไม่ใช่ข้อมูลสดจากอุปกรณ์', simPress: 'กดสั้น', simHold: 'กดค้าง 2 วินาที', simReset: 'กดสองครั้ง · รีเซ็ต', simComplete: 'ครบช่วงแล้ว กดสั้นเพื่อเริ่มช่วงถัดไป', simReady: 'พร้อม', simRunning: 'กำลังนับ', simPaused: 'หยุดพัก', simWork: 'ทำงาน', simBreak: 'พัก', simNext: 'หน้าถัดไป', simHint: 'กดค้างเพื่อเปลี่ยนหน้า กดสั้นหรือกดสองครั้งเพื่อควบคุม Pomodoro',
      wiringLabel: 'ตารางการต่อสาย', buildPrev: 'ขั้นก่อนหน้า', buildNext: 'ขั้นถัดไป', stepLabel: 'ขั้นตอน', sourceLabel: 'แหล่งข้อมูล'
    }
  },
  en: {
    meta: {
      title: 'ChronoDesk — Time, weather, and focus on your desk',
      description: 'A Physical Computing project: an ESP32-C3 desktop clock with weather, an SHT31 sensor, animation, and Pomodoro. Explore the circuit, firmware, and build guide.'
    },
    nav: { overview: 'Idea', modes: 'Features', hardware: 'Hardware', build: 'Build Guide', files: 'Project Files', team: 'Team' },
    hero: {
      eyebrow: 'PHYSICAL COMPUTING · ESP32-C3',
      title: 'What matters,', accent: 'within sight.',
      lead: 'ChronoDesk brings time, weather, and Pomodoro to your desk. Glance at what you need without opening your phone or switching computer windows.',
      primary: 'Watch the demo', secondary: 'Build your own',
      small: 'An ESP32-C3 desktop clock · Color display · 3D-printed enclosure',
      stats: [{ value: '4', label: 'screens' }, { value: '1', label: 'control button' }, { value: '3D', label: 'printed enclosure' }]
    },
    abstract: {
      eyebrow: 'ABSTRACT', title: 'A small device for everyday information',
      body: 'ChronoDesk is a desktop clock designed to make time, weather information, and a work timer visible from a dedicated device. The idea addresses the need to check a phone, move the mouse to the screen corner, or open another website while studying or working. An ESP32-C3 Super Mini controls an ST7735 color display and reads indoor temperature and humidity from an SHT31 sensor. Wi-Fi provides NTP time synchronization and outdoor weather data for the KMITL area through OpenWeatherMap. One button switches between animation, clock, weather, and Pomodoro screens. The timer provides fixed 25-minute work and 5-minute break periods with start, pause, resume, and reset controls. Circuit files, firmware, printable enclosure models, and a build guide are shared so others can study, reproduce, and extend the project with its current limitations clearly documented.'
    },
    story: {
      eyebrow: 'THE IDEA', title: 'Everyday details, without another screen to open',
      problemTitle: 'A familiar problem at the desk',
      problem: 'Checking the time or weather often means moving the mouse to the screen corner, picking up a phone, or opening a website. A Pomodoro session may mean opening another site or a YouTube video while the computer is being used for something else. We also do not watch the screen all the time while reading. We wanted a device in front of us that makes these details visible and provides a timer.',
      solutionTitle: 'On your desk, controlled with one button',
      solution: 'Bring time, weather, and a work timer into one device. A small display shows one screen at a time, with one button to change screens. Inside a 3D-printed enclosure, the ESP32-C3 combines sensor readings and internet data in a place that stays in view while studying or working.',
      steps: [
        { title: 'Choose what to show', body: 'Select time, temperature, humidity, and a work timer. Divide the interface into four screens for the small display.' },
        { title: 'Connect and program', body: 'Connect the ESP32-C3, display, SHT31, and button, then implement NTP, weather, and screen controls.' },
        { title: 'Assemble and share', body: 'Print the enclosure, check the screens and button, then prepare the circuit, firmware, guide, and demonstration.' }
      ]
    },
    modes: {
      eyebrow: 'FOUR SCREENS', title: 'Choose what you want to see',
      lead: 'Hold for 2 seconds to cycle Animation → Clock → Weather → Pomodoro.',
      items: [
        { id: 'animation', name: 'Animation', headline: 'A little movement on your desk', body: 'Plays a 48 × 48 pixel animation using eight frames stored in firmware. This is the first screen after Wi-Fi connects and the initial request finishes.', source: 'Frames: frame_000.h through frame_007.h', detail: 'To change the animation, replace the frame data and upload the firmware again. There is no web-based GIF upload feature.' },
        { id: 'clock', name: 'Clock', headline: 'Time and date, within sight', body: 'Synchronizes through NTP and shows Thailand time at GMT+7 in a 12-hour format, with AM/PM and an English date.', source: 'NTP: pool.ntp.org / time.google.com', detail: 'The displayed digits redraw when the minute changes. Initial time synchronization requires an internet connection.' },
        { id: 'weather', name: 'Weather', headline: 'Indoors and outdoors, side by side', body: 'Outdoor shows temperature, humidity, and a short weather description for the KMITL area. Indoor shows readings from the device sensor.', source: 'OpenWeatherMap + SHT31', detail: 'Outdoor requests are scheduled every 10 minutes. SHT31 readings update approximately every two seconds while this screen is open. Change the outdoor coordinates in source code.' },
        { id: 'pomodoro', name: 'Pomodoro', headline: 'Make room for work and breaks', body: 'Work for 25 minutes and break for 5. Press once to start, pause, or resume; double-press to reset the current period.', source: 'Timer implemented in firmware', detail: 'Counts down only while the Pomodoro screen is open. At the end of a period, the mode changes and waits for another press to start.' }
      ]
    },
    flow: {
      eyebrow: 'HOW IT WORKS', title: 'From inputs to a display in front of you',
      steps: [
        { number: '01', title: 'Collect', body: 'SHT31 reads temperature and humidity, the button receives commands, and Wi-Fi connects to NTP and OpenWeatherMap.' },
        { number: '02', title: 'Process', body: 'The ESP32-C3 manages screens, JSON data, button input, and Pomodoro states.' },
        { number: '03', title: 'Display', body: 'The ST7735 displays the selected screen inside the 3D-printed enclosure.' }
      ]
    },
    hardware: {
      eyebrow: 'HARDWARE & CIRCUIT', title: 'A few parts, one circuit to follow',
      lead: 'Five core components, with a circuit image and an editable file. Also prepare hookup wires and a data-capable USB cable.',
      diagramCaption: 'ChronoDesk circuit — pin assignments match the current firmware. Modules share 3.3V and ground.',
      components: [
        { id: 'esp', name: 'ESP32-C3 Super Mini', spec: '2.4 GHz Wi-Fi', qty: '1 board', body: 'Connects to the internet, reads the sensor, and controls the display.' },
        { id: 'display', name: '0.96″ TFT IPS', spec: 'ST7735 · 80 × 160 px', qty: '1 display', body: 'A color display used horizontally at 160 × 80 pixels for the four screens.' },
        { id: 'sensor', name: 'GY-SHT31-D', spec: 'Temperature + Humidity · I²C', qty: '1 module', body: 'Measures temperature and humidity in the room where the device is placed.' },
        { id: 'button', name: 'Momentary Button', spec: 'GPIO3 · INPUT_PULLUP', qty: '1 button', body: 'Hold to change screens; single and double presses control Pomodoro.' },
        { id: 'resistor', name: '1 kΩ resistor', spec: 'TFT Backlight', qty: '1 resistor', body: 'Connects in series between 3.3V and the display BLK pin.' }
      ],
      pinsTitle: 'Wire it with these pin assignments', pinHeaders: ['Device', 'Signal', 'ESP32-C3 pin'],
      pins: [
        { device: 'TFT', signal: 'VCC', pin: '3.3V' }, { device: 'TFT', signal: 'GND', pin: 'GND' },
        { device: 'TFT', signal: 'SCL', pin: 'GPIO5' }, { device: 'TFT', signal: 'SDA / MOSI', pin: 'GPIO6' },
        { device: 'TFT', signal: 'RES', pin: 'GPIO7' }, { device: 'TFT', signal: 'DC', pin: 'GPIO8' },
        { device: 'TFT', signal: 'CS', pin: 'GPIO9' }, { device: 'TFT', signal: 'BLK', pin: '3.3V through 1 kΩ' },
        { device: 'SHT31', signal: 'VIN', pin: '3.3V' }, { device: 'SHT31', signal: 'G / GND', pin: 'GND' },
        { device: 'SHT31', signal: 'SDA', pin: 'GPIO0' }, { device: 'SHT31', signal: 'SCL', pin: 'GPIO1' },
        { device: 'Button', signal: 'Switch', pin: 'GPIO3 ↔ GND' }
      ]
    },
    build: {
      eyebrow: 'BUILD YOUR OWN', title: 'From project files to your own ChronoDesk',
      lead: 'This guide follows the current firmware. Use your own network and API settings. The repository does not record tested core or library versions.',
      steps: [
        { title: 'Prepare parts and files', body: 'Download the GitHub project. Prepare the listed components, hookup wires, and a data-capable USB cable.', bullets: ['Keep Software, Hardware/Diagram, and Hardware/Case together.', 'Create a ChronoDeskCode folder containing ChronoDeskCode.ino and frame_000.h through frame_007.h.', 'Open CircuitDiagram.png and HWSpec.md as wiring references.'] },
        { title: 'Connect the circuit', body: 'Wire the display, sensor, and button using the pin table. Check labels on the actual modules before applying power.', bullets: ['Share 3.3V and ground. Connect BLK through the 1 kΩ resistor.', 'SHT31: SDA to GPIO0 and SCL to GPIO1. The code checks address 0x44, then 0x45.', 'Connect the button between GPIO3 and GND; the code enables the internal pull-up.', 'Check the power wiring for shorts before connecting USB.'] },
        { title: 'Install tools and libraries', body: 'Install Arduino IDE and the Espressif ESP32 package through Boards Manager. Add the following through Library Manager.', bullets: ['ArduinoJson', 'Adafruit GFX Library', 'Adafruit ST7735 and ST7789 Library', 'Adafruit SHT31 Library, including dependencies offered by Library Manager', 'WiFi, HTTPClient, SPI, Wire, and time come with the ESP32 core; do not install unrelated libraries with the same names.'] },
        { title: 'Configure and upload', body: 'Open the sketch, configure your 2.4 GHz Wi-Fi and OpenWeatherMap access, select the matching ESP32-C3 board and port, then Verify and Upload.', bullets: ['Replace ssid, password, and weatherApiKey with your own values. Keep private credentials out of the repository.', 'The default lat / lon point to KMITL; change them for another location.', 'Thailand time at GMT+7 is already configured. The device has no Wi-Fi setup portal.', 'The repository does not record the exact board menu or USB settings. Check them against the board and installed core.', 'If compilation cannot find a frame header, check that all eight headers are in the sketch folder.'] },
        { title: 'Print and test-fit the enclosure', body: 'Read the case guide before slicing. Use the STL files at 100% scale. The project enclosure used black eSUN PLA+ on a Bambu Lab A1 mini with a 0.4 mm nozzle.', bullets: ['The parts are front.stl, body.stl, rear.stl, and support.stl.', 'Guide starting settings: 220°C nozzle, 60°C bed, 0.20 mm layers, three walls, and 15–20% infill.', 'Use tree support for the body as described in the guide; the front and rear do not need support.', 'support.stl contains 14 mounting pieces, not slicer-generated support. Use 100% infill for that set only.', 'Check the actual printer and material profile. Let parts cool, then check display alignment, button access, and wire clearance before closing.'] },
        { title: 'Check all four screens', body: 'Use Serial Monitor at 115200 baud to inspect status. On startup, wait for Wi-Fi and initial data, then check the screens and button.', bullets: ['Stuck at Connecting WiFi...: check the network name, password, and 2.4 GHz Wi-Fi. There is currently no timeout.', 'Hold for 2 seconds to cycle Animation, Clock, Weather, and Pomodoro.', 'No clock: check internet and NTP access. No SHT31 response: check power and GPIO0/1.', 'Outdoor shows zero or old data: check the API key, Current Weather access, internet, and coordinates.', 'On Pomodoro, single-press to start/pause/resume and double-press to reset. Stay on this screen for the countdown to continue.'] }
      ]
    },
    limits: {
      eyebrow: 'CURRENT STATE', title: 'What to know before you build',
      lead: 'These notes follow the published firmware so you can see both its current behavior and opportunities to improve it.',
      items: [
        { title: 'Wi-Fi is required at startup', body: 'Startup waits until Wi-Fi connects. There is no timeout or on-device network configuration screen.' },
        { title: 'Pomodoro must stay on its screen', body: 'The countdown stops on other screens. When a period ends, the mode changes and waits for a new start. The 25/5-minute durations are set in code.' },
        { title: 'Weather uses coordinates in code', body: 'The current location is KMITL, and outdoor data requires internet. Waiting for the API can delay display and button responses.' },
        { title: 'No stale-data indicator yet', body: 'The screen does not show errors or the last update time. Failed sensor reads may leave the last value visible, and the repository contains no recorded accuracy evaluation.' }
      ],
      futureTitle: 'Ideas for further development',
      future: 'These are proposals, not current firmware features: run Pomodoro across screens and allow custom periods; add Wi-Fi setup and reconnection handling; validate HTTP/JSON and show data status; prevent API requests from interrupting the interface; and evaluate sensor accuracy, power use, and user experience systematically.'
    },
    files: {
      eyebrow: 'PROJECT FILES', title: 'Explore, download, and build on it',
      lead: 'Firmware, circuit files, enclosure models, and a guide. Start with the part you want to explore.',
      items: [
        { id: 'starter', title: 'Starter firmware', body: 'Arduino sketch with animation headers. Configure your own settings before uploading.', format: 'ZIP · Arduino + Headers' },
        { id: 'diagram', title: 'Circuit diagram', body: 'Pin assignments and connections for the display, SHT31, button, and power.', format: 'PNG' },
        { id: 'fritzing', title: 'Editable circuit', body: 'The source file for opening and modifying the circuit in Fritzing.', format: 'FZZ' },
        { id: 'case', title: '3D enclosure models', body: 'Front, body, rear, and mounting pieces for printing at 100% scale.', format: 'ZIP · 4 STL files' },
        { id: 'print-guide', title: 'Printing and editing guide (Thai)', body: 'Original Thai guide with dimensions, orientation, materials, and STL editing tips. English starting instructions are available in the Build Guide above.', format: 'Markdown' },
        { id: 'poster', title: 'Project poster', body: 'An overview of ChronoDesk, its components, and the four screens.', format: 'PNG' }
      ]
    },
    team: {
      eyebrow: 'THE TEAM', title: 'The people behind ChronoDesk',
      lead: 'A project for 06016409 PHYSICAL COMPUTING',
      members: [
        { id: 'waratep', name: 'นายวราเทพ ภานนท์', studentId: '68070169', role: 'Hardware Developer' },
        { id: 'supawit', name: 'นายศุภวิชญ์ สุขจันทร์', studentId: '68070179', role: 'Software Developer' }
      ],
      course: '06016409 PHYSICAL COMPUTING', instructorLabel: 'Course instructor', instructorName: 'รองศาสตราจารย์ ดร. ปานวิทย์ ธุวะนุติ'
    },
    footer: { line: 'ChronoDesk · Time, weather, and focus on your desk', credit: 'A Physical Computing project · Circuit, firmware, and enclosure files for learning and further development' },
    ui: {
      language: 'Change language', menu: 'Open menu', close: 'Close', skip: 'Skip to content', backToTop: 'Back to top', copy: 'Copy', copied: 'Copied', download: 'Download', view: 'View', openGithub: 'View on GitHub', watchVideo: 'Watch on YouTube',
      videoTitle: 'See ChronoDesk in action', videoLead: 'A demonstration of the device and its four screens.', videoConsent: 'Press play to load the video from YouTube.', videoPlay: 'Play video', fullscreen: 'Fullscreen', expandDiagram: 'Expand circuit diagram',
      simLabel: 'Try the ChronoDesk screens', simCaption: 'An interactive model explaining the controls. Displayed readings are examples, not live device data.', simPress: 'Single press', simHold: 'Hold 2 seconds', simReset: 'Double press · Reset', simComplete: 'Period complete. Press once to start the next.', simReady: 'Ready', simRunning: 'Running', simPaused: 'Paused', simWork: 'Work', simBreak: 'Break', simNext: 'Next screen', simHint: 'Hold to change screens. Single or double press to control Pomodoro.',
      wiringLabel: 'Wiring table', buildPrev: 'Previous step', buildNext: 'Next step', stepLabel: 'Step', sourceLabel: 'Data source'
    }
  }
};
