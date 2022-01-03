import React from 'react'
import './EnvironmentAdmin.scss'
import { NavLink } from 'react-router-dom'

const EnvironmentAdmin = () => {
    return (
        <div className='env-admin'>
            <div className='container'>
                <div className='navigation'>
                    Administrator functions:
                    <div className='buttons'>
                        <button><NavLink to='/create'>Create Family</NavLink></button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EnvironmentAdmin
