import React from 'react'
import Input from '../../utilits/input/Input'

const Settings = () => {
    return (
        <div className='settings'>
            <div className='title'>Settings</div>
            <div className='language'>
                <div className='title'>
                    Select interface language
                </div>
                <Input/>
            </div>
        </div>
    )
}

export default Settings
