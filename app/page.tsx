import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { getContacts } from "@/public/api";

export default async function Home() {
  const contacts = await getContacts()
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4 ">
        <h1 className="text-2xl">Contact List App</h1> 
        <AddContact />
      </div>
    <ContactList contacts={contacts} />
    </main>
  )
}
