import React from "react";
import PropTypes from 'prop-types';
import s from './Filter.module.css'


const Filter = ({ value, onChange}) => {
    return (
        <div className={s.box}>
            <label className={s.name}>
                Find contacts by name
                <input
                    className={s.nameContact}
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>

    )
}

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default Filter