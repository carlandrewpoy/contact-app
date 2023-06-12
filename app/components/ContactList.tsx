import { IContact } from '@/types/contact'
import Contact from './Contact'

interface ContactListProps {
  contacts: IContact[]
}

const ContactList: React.FC<ContactListProps> = ({ contacts  }) => {
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
            {contacts.map((contact: any) => <Contact key={contact.id} contact={contact} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
  return context
}

export default ContactList