import { CONTENT } from './content.js';

export const REPO = 'https://github.com/WaratepBHN/ChronoDesk-PC-Project';
const YOUTUBE = 'https://www.youtube.com/watch?v=xJjyy5MB8Cg';
const MODES = ['animation','clock','weather','pomodoro'];
const MODE_ICONS = {animation:'animation',clock:'clock',weather:'weather',pomodoro:'focus'};
const COMPONENT_ICONS = {esp:'chip',display:'display',sensor:'sensor',button:'button',resistor:'resistor'};
const FILES = {
  starter:['ChronoDesk-starter-code.zip','code'],diagram:['circuit-diagram.png','display'],
  fritzing:['ChronoDesk_Diagram.fzz','chip'],case:['ChronoDesk-case-files.zip','cube'],
  'print-guide':['Guide.md','code'],poster:['poster.png','display']
};
const EXTRA = {
  th:{example:'ข้อมูลตัวอย่าง',physical:'ภาพหน้าจอจากเครื่องจริง',finish:'ข้ามไปดูตอนครบเวลา',fileNote:'โค้ดเริ่มต้นใช้ช่องให้กรอก Wi-Fi และ API Key ของคุณเอง ส่วนไฟล์วงจรและเคสอ้างอิงจากอุปกรณ์ที่ประกอบจริง',config:'ตัวอย่างการตั้งค่า',board:'ค่าตั้งต้นสำหรับ ESP32-C3 Super Mini ที่ใช้ USB ในตัว — ตรวจพอร์ตและขนาดแฟลชให้ตรงกับบอร์ดจริง',original:'ไฟล์ต้นฉบับ',simA11y:'ภาพจำลองหน้าจอ ChronoDesk',holdHint:'กดปุ่มบนตัวเครื่องค้าง 2 วินาที หรือลองปุ่มควบคุมด้านล่าง',frame:'FRAME',revision:'รุ่นปัจจุบัน',videoShort:'ภาพรวม · การประกอบ · สาธิต',read:'เรียนรู้และสร้างต่อ',clockTitle:'เวลาไทย GMT+7',kbd:'ใช้ Tab เพื่อเลือก และ Enter หรือ Space เพื่อกดปุ่มได้',buildSource:'ดูซอร์สโค้ด',libraries:'แหล่งติดตั้ง',caseGuide:'คู่มือพิมพ์เคส',copyFail:'เลือกข้อความและคัดลอกด้วยตนเอง',notes:'ข้อมูลนี้อ้างอิงเฟิร์มแวร์ใน repository ไม่ใช่ผลการทดสอบความแม่นยำ'},
  en:{example:'Example data',physical:'Display on the real device',finish:'Preview end of period',fileNote:'The starter code uses placeholders for your own Wi-Fi and API key. Circuit and enclosure files follow the assembled device.',config:'Configuration example',board:'Starting settings for an ESP32-C3 Super Mini with native USB. Verify the port and flash capacity against your actual board.',original:'Original files',simA11y:'ChronoDesk screen simulation',holdHint:'Hold the device button for 2 seconds, or use the controls below.',frame:'FRAME',revision:'Current firmware',videoShort:'Overview · Build · Demonstration',read:'Explore and build',clockTitle:'Thailand time GMT+7',kbd:'Use Tab to navigate and Enter or Space to press a button.',buildSource:'Firmware source',libraries:'Installation sources',caseGuide:'Printing guide (Thai)',copyFail:'Select and copy the text manually',notes:'This information describes the repository firmware, not a measured accuracy evaluation.'}
};
const escapeHTML = value => String(value).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const eyebrow = text => `<span class="eyebrow">${escapeHTML(text)}</span>`;
const link = (href,text,kind='text-link',glyph='external',extra='') => `<a class="${kind}" href="${href}" ${extra}>${escapeHTML(text)}${icon(glyph)}</a>`;

export function renderNav(lang) {
  return Object.entries(CONTENT[lang].nav).map(([id,title])=>`<a href="#${id}">${escapeHTML(title)}</a>`).join('');
}

function renderBuildStep(step,i,c,x) {
  const config = 'const char* ssid = "YOUR_WIFI_NAME";\nconst char* password = "YOUR_WIFI_PASSWORD";\nString weatherApiKey = "YOUR_OPENWEATHERMAP_KEY";';
  let tools='';
  if(i===0) tools=link('./assets/downloads/ChronoDesk-starter-code.zip',c.ui.download,'text-link','download','download');
  if(i===2) tools=`<div class="build-tools"><a href="https://www.arduino.cc/en/software/" target="_blank" rel="noopener noreferrer">Arduino IDE ↗</a><a href="https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html" target="_blank" rel="noopener noreferrer">Espressif ESP32 ↗</a></div>`;
  if(i===3) tools=`<div class="config-example"><button class="copy-button" type="button" data-copy-config>${icon('copy')}${escapeHTML(c.ui.copy)} · ${escapeHTML(x.config)}</button><pre><code>${escapeHTML(config)}</code></pre></div><p class="setup-note">${escapeHTML(x.board)}</p><pre class="board-settings"><code>Board: ESP32C3 Dev Module\nUSB CDC On Boot: Enabled\nSerial Monitor: 115200 baud\nFlash: 4 MB (verify your board)</code></pre>`;
  if(i===4) tools=link('./assets/downloads/Guide.md',x.caseGuide,'text-link','download','download');
  if(i===5) tools=link(`${REPO}/tree/main/Software`,x.buildSource,'text-link','external','target="_blank" rel="noopener noreferrer"');
  return `<article class="build-panel" id="build-panel-${i}" role="tabpanel" aria-labelledby="build-tab-${i}" ${i?'hidden':''}><span class="build-count">${escapeHTML(c.ui.stepLabel)} ${String(i+1).padStart(2,'0')} / 06</span><h3>${escapeHTML(step.title)}</h3><p>${escapeHTML(step.body)}</p><ul>${step.bullets.map(t=>`<li>${escapeHTML(t)}</li>`).join('')}</ul>${tools}<div class="build-controls"><button type="button" data-build-delta="-1" ${i===0?'disabled':''}>${icon('arrow')}${escapeHTML(c.ui.buildPrev)}</button><button type="button" data-build-delta="1" ${i===5?'disabled':''}>${escapeHTML(c.ui.buildNext)}${icon('arrow')}</button></div></article>`;
}

export function renderPage(lang) {
  const c=CONTENT[lang],x=EXTRA[lang];
  return `
  <section id="top" class="hero"><div class="wrap">
    <div class="hero-grid"><div class="hero-copy"><div class="hero-kicker">${eyebrow(c.hero.eyebrow)}</div><h1>ChronoDesk</h1><h2 class="hero-tagline">${escapeHTML(c.hero.title)}<br><em>${escapeHTML(c.hero.accent)}</em></h2><p class="lead">${escapeHTML(c.hero.lead)}</p><div class="hero-actions">${link('#video',c.hero.primary,'button','play')}${link('#build',c.hero.secondary,'button secondary','arrow')}</div><p class="hero-small">${escapeHTML(c.hero.small)}</p></div>
    <figure class="product-card" style="margin:0"><div class="product-card-top"><span>DESIGNED FOR YOUR DESK</span><span class="orbit-symbol" aria-hidden="true">✳</span></div><img class="product-photo" src="./assets/images/hero.webp" alt="ChronoDesk" width="1000" height="798" fetchpriority="high"><figcaption class="product-card-bottom"><span>CHRONODESK / 01</span><span>ESP32-C3 · ST7735 · SHT31</span></figcaption></figure></div>
    <div class="hero-stats">${c.hero.stats.map(s=>`<div class="hero-stat"><strong>${escapeHTML(s.value)}</strong><span>${escapeHTML(s.label)}</span></div>`).join('')}</div>
  </div><div class="feature-ticker"><div class="wrap ticker-inner">${c.modes.items.map((m,i)=>`<span class="ticker-item">${icon(MODE_ICONS[m.id])}${escapeHTML(m.name.toUpperCase())}</span>${i<3?'<span class="ticker-dot" aria-hidden="true">✳</span>':''}`).join('')}</div></div></section>
  <section id="overview" class="section overview-section"><div class="wrap abstract-grid"><div>${eyebrow(c.abstract.eyebrow)}<h2>${escapeHTML(c.abstract.title)}</h2><span class="abstract-label">06016409 · PHYSICAL COMPUTING</span></div><div class="abstract-copy"><p>${escapeHTML(c.abstract.body)}</p></div></div></section>
  <section class="section story-section"><div class="wrap"><div class="story-heading">${eyebrow(c.story.eyebrow)}<h2>${escapeHTML(c.story.title)}</h2></div><div class="story-grid"><div class="story-column"><h3>${escapeHTML(c.story.problemTitle)}</h3><p>${escapeHTML(c.story.problem)}</p></div><div class="story-column"><h3>${escapeHTML(c.story.solutionTitle)}</h3><p>${escapeHTML(c.story.solution)}</p></div></div><div class="story-steps">${c.story.steps.map((s,i)=>`<div class="story-step"><span class="step-number">0${i+1}</span><h4>${escapeHTML(s.title)}</h4><p>${escapeHTML(s.body)}</p></div>`).join('')}</div></div></section>
  <section id="modes" class="section modes-section"><div class="wrap"><div class="section-head"><div>${eyebrow(c.modes.eyebrow)}<h2>${escapeHTML(c.modes.title)}</h2></div><p class="lead">${escapeHTML(c.modes.lead)}</p></div><div class="modes-grid">
    <div class="simulator"><div class="sim-heading"><span>DEMO</span><span>${escapeHTML(c.ui.simLabel)}</span></div><div class="sim-device"><button id="device-button" type="button" class="device-button" style="--hold-progress:0" aria-label="${escapeHTML(c.ui.simHint)}" aria-describedby="sim-caption"></button><div class="sim-display"><canvas id="device-screen" width="160" height="80" role="img" aria-label="${escapeHTML(x.simA11y)}"></canvas></div><div class="device-logo" aria-hidden="true">CHRONODESK</div></div><div class="sim-shadow" aria-hidden="true"></div><p class="sim-state" id="sim-state" role="status"></p><div class="sim-actions"><button class="sim-action" id="sim-short" type="button">${escapeHTML(c.ui.simPress)}</button><button class="sim-action" id="sim-next" type="button">${escapeHTML(c.ui.simNext)} ↗</button></div><div class="sim-secondary"><button type="button" id="sim-reset">${escapeHTML(c.ui.simReset)}</button><button type="button" id="sim-finish">${escapeHTML(x.finish)}</button></div><p class="sim-caption" id="sim-caption">${escapeHTML(c.ui.simCaption)}<br>${escapeHTML(x.holdHint)}</p></div>
    <div class="mode-copy"><div class="mode-tabs" role="tablist" aria-label="${escapeHTML(c.nav.modes)}">${c.modes.items.map((m,i)=>`<button id="mode-tab-${m.id}" class="mode-tab" type="button" role="tab" data-mode="${m.id}" aria-controls="mode-detail" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}">${escapeHTML(m.name)}</button>`).join('')}</div><div id="mode-detail" class="mode-detail" role="tabpanel" aria-labelledby="mode-tab-animation">${renderModeDetail(c.modes.items[0],c,x)}</div></div>
  </div></div></section>
  <section class="section flow-section"><div class="wrap">${eyebrow(c.flow.eyebrow)}<h2>${escapeHTML(c.flow.title)}</h2><div class="flow-row">${c.flow.steps.map((s,i)=>`<div class="flow-step"><div class="flow-top"><span class="flow-icon">${icon(['sensor','chip','display'][i])}</span><div><span class="step-number">${s.number}</span><h3>${escapeHTML(s.title)}</h3></div></div><p>${escapeHTML(s.body)}</p></div>`).join('')}</div></div></section>
  <section id="video" class="section video-section"><div class="wrap video-layout"><div class="video-copy">${eyebrow('THE PROJECT FILM / 06:02')}<h2>${escapeHTML(c.ui.videoTitle)}</h2><p class="lead">${escapeHTML(c.ui.videoLead)}</p>${link(YOUTUBE,c.ui.watchVideo,'text-link','external','target="_blank" rel="noopener noreferrer"')}</div><div><div id="video-container" class="video-frame"><button class="video-poster" id="play-video" type="button" aria-label="${escapeHTML(c.ui.videoPlay)}"><img src="./assets/images/hero.webp" alt="ChronoDesk" loading="lazy" width="1000" height="798"><span class="play-circle">${icon('play')}</span><span class="video-caption"><span>${escapeHTML(x.videoShort)}</span><small>06:02</small></span></button></div><p class="video-consent">${escapeHTML(c.ui.videoConsent)}</p></div></div></section>
  <section id="hardware" class="section hardware-section"><div class="wrap"><div class="section-head"><div>${eyebrow(c.hardware.eyebrow)}<h2>${escapeHTML(c.hardware.title)}</h2></div><p class="lead">${escapeHTML(c.hardware.lead)}</p></div><div class="hardware-layout"><div class="diagram-card"><button id="expand-diagram" type="button" class="diagram-open" aria-label="${escapeHTML(c.ui.expandDiagram)}" aria-haspopup="dialog"><img src="./assets/images/diagram.webp" alt="${escapeHTML(c.hardware.diagramCaption)}" loading="lazy" width="1414" height="1609"></button><div class="diagram-bar"><span>${escapeHTML(c.hardware.diagramCaption)}</span><button type="button" data-expand-diagram>${escapeHTML(c.ui.view)} ↗</button></div></div><div><div class="component-list" role="group" aria-label="${escapeHTML(c.nav.hardware)}">${c.hardware.components.map((p,i)=>`<button class="component-button" data-component="${p.id}" type="button" aria-pressed="${i===0}">${icon(COMPONENT_ICONS[p.id])}<span><strong>${escapeHTML(p.name)}</strong><small>${escapeHTML(p.spec)}</small></span><span class="component-qty">${escapeHTML(p.qty)}</span></button>`).join('')}</div><div id="component-detail" class="component-detail" aria-live="polite">${escapeHTML(c.hardware.components[0].body)}</div></div></div>
  <details class="pins-details"><summary>${escapeHTML(c.hardware.pinsTitle)} <span class="visually-hidden">${escapeHTML(c.ui.wiringLabel)}</span></summary><div class="pin-table-wrap"><table class="pin-table"><caption class="visually-hidden">${escapeHTML(c.ui.wiringLabel)}</caption><thead><tr>${c.hardware.pinHeaders.map(t=>`<th scope="col">${escapeHTML(t)}</th>`).join('')}</tr></thead><tbody>${c.hardware.pins.map(p=>`<tr><td>${escapeHTML(p.device)}</td><td>${escapeHTML(p.signal)}</td><td>${escapeHTML(p.pin)}</td></tr>`).join('')}</tbody></table></div></details></div></section>
  <section id="build" class="section build-section"><div class="wrap"><div class="section-head"><div>${eyebrow(c.build.eyebrow)}<h2>${escapeHTML(c.build.title)}</h2></div><p class="lead">${escapeHTML(c.build.lead)}</p></div><div class="build-layout"><div class="build-tabs" role="tablist" aria-orientation="vertical" aria-label="${escapeHTML(c.nav.build)}">${c.build.steps.map((s,i)=>`<button class="build-tab" type="button" role="tab" id="build-tab-${i}" data-build-step="${i}" aria-controls="build-panel-${i}" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}"><span>0${i+1}</span>${escapeHTML(s.title)}</button>`).join('')}</div><div>${c.build.steps.map((s,i)=>renderBuildStep(s,i,c,x)).join('')}</div></div></div></section>
  <section class="section limits-section"><div class="wrap"><div class="limits-layout"><div>${eyebrow(c.limits.eyebrow)}<h2>${escapeHTML(c.limits.title)}</h2><p class="lead">${escapeHTML(c.limits.lead)}</p></div><div>${c.limits.items.map(s=>`<article class="limit-item"><h3>${escapeHTML(s.title)}</h3><p>${escapeHTML(s.body)}</p></article>`).join('')}</div></div><aside class="future-note"><h3>${escapeHTML(c.limits.futureTitle)}</h3><p>${escapeHTML(c.limits.future)}</p></aside></div></section>
  <section id="files" class="section files-section"><div class="wrap"><div class="section-head"><div>${eyebrow(c.files.eyebrow)}<h2>${escapeHTML(c.files.title)}</h2></div><p class="lead">${escapeHTML(c.files.lead)}</p></div><div class="files-grid">${c.files.items.map(f=>`<article class="file-card">${icon(FILES[f.id][1])}<span class="format">${escapeHTML(f.format)}</span><h3>${escapeHTML(f.title)}</h3><p>${escapeHTML(f.body)}</p>${link(`./assets/downloads/${FILES[f.id][0]}`,c.ui.download,'text-link','download','download')}${f.id==='case'?`<div class="stl-links">${['front','body','rear','support'].map(name=>`<a href="./assets/downloads/${name}.stl" download>${name}.stl</a>`).join('')}</div>`:''}</article>`).join('')}</div><div class="files-end"><p>${escapeHTML(x.fileNote)}</p>${link(REPO,c.ui.openGithub,'button secondary','code','target="_blank" rel="noopener noreferrer"')}</div></div></section>
  <section id="team" class="section team-section"><div class="wrap"><div class="section-head"><div>${eyebrow(c.team.eyebrow)}<h2>${escapeHTML(c.team.title)}</h2></div><p class="lead">${escapeHTML(c.team.lead)}</p></div><div class="team-grid">${c.team.members.map(m=>`<article class="team-card"><img src="./assets/images/team-${m.id}.webp" alt="${escapeHTML(m.name)}" width="180" height="180" loading="lazy"><div><h3>${escapeHTML(m.name)}</h3><span class="student-id">${escapeHTML(m.studentId)}</span><p class="team-role">${escapeHTML(m.role)}</p></div></article>`).join('')}</div><div class="instructor-row"><img src="./assets/images/instructor.webp" alt="${escapeHTML(c.team.instructorName)}" width="80" height="80" loading="lazy"><div><small>${escapeHTML(c.team.instructorLabel)}</small>${escapeHTML(c.team.instructorName)}</div></div><p class="course-line">${escapeHTML(c.team.course)} · ${escapeHTML(x.notes)}</p></div></section>`;
}

export function renderFooter(lang){const c=CONTENT[lang];return `<div class="wrap site-footer-inner"><div><span class="footer-brand">ChronoDesk ✳</span><a class="footer-top-link" href="#top">↑ ${escapeHTML(c.ui.backToTop)}</a></div><div class="footer-copy"><p>${escapeHTML(c.footer.line)}</p><p>${escapeHTML(c.footer.credit)}</p></div></div>`;}
function renderModeDetail(m,c,x){return `<h3>${escapeHTML(m.headline)}</h3><p>${escapeHTML(m.body)}</p><p class="source">${escapeHTML(c.ui.sourceLabel)}: ${escapeHTML(m.source)}</p><p class="mode-note">${escapeHTML(m.detail)}</p><div class="real-screen"><img src="./assets/images/mode-${m.id}.webp" width="320" height="160" alt="${m.name}" loading="lazy"><span>${escapeHTML(x.physical)}<br>ST7735 · 160 × 80 px</span></div>`;}

function startBrowserApp(){
  let lang='th';try{if(localStorage.getItem('chronodesk-language')==='en')lang='en';}catch{}
  let mode='animation',buildStep=0,component='esp';
  let animationPaused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionLabels={th:['หยุดภาพเคลื่อนไหว','เล่นภาพเคลื่อนไหว'],en:['Pause animation','Play animation']};
  const timer={phase:'work',remaining:1500,status:'ready'};
  const frames=Array.from({length:8},(_,i)=>{const im=new Image();im.src=`./assets/animation/frame-${i}.png`;return im;});
  let ctx,canvas,lastTick=performance.now(),lastFrame=0,animFrame=0;
  let holdTimer=null,holdAnimation=null,holdStarted=0,longFired=false,shortTimer=null,buttonEl=null;
  let navObserver=null;
  const c=()=>CONTENT[lang],x=()=>EXTRA[lang];
  function announce(text){document.querySelector('#announcer').textContent=text;}
  function initialize(){
    const scroll=window.scrollY;
    document.documentElement.lang=lang;document.title=c().meta.title;
    document.querySelector('meta[name=description]').content=c().meta.description;
    document.querySelector('#main').innerHTML=renderPage(lang);
    document.querySelector('#main-nav').innerHTML=renderNav(lang);
    document.querySelector('#site-footer').innerHTML=renderFooter(lang);
    document.querySelectorAll('[data-label]').forEach(el=>{el.textContent=c().ui[el.dataset.label];});
    document.querySelector('#language-toggle').setAttribute('aria-label',c().ui.language);
    document.querySelector('#language-toggle').innerHTML=`<span class="${lang==='th'?'is-current':''}">TH</span><span class="language-divider">/</span><span class="${lang==='en'?'is-current':''}">EN</span>`;
    document.querySelector('#menu-toggle').setAttribute('aria-label',c().ui.menu);
    document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');
    document.querySelector('#main-nav').classList.remove('open');
    document.querySelector('[data-close-dialog]').setAttribute('aria-label',c().ui.close);
    document.querySelector('#diagram-dialog').setAttribute('aria-label',c().ui.expandDiagram);
    document.querySelector('#diagram-dialog img').alt=c().hardware.diagramCaption;
    canvas=document.querySelector('#device-screen');ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
    buttonEl=document.querySelector('#device-button');
    bindControls();selectMode(mode,false);selectBuild(buildStep,false);selectComponent(component);observeNav();
    if(scroll)window.scrollTo({top:scroll,behavior:'instant'});
  }
  function observeNav(){
    navObserver?.disconnect();
    navObserver=new IntersectionObserver(entries=>{const entry=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!entry)return;document.querySelectorAll('#main-nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));},{rootMargin:'-12% 0px -53% 0px',threshold:[0,.1,.3]});
    for(const id of Object.keys(c().nav)){const el=document.getElementById(id);if(el)navObserver.observe(el);}
  }
  function selectMode(value,shouldAnnounce=true){
    mode=value;
    document.querySelectorAll('[data-mode]').forEach(el=>{const active=el.dataset.mode===mode;el.setAttribute('aria-selected',String(active));el.tabIndex=active?0:-1;});
    const info=c().modes.items.find(m=>m.id===mode);
    document.querySelector('#mode-detail').innerHTML=renderModeDetail(info,c(),x());
    document.querySelector('#mode-detail').setAttribute('aria-labelledby',`mode-tab-${mode}`);
    document.querySelector('#sim-short').disabled=mode!=='pomodoro';
    document.querySelector('#sim-reset').disabled=mode!=='pomodoro';
    document.querySelector('#sim-finish').disabled=mode!=='pomodoro';
    lastTick=performance.now();updateState();draw();if(shouldAnnounce)announce(info.name);
  }
  function updateState(){
    const ui=c().ui;
    const label=mode==='pomodoro'?`${timer.phase==='work'?ui.simWork:ui.simBreak} · ${{ready:ui.simReady,running:ui.simRunning,paused:ui.simPaused}[timer.status]}`:c().modes.items.find(m=>m.id===mode).name;
    document.querySelector('#sim-state').textContent=label;
    canvas.setAttribute('aria-label',`${x().simA11y}: ${label}${mode==='pomodoro'?` ${formatTimer(timer.remaining)}`:''}`);
    document.querySelector('#sim-short').textContent=mode==='pomodoro'?{ready:ui.simPress,running:ui.simPaused,paused:ui.simPress}[timer.status]:ui.simPress;
    document.querySelector('#sim-reset').hidden=mode!=='pomodoro';
    document.querySelector('#sim-finish').hidden=mode!=='pomodoro';
    const motionButton=document.querySelector('#sim-motion');
    if(motionButton){motionButton.hidden=mode!=='animation';motionButton.textContent=motionLabels[lang][animationPaused?1:0];motionButton.setAttribute('aria-pressed',String(animationPaused));}
  }
  function nextScreen(){clearTimeout(shortTimer);shortTimer=null;selectMode(MODES[(MODES.indexOf(mode)+1)%4]);}
  function shortPress(){if(mode!=='pomodoro')return;timer.status=timer.status==='running'?'paused':'running';lastTick=performance.now();updateState();draw();announce(document.querySelector('#sim-state').textContent);}
  function resetTimer(){if(mode!=='pomodoro')return;timer.remaining=timer.phase==='work'?1500:300;timer.status='ready';updateState();draw();announce(c().ui.simReset);}
  function finishTimer(){if(mode!=='pomodoro')return;timer.phase=timer.phase==='work'?'break':'work';timer.remaining=timer.phase==='work'?1500:300;timer.status='ready';updateState();draw();announce(c().ui.simComplete);}
  function beginHold(){if(holdTimer)return;longFired=false;holdStarted=performance.now();holdTimer=setTimeout(()=>{longFired=true;nextScreen();},2000);const animate=()=>{const p=Math.min((performance.now()-holdStarted)/2000,1);buttonEl.style.setProperty('--hold-progress',p);if(holdTimer)holdAnimation=requestAnimationFrame(animate);};animate();}
  function endHold(cancel=false){if(!holdTimer)return;clearTimeout(holdTimer);holdTimer=null;cancelAnimationFrame(holdAnimation);buttonEl.style.setProperty('--hold-progress',0);if(cancel||longFired)return;if(shortTimer){clearTimeout(shortTimer);shortTimer=null;resetTimer();}else{shortTimer=setTimeout(()=>{shortTimer=null;shortPress();},300);}}
  function selectBuild(index,focus=false){buildStep=index;document.querySelectorAll('[data-build-step]').forEach(el=>{const yes=Number(el.dataset.buildStep)===index;el.setAttribute('aria-selected',String(yes));el.tabIndex=yes?0:-1;});document.querySelectorAll('.build-panel').forEach((el,i)=>{el.hidden=i!==index;});if(focus)document.getElementById(`build-tab-${index}`).focus({preventScroll:true});}
  function selectComponent(id){component=id;document.querySelectorAll('[data-component]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.component===id)));document.querySelector('#component-detail').textContent=c().hardware.components.find(p=>p.id===id).body;}
  function bindControls(){
    const motionButton=document.createElement('button');motionButton.id='sim-motion';motionButton.type='button';
    document.querySelector('.sim-secondary').prepend(motionButton);
    motionButton.addEventListener('click',()=>{animationPaused=!animationPaused;updateState();});
    document.querySelectorAll('[data-mode]').forEach(el=>el.addEventListener('click',()=>selectMode(el.dataset.mode)));
    document.querySelector('.mode-tabs').addEventListener('keydown',e=>{let i=MODES.indexOf(mode);if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();i=e.key==='Home'?0:e.key==='End'?3:(i+(e.key==='ArrowRight'?1:3))%4;selectMode(MODES[i]);document.querySelector(`[data-mode="${mode}"]`).focus();}});
    document.querySelectorAll('[data-build-step]').forEach(el=>el.addEventListener('click',()=>selectBuild(Number(el.dataset.buildStep))));
    document.querySelector('.build-tabs').addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const i=e.key==='Home'?0:e.key==='End'?5:(buildStep+(['ArrowDown','ArrowRight'].includes(e.key)?1:5))%6;selectBuild(i,true);}});
    document.querySelectorAll('[data-build-delta]').forEach(el=>el.addEventListener('click',()=>selectBuild(Math.max(0,Math.min(5,buildStep+Number(el.dataset.buildDelta))),true)));
    document.querySelectorAll('[data-component]').forEach(el=>el.addEventListener('click',()=>selectComponent(el.dataset.component)));
    document.querySelector('#sim-short').addEventListener('click',shortPress);
    document.querySelector('#sim-next').addEventListener('click',nextScreen);
    document.querySelector('#sim-reset').addEventListener('click',resetTimer);
    document.querySelector('#sim-finish').addEventListener('click',finishTimer);
    buttonEl.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();buttonEl.setPointerCapture(e.pointerId);beginHold();});
    buttonEl.addEventListener('pointerup',()=>endHold());buttonEl.addEventListener('pointercancel',()=>endHold(true));
    buttonEl.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();if(!e.repeat)beginHold();}});
    buttonEl.addEventListener('keyup',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();endHold();}});
    buttonEl.addEventListener('blur',()=>endHold(true));
    document.querySelector('#play-video').addEventListener('click',()=>{const iframe=document.createElement('iframe');iframe.src='https://www.youtube-nocookie.com/embed/xJjyy5MB8Cg?autoplay=1&rel=0';iframe.title=c().ui.videoTitle;iframe.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';document.querySelector('#video-container').replaceChildren(iframe);});
    document.querySelectorAll('#expand-diagram,[data-expand-diagram]').forEach(el=>el.addEventListener('click',()=>document.querySelector('#diagram-dialog').showModal()));
    document.querySelector('[data-copy-config]').addEventListener('click',async e=>{const label=e.currentTarget;const text=label.parentElement.querySelector('code').textContent;try{await navigator.clipboard.writeText(text);announce(c().ui.copied);label.innerHTML=`${icon('check')}${escapeHTML(c().ui.copied)}`;}catch{announce(x().copyFail);}});
    document.querySelectorAll('#main-nav a').forEach(el=>el.addEventListener('click',()=>{document.querySelector('#main-nav').classList.remove('open');document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');}));
  }
  function formatTimer(seconds){return `${Math.floor(seconds/60).toString().padStart(2,'0')}:${(seconds%60).toString().padStart(2,'0')}`;}
  function draw(){
    if(!ctx)return;ctx.fillStyle='#10171d';ctx.fillRect(0,0,160,80);ctx.textBaseline='alphabetic';ctx.imageSmoothingEnabled=false;
    const text=(value,x,y,size,color='#eef3f5',mono=false)=>{ctx.fillStyle=color;ctx.font=`${size}px ${mono?'monospace':'Noto, sans-serif'}`;ctx.fillText(value,x,y);};
    const header=(name,color='#314b8e')=>{ctx.fillStyle=color;ctx.fillRect(0,0,160,12);text(name,3,9,8,'#fff',true);};
    if(mode==='animation'){const im=frames[animFrame];if(im?.complete&&im.naturalWidth)ctx.drawImage(im,56,16,48,48);}
    else if(mode==='clock'){header('CLOCK');const date=new Date();const time=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Bangkok',hour:'2-digit',minute:'2-digit',hour12:true}).format(date);const parts=time.split(' ');text(parts[0],6,46,27,'#f2f5ff',true);text(parts[1],126,43,9,'#b3cbd4',true);text(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Bangkok',weekday:'short',day:'2-digit',month:'short',year:'numeric'}).format(date),7,68,8,'#c0ced6',true);}
    else if(mode==='weather'){header('WEATHER','#337988');ctx.strokeStyle='#3c555e';ctx.beginPath();ctx.moveTo(80,14);ctx.lineTo(80,80);ctx.stroke();text('OUTDOOR',3,25,9,'#b3dff4',true);text('INDOOR',84,25,9,'#c2e3bc',true);text('33.8 C',3,43,17,'#fff',true);text('24.0 C',84,43,17,'#fff',true);text('light rain',4,59,8,'#ced5da',true);text('H:58%',4,73,8,'#ced5da',true);text('H:45%',85,73,8,'#ced5da',true);}
    else{header(timer.phase==='work'?'STUDY':'BREAK','#314b8e');text(timer.status.toUpperCase(),107,10,6,'#ffc8e1',true);text(formatTimer(timer.remaining),32,51,27,'#fff',true);text(timer.phase==='work'?'25 MIN WORK':'5 MIN BREAK',42,70,8,'#9fb8c7',true);}
  }
  document.querySelector('#language-toggle').addEventListener('click',()=>{endHold(true);clearTimeout(shortTimer);shortTimer=null;lang=lang==='th'?'en':'th';try{localStorage.setItem('chronodesk-language',lang);}catch{}initialize();});
  document.querySelector('#menu-toggle').addEventListener('click',()=>{const nav=document.querySelector('#main-nav');const open=nav.classList.toggle('open');document.querySelector('#menu-toggle').setAttribute('aria-expanded',String(open));});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('#main-nav').classList.remove('open');document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');}});
  document.querySelector('[data-close-dialog]').addEventListener('click',()=>document.querySelector('#diagram-dialog').close());
  initialize();
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  reduced.addEventListener('change',e=>{if(e.matches){animationPaused=true;updateState();}});
  setInterval(()=>{const now=performance.now();if(mode==='pomodoro'&&timer.status==='running'&&now-lastTick>=1000){timer.remaining=Math.max(0,timer.remaining-1);lastTick=now;if(timer.remaining===0)finishTimer();canvas.setAttribute('aria-label',`${x().simA11y}: ${document.querySelector('#sim-state').textContent} ${formatTimer(timer.remaining)}`);}
    if(now-lastFrame>=(reduced.matches?1000:80)){if(!animationPaused)animFrame=(animFrame+1)%8;lastFrame=now;draw();}
  },60);
}
if(typeof document!=='undefined')startBrowserApp();
