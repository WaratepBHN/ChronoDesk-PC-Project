import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderPage,renderNav,renderFooter} from './app.js';
const root=path.dirname(fileURLToPath(import.meta.url));
const template=fs.readFileSync(path.join(root,'index.template.html'),'utf8');
fs.writeFileSync(path.join(root,'index.html'),template.replace('<!--NAV-->',renderNav('th')).replace('<!--CONTENT-->',renderPage('th')).replace('<!--FOOTER-->',renderFooter('th')));
console.log('Built static index.html; no runtime framework or install step required.');
