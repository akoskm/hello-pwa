import { handleInstall, handleFetch } from "./service-worker-lib.js";

self.addEventListener("install", handleInstall);

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

self.addEventListener("fetch", handleFetch());

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-todos") {
    console.log("kick off the sync action");
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "START_SYNC",
        });
      });
    });
  }
});
