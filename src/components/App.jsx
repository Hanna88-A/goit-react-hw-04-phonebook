import { useState,useEffect } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import { nanoid } from 'nanoid';



export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem("contacts")));
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandle = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return
    }
    const newContact = {
      id: nanoid(),
      name,
      number
    };
    setContacts([newContact, ...contacts])
  };

  const deleteContact = (idContact) => {
    setContacts(contacts.filter(contact => contact.id !== idContact))
  };

  const changeFilter = (evt) => {
    setFilter(evt.currentTarget.value);
  };
  
  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(({name}) =>
    name.toLowerCase().includes(normalizedFilter)
  );
  
  return (
    <div>
    <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandle}/>

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}/>
      <ContactList
        dataContacts={visibleContacts}
        onDeleteContact={deleteContact}
        onSubmit={formSubmitHandle}
      />
    </div>
  )
  
}

