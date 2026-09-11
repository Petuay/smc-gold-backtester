const CACHE="smc-bt-v1";
const SHELL=["./","./index.html","./backtester.html","./lib/lightweight-charts.js","./manifest.json",
             "./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(async c=>{
    await c.addAll(SHELL);
    try{ await c.add(new Request("./backtester_data.js")); }catch(_){}   // big data file: best-effort precache
  }).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin || e.request.method!=="GET") return;   // API calls (Twelve Data) go straight to the network
  if(u.pathname.endsWith("/backtester_data.js")){                       // cache-first; ignore the ?t= cache-buster
    e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
      caches.open(CACHE).then(c=>c.put(new Request(u.origin+u.pathname),res.clone())); return res; })));
    return;
  }
  e.respondWith(fetch(e.request).then(res=>{                             // shell: network-first, cache fallback (offline)
    caches.open(CACHE).then(c=>c.put(e.request,res.clone())); return res;
  }).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
