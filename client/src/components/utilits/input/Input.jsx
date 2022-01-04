import React from 'react'

const Input = props => {

    return (
        <input
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
