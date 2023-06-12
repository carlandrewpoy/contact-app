'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import { FormEventHandler, useState } from 'react'
import { addContact, } from '@/public/api'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { useAutoSelectInputNumber } from '@/public/customHooks'
import Modal from './Modal'

const AddContact = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const inputRef = useAutoSelectInputNumber(openModal);
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '09',
  });

  console.log(formData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitContact: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await addContact({
          id: parseInt(uuidv4()),
          name: formData.name,
          address: formData.address,
          mobile: formData.mobile
        })

    setOpenModal(false)
    setFormData({
      name: '',
      address: '',
      mobile: '09',
    })
    router.refresh()
  }

  return (
    <div className="w-full">
      <button onClick={() => setOpenModal(true)} className="btn btn-primary w-full">Add New <AiOutlinePlus size={18} /></button>
      <Modal modal={openModal} setModal={setOpenModal}>
      <form onSubmit={handleSubmitContact}>
      <h3 className='font-bold text-lg mb-5'>Add New Contact</h3>
      <div className='flex flex-col text-xl gap-4'>
      <div className='flex flex-col gap-2'>
          <label className='text-start' htmlFor='mobile'>
            Mobile
          </label>
          <input
            className='input input-bordered input-primary w-full'
            type='tel'
            id='mobile'
            name='mobile'
            value={formData.mobile}
            onChange={handleInputChange}
            required
            ref={inputRef}
            pattern="09[0-9]{9}"            
            maxLength={11}
            />
        </div>
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
            required
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
            required
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

export default AddContact