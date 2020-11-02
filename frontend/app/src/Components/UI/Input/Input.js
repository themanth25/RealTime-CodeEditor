import React from 'react';

const inputForm = (props) => {
    return (
        <div>
            <input {...props.elementConfig} required name={props.name} onChange={props.changed} minLength={props.minLength} />
        </div>
    );
}

export default inputForm;