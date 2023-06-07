'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler, useState, useEffect, useRef } from 'react'
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

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //     inputRef.current.select();
  //   }
  // }, [openModal]);

  const handleSubmitTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    console.log(newTaskValue)  
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    setNewTaskValue('')
    setOpenModal(false)
    router.refresh()
  }

  return (
    <div className="w-full">
      <button onClick={() => setOpenModal(true)} className="btn btn-primary w-full">Add New <AiOutlinePlus size={18} /></button>
      <Modal modal={openModal} setModal={setOpenModal}>
        <form onSubmit={handleSubmitTodo}>
          <h3 className='font-bold text-lg'>Add New Task</h3>
          <div className='modal-action'>
            <input ref={inputRef} type="text" placeholder="Type here" 
              className="input input-bordered input-primary w-full" 
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
            />
            <button type='submit' className="btn">Add</button> 
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask