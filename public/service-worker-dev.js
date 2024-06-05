import { handleInstall, handleFetch } from "./service-worker-lib.js";

self.addEventListener('install',  handleInstall);

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
});

self.addEventListener('fetch', handleFetch(true));