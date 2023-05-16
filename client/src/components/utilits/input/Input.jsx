import React from 'react'
import './Input.scss'

const Input = props => {

    return (
        <input
            className={props.className}
            type={props.type}
            value={props.value}
            checked={props.checked}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
        />
    )
}

export default Input
