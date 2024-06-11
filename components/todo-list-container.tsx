import { TodoList } from "./todo-list";

export function TodoListContainer() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Todo List</h1>
      <TodoList />
    </div>
  );
}
