const C='dm-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon.svg'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('notificationclick',e=>{e.notification.close();const d=e.notification.data||{};const msg={type:'alarm-action',key:d.key,act:e.action||'open'};e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{if(cs.length){cs[0].postMessage(msg);return cs[0].focus();}return clients.openWindow('./index.html?alarm='+encodeURIComponent(d.key||'')+'&act='+(e.action||'open'));}));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.hostname.includes('script.google')||u.hostname.includes('googleusercontent'))return;
e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
