'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/assets/images/mlsa.png": "ac77090e37e75814439d7134e6f38d28",
"assets/assets/images/flutterscope.png": "bf9d96f9660b19b398e0b02316f65523",
"assets/assets/images/logo.png": "efb139129cab45bfb5454fbe555ab894",
"assets/assets/images/mms.png": "a8433784455e9ee9315e59d1fc1e1357",
"assets/assets/images/github.png": "bada3b2dca0911637f07d961cd7da5d5",
"assets/assets/images/ddstechvira.png": "e8468c1307955ea1f2e64bb5b3f14a80",
"assets/assets/images/icon.png": "efb139129cab45bfb5454fbe555ab894",
"assets/assets/images/nibm.png": "b0842646385fb6105a447c069b668579",
"assets/assets/fonts/Poppins-Bold.ttf": "08c20a487911694291bd8c5de41315ad",
"assets/assets/fonts/Poppins-Regular.ttf": "093ee89be9ede30383f39a899c485a82",
"assets/assets/fonts/Poppins-Medium.ttf": "bf59c687bc6d3a70204d3944082c5cc0",
"assets/assets/fonts/Poppins-SemiBold.ttf": "6f1520d107205975713ba09df778f93f",
"assets/assets/icons/volunteer.png": "7c2b0e4e0cd150fd439e01cd60da1261",
"assets/assets/icons/instagram.png": "78064309e7314e8399f3f83d715aecc7",
"assets/assets/icons/student.png": "e9e5874f03b649f3101e7458f3b7acdf",
"assets/assets/icons/done.png": "d3786409b1df621a0b55e61d92430590",
"assets/assets/icons/github.png": "e6b2daf427b81c388625ffee75f2acf4",
"assets/assets/icons/linkedin.png": "1816e5c1168ca75e4e824ed21c4f002a",
"assets/assets/icons/facebook.png": "cb055867df3c7b03ef1135f77d1a9411",
"assets/assets/icons/developer.png": "6576f0932f8dc70413579a59715c184b",
"assets/assets/icons/youtube.png": "92d7341ea8fd5c88350cbd570a145f43",
"assets/assets/icons/telegram.png": "c89ff009e3e05233e29b53baea4b57de",
"assets/assets/icons/hashnode.png": "5830176711a7028847bb9ef5fba9b39b",
"assets/assets/icons/twitter.png": "632f6320a7e3538439ffafd9ee8a03cd",
"assets/assets/icons/dev.png": "136350fd9f00dc8d1dd1514e40b9f9cd",
"assets/FontManifest.json": "d5c53906b6d86d304b23aa61eec71815",
"assets/AssetManifest.json": "83abcebe70d116725ae71a9224454d9a",
"assets/NOTICES": "8eed130553b9c359b726aa988ba2d723",
"assets/AssetManifest.bin": "e19d0abc08d820efdb934c0cf92e51a1",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin.json": "6434c8235b7946d1df8e0fdf583433d5",
"assets/fonts/MaterialIcons-Regular.otf": "057071262697e945e35c87ba124272f4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"manifest.json": "d40c47d1c161f94dbcb13094d37f1f55",
"index.html": "b4365e5d14d54951cb27114d2957341c",
"/": "b4365e5d14d54951cb27114d2957341c",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"icons/icon-192.png": "3ddf2652eeb1ffd518f60f434873ae0c",
"icons/icon-maskable-192.png": "3ddf2652eeb1ffd518f60f434873ae0c",
"icons/icon-512.png": "45e02610a7f6bde221f0d2182731a860",
"icons/icon-maskable-512.png": "45e02610a7f6bde221f0d2182731a860",
"favicon.ico": "5f88eac737433b5876921bab5051bb83",
"favicon.png": "3d336150ae72bbc56d7c55d23e2d6a97",
"main.dart.js": "6564b81b9036a41e3749bab3e3c8d133",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"version.json": "009c9e65172e010890f7f65fde438006"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
