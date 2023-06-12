"use client"

import { IContact } from "@/types/contact"
import { FormEventHandler, useRef, useState } from "react"
import { deleteContact, editContact } from "@/public/api"
import { useRouter } from "next/navigation"
import { useAutoSelectInputNumber } from "@/public/customHooks"
import { FiEdit, FiTrash } from "react-icons/fi"
import Modal from "./Modal"

interface ContactProps {
  contact: IContact
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  const router = useRouter()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const inputRef = useAutoSelectInputNumber(openEditModal)

  const [formData, setFormData] = useState({
    name: contact.name,
    address: contact.address,
    mobile: contact.mobile,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmitContact: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await editContact({
      id: contact.id,
      name: formData.name,
      address: formData.address,
      mobile: formData.mobile,
    })
    setOpenEditModal(false)
    router.refresh()
  }

  const handleDeleteContact: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await deleteContact({
      id: contact.id,
      name: "",
      address: "",
      mobile: "",
    })
    router.refresh()
  }

  return (
    <tr key={contact.id} className="hover text-lg">
      <td>{contact.mobile}</td>
      <td>{contact.name}</td>
      <td>{contact.address}</td>
      <td className="flex gap-x-5">
        <button
          onClick={() => setOpenEditModal(true)}
          className="text-yellow-500"
        >
          <FiEdit cursor="pointer" size={25} />
        </button>
        <Modal modal={openEditModal} setModal={setOpenEditModal}>
          <form onSubmit={handleSubmitContact}>
            <h3 className="font-bold text-lg mb-5">Add New Task</h3>
            <div className="flex flex-col text-xl gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-start" htmlFor="mobile">
                  Mobile
                </label>
                <input
                  className="input input-bordered input-primary w-full"
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  maxLength={11}
                  pattern="09[0-9]{9}"
                  ref={inputRef}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-start" htmlFor="name">
                  Name
                </label>
                <input
                  className="input input-bordered input-primary w-full"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-start" htmlFor="address">
                  Address
                </label>
                <input
                  className="input input-bordered input-primary w-full"
                  type="address"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn">
                Add
              </button>
            </div>
          </form>
        </Modal>

        <button
          onClick={() => setOpenDeleteModal(true)}
          className="text-red-500"
        >
          <FiTrash cursor="pointer" size={25} />
        </button>
        <Modal modal={openDeleteModal} setModal={setOpenDeleteModal}>
          <form onSubmit={handleDeleteContact}>
            <h3 className="font-bold text-lg">
              Are sure you want to delete this task.
            </h3>
            <div className="text-lg text-center">
              <div className="flex justify-end">
                <button type="submit" className="btn btn-error mx-5">
                  Yes
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </td>
    </tr>
  )
}

export default Contact
