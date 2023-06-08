import { ITask } from '@/types/tasks'
import React from 'react'
import Task from './Task'

interface TodoListProps {
  todos: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ todos  }) => {
  const context = (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className='text-xl font-bold'>Mobile</th>
              <th className='text-xl font-bold'>Name</th>
              <th className='text-xl font-bold'>Address</th>
              <th className='text-xl font-bold'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {todos.map((todo: any) => <Task key={todo.id} todo={todo} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
  return context
}

export default TodoList