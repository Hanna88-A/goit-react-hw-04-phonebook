import React, { Component } from "react";
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    };


    onHandleChange = evt => {
        const { name, value } = evt.currentTarget;
        this.setState({ [name]: value });
       
        
    };

    onHandleSubmit = evt => {
        const {name, number} = this.state
        evt.preventDefault();
        this.props.onSubmit(name, number);
        this.reset();
    };
    reset = () => {
        this.setState({ name: '', number: '' });
    };

    render() {
        return (
            <form className={s.form} onSubmit={this.onHandleSubmit}>
                <label className={s.name}> 
                    Name
                    <input
                        className={s.nameContact}
                        onChange={this.onHandleChange}
                        type="text"
                        name="name"
                        value={this.state.name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </label>
                <label className={s.name}>
                    Number
                    <input
                        className={s.nameContact}
                        onChange={this.onHandleChange}
                        type="tel"
                        name="number"
                        value={this.state.number}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
        
                <button className={s.button} type="submit">Add contact</button>
            </form>
        )

    };
};

ContactForm.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number
};

export default ContactForm;
