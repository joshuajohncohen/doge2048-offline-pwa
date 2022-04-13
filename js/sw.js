const cacheName = 'doge2048-offline';
const appShellFiles = [
  '/index.html',
  '/js/animframe_polyfill.js',
  '/js/application.js',
  '/js/game_manager.js',
  '/js/grid.js',
  '/js/html_actuator.js',
  '/js/keyboard_input_manager.js',
  '/js/local_score_manager.js',
  '/js/tile.js',
  '/img/212/doge-derp-212.gif',
  '/img/212/doge-fat-212.gif',
  '/img/212/doge-gradient-212.gif',
  '/img/212/doge-hat-212.gif',
  '/img/212/doge-peepers-212.gif',
  '/img/212/doge-prizza-212.gif',        
  '/img/212/doge-rainbow-212.gif',
  '/img/212/doge-shake-space-212.gif',
  '/img/212/doge-sunglasses-212.gif',        
  '/img/212/doge-shake-212.gif',
  '/img/212/doge-wink-212.gif',
  '/img/114/doge-derp-114.gif',
  '/img/114/doge-fat-114.gif',
  '/img/114/doge-gradient-114.gif',
  '/img/114/doge-hat-114.gif',
  '/img/114/doge-peepers-114.gif',
  '/img/114/doge-prizza-114.gif',        
  '/img/114/doge-rainbow-114.gif',
  '/img/114/doge-shake-space-114.gif',
  '/img/114/doge-sunglasses-114.gif',        
  '/img/114/doge-shake-114.gif',
  '/img/114/doge-wink-114.gif',
  '/meta/apple-touch-icon.png',
  '/meta/doge-600.png',
  '/style/main.css',
  '/style/main.scss',
  '/style/helpers.scss',
  '/style/fonts/comic_sans.eot',
  '/style/fonts/comic_sans.svg',
  '/style/fonts/comic_sans.ttf',
  '/style/fonts/comic_sans.woff',
  '/style/fonts/comic-sans.css',
  '/style/fonts/ComicSansMS-Bold.eot',
  '/style/fonts/ComicSansMS-Bold.ttf',
  '/style/fonts/ComicSansMS-Bold.woff',
  '/style/fonts/ComicSansMS-BoldItalic.eot',
  '/style/fonts/ComicSansMS-BoldItalic.ttf',
  '/style/fonts/ComicSansMS-BoldItalic.woff',
  '/style/fonts/ComicSansMS-Italic.eot',
  '/style/fonts/ComicSansMS-Italic.ttf',
  '/style/fonts/ComicSansMS-Italic.woff',
  '/style/fonts/ComicSansMS-Regular.eot',
  '/style/fonts/ComicSansMS-Regular.ttf',
  '/style/fonts/ComicSansMS-Regular.woff',
  '/favicon.png'
];
const contentToCache = appShellFiles;

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
  });
  self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });
    