const baseUrl = 'http://127.0.0.1:8000/api'
import { ITask } from "@/types/tasks"

export const getTodos = async () => {

  const res = await fetch(`${baseUrl}/employees`, { 
    method: 'GET',
    cache: 'no-store'
   })
   const todos = await res.json()
    return todos 

}

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const newTodo = await res.json()
  alert('added successfully')
  return newTodo
}

export const editTodo = async (todo: ITask): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/update/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const newTodo = await res.json()
  alert('edit successfully')
  return newTodo
}

export const deleteTodo = async (todo: ITask) => {
  await fetch(`${baseUrl}/delete/${todo.id}`, {
    method: 'DELETE',headers: {
      'Content-Type': 'application/json'
    }
  })
  alert('delete successfully')
}