import { IContact } from "@/types/contact"

const baseUrl = 'https://laravel-contact-production.up.railway.app/api/contacts';

console.log({baseUrl})

export const getContacts = async () => {

  const res = await fetch(`${baseUrl}`, { 
    method: 'GET',
    cache: 'no-store'
   })
   const contacts = await res.json()
    return contacts 

}

export const addContact = async (contact: IContact): Promise<IContact> => {
  const res = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
  const newContact = await res.json()
  alert('Added successfully')
  return newContact
}

export const editContact = async (contact: IContact): Promise<IContact[]> => {
  const res = await fetch(`${baseUrl}/${contact.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
  const newContact = await res.json()
  alert('Edit successfully')
  return newContact
}

export const deleteContact = async (contact: IContact) => {
  await fetch(`${baseUrl}/${contact.id}`, {
    method: 'DELETE',headers: {
      'Content-Type': 'application/json'
    }
  })
  alert('Delete successfully')
}