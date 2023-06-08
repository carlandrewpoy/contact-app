'use client'

import { ITask } from "@/types/tasks"
import React, { FormEventHandler, useRef, useState, useEffect } from "react"
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

  const [formData, setFormData] = useState({
    name: todo.name,
    address: todo.address,
    mobile: todo.mobile,
  });

  console.log(formData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmitTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await editTodo({
      id: todo.id,
      name: formData.name,
      address: formData.address,
      mobile: formData.mobile
    })
    setOpenEditModal(false)
    router.refresh()
  }

  useRef(() => {

  })

  const handleDeleteTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await deleteTodo({
      id: todo.id,
      name: "",
      address: "",
      mobile: ""
    })
    router.refresh()

  }

  return (
    <tr key={todo.id} className="hover text-lg">
      <td>{todo.mobile}</td>
      <td>{todo.name}</td>
      <td>{todo.address}</td>
      <td className='flex gap-x-5'>
        <button onClick={() => setOpenEditModal(true)} className="text-yellow-500"><FiEdit cursor='pointer' size={25} /></button>
        <Modal modal={openEditModal} setModal={setOpenEditModal}>
        <form onSubmit={handleSubmitTodo}>
          <h3 className='font-bold text-lg mb-5'>Add New Task</h3>
          <div className='flex flex-col text-xl gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-start' htmlFor='name'>
                Name
              </label>
              <input
              ref={inputRef}
                className='input input-bordered input-primary w-full'
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-start' htmlFor='address'>
                Address
              </label>
              <input
                className='input input-bordered input-primary w-full'
                type='text'
                id='address'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-start' htmlFor='mobile'>
                Mobile
              </label>
              <input
                className='input input-bordered input-primary w-full'
                type='text'
                id='mobile'
                name='mobile'
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <button type='submit' className='btn'>
              Add
            </button>
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