import { TODO_KEY } from "@/constants";
import { syncTodos } from "@/syncTodos";
import { createClient } from "@/utils/supabase/client";

export async function fetchTodos(setTodos) {
  const supabase = createClient();

  const localTodos = JSON.parse(localStorage.getItem(TODO_KEY) ?? "[]");
  // await syncTodos();

  const { data: supabaseTodos } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });

  if (typeof window === "undefined") return;

  const todosToShow = [...localTodos, ...(supabaseTodos ?? [])];

  setTodos(todosToShow);
}
