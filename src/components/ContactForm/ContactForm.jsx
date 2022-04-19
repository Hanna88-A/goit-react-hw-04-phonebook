import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state]);
  return [state, setState];
};

export default function ContactForm({onSubmit}) {
    const [name, setName] = useLocalStorage('name','');
    const [number, setNumber] = useLocalStorage('number','');
    
    const onHandleChange = (event) => {
        // setName(event.target.value);
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    };

    const onHandleSubmit = event => {
        event.preventDefault();
        onSubmit(name, number);
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form className={s.form} onSubmit={onHandleSubmit}>
            <label className={s.name}> 
                Name
                <input
                    className={s.nameContact}
                    onChange={onHandleChange}
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label className={s.name}>
                Number
                <input
                    className={s.nameContact}
                    onChange={onHandleChange}
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={s.button} type="submit">Add contact</button>
        </form>
    )
};

ContactForm.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number
};


