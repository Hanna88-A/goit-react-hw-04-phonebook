import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import { nanoid } from 'nanoid';



export class App extends Component {
  state = {
    contacts: [],
   filter: ''
  };

  formSubmitHandle = (name, number) => {
    const { contacts } = this.state;

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
       return
    }

    const newContact = {
      id: nanoid(),
      name,
      number
    };

    this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts ]
    }))
  };
  
  deleteContact = (idContact) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idContact)
    }))
  };

  changeFilter = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  };
  
  componentDidMount() {
    console.log("App component did mouse")

    const contacts = localStorage.getItem("contacts");
    const parsedContact = JSON.parse(contacts);

    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    };
  };
  componentDidUpdate(prevProps, prevState) {
    console.log("App component did update")
    
    if (this.state.contacts !== prevState.contact) {
      console.log("Поле обновилось")
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  };

  render() {
    console.log("App render")
    const { filter, contacts } = this.state
    
    const normalizedFilter = filter.toLowerCase();

    const visibleContacts = contacts.filter(({name}) =>
      name.toLowerCase().includes(normalizedFilter)
    );
    
    
    return (
      <div>
      <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandle}/>

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter}/>
        <ContactList
          dataContacts={visibleContacts}
          onDeleteContact={this.deleteContact}
          onSubmit={this.formSubmitHandle}
        />
      </div>
    )
  };
};
