"use client";

import { TodoListContainer } from "@/components/todo-list-container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-2">
      <TodoListContainer />
    </main>
  );
}
