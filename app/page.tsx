import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getTodos } from "@/public/api";

export default async function Home() {
  const todos = await getTodos()
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4 ">
        <h1 className="text-2xl">Contact List App</h1> 
        <AddTask />
      </div>
    <TodoList todos={todos} />
    </main>
  )
}
