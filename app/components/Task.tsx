'use client'

import { ITask } from "@/types/tasks"
import React, { FormEventHandler, useState } from "react"
import {FiEdit, FiTrash} from 'react-icons/fi'
import Modal from './Modal'
import { deleteTodo, editTodo } from "@/public/api"
import { useRouter } from "next/navigation"
import { useAutoSelectInput, useAutoSelectButton } from "@/public/customHooks"

interface TodoProps {
  todo: ITask
}

const Task: React.FC<TodoProps> = ({ todo }) => {
  const router = useRouter()
  const [openEditModal, setOpenEditModal] = useState(false)
  const inputRef = useAutoSelectInput(openEditModal)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const buttonRef = useAutoSelectButton(openDeleteModal)
  const [newTaskValue, setNewTaskValue] = useState(todo.text)

  
  const handleSubmitTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    // e.preventDefault()
    console.log(newTaskValue)  
    await editTodo({
      id: todo.id,
      text: newTaskValue
    })
    setOpenEditModal(false)
  }

  const handleDeleteTodo = async () => {
    console.log('delete')
    await deleteTodo({
      id: todo.id,
      text: ""
    })
    router.refresh()
  }



  return (
    <tr key={todo.id} className="hover text-lg">
      <td>{todo.text}</td>
      <td className='flex gap-x-5'>
        <button onClick={() => setOpenEditModal(true)} className="text-yellow-500"><FiEdit cursor='pointer' size={25} /></button>
        <Modal modal={openEditModal} setModal={setOpenEditModal}>
          <form onSubmit={handleSubmitTodo}>
            <h3 className='font-bold text-lg'>Edit Task</h3>
            <div className='modal-action'>
              <input type="text" placeholder="Type here" 
                className="input input-bordered input-primary w-full" 
                value={newTaskValue}
                onChange={e => setNewTaskValue(e.target.value)}
                ref={inputRef}
              />
              <button type='submit' className="btn">Add</button> 
            </div>
          </form>
        </Modal>

        <button onClick={() => setOpenDeleteModal(true)} className="text-red-500"><FiTrash cursor='pointer' size={25} /></button>
        <Modal modal={openDeleteModal} setModal={setOpenDeleteModal}>
          <form onSubmit={handleDeleteTodo}>
            <h3 className='font-bold text-lg'>Are sure you want to delete this task.</h3>
            <div className='text-lg text-center'>
              <div className="flex justify-end">
                <button ref={buttonRef} type='submit' className="btn btn-error mx-5">Yes</button> 
              </div>              
            </div>
          </form>
        </Modal>
      </td>
    </tr>
  )
}

export default Task