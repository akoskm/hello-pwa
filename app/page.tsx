"use client";

import { TodoListContainer } from "@/components/todo-list-container";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const workerScript =
        process.env.NODE_ENV === "development"
          ? "service-worker-dev.js"
          : "service-worker.js";
      navigator.serviceWorker
        .register(workerScript, { type: "module" })
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TodoListContainer />
    </main>
  );
}
