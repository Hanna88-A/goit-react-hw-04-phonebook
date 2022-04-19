import React, { Component } from "react";
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

class ContactList extends Component {
    
    render() {
        return (
            <ul className={s.list}>
                {this.props.dataContacts.map(({ id, name, number }) => (

                    <li className={s.item} key={id}>
                        {name}:
                        <span className={s.number}>{number}</span>
                        <button className={s.button} onClick={()=>this.props.onDeleteContact(id)}>Delete</button>
                    </li>))}
            </ul>

        );
    };
};
ContactList.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.number
};

export default ContactList;