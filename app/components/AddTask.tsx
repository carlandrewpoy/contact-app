'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler, FormEvent, useState, useEffect, useRef } from 'react'
import { addTodo } from '@/public/api'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { useAutoSelectInput } from '@/public/customHooks'

const AddTask = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>('')
  const router = useRouter()
  // const inputRef = useRef<HTMLInputElement>(null);
  const inputRef = useAutoSelectInput(openModal);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
  });

  console.log(formData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await addTodo({
          id: parseInt(uuidv4()),
          name: formData.name,
          address: formData.address,
          mobile: formData.mobile
        })

    setOpenModal(false)
    setFormData({
      name: '',
      address: '',
      mobile: '',
    })
    router.refresh()
  };

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //     inputRef.current.select();
  //   }
  // }, [openModal]);

  // const handleSubmitTodo: FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault()
  //   console.log(newTaskValue)  
  //   await addTodo({
  //     id: uuidv4(),
  //     text: newTaskValue
  //   })
  //   setNewTaskValue('')
  //   setOpenModal(false)
  //   router.refresh()
  // }

  return (
    <div className="w-full">
      <button onClick={() => setOpenModal(true)} className="btn btn-primary w-full">Add New <AiOutlinePlus size={18} /></button>
      <Modal modal={openModal} setModal={setOpenModal}>
      <form onSubmit={handleSubmit}>
      <h3 className='font-bold text-lg mb-5'>Add New Task</h3>
      <div className='flex flex-col text-xl gap-4'>
        <div className='flex flex-col gap-2'>
          <label className='text-start' htmlFor='name'>
            Name
          </label>
          <input
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
    </div>
  )
}

export default AddTask