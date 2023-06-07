const baseUrl = 'http://localhost:3001'
import { ITask } from "@/types/tasks"

export const getTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' })
  const todos = await res.json()
  return todos
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const newTodo = await res.json()
  return newTodo
}

export const editTodo = async (todo: ITask): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const newTodo = await res.json()
  return newTodo
}

export const deleteTodo = async (todo: ITask) => {
  await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: 'DELETE',
  })
}