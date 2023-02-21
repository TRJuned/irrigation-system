import React from 'react'
import Avatar from '@mui/material/Avatar';
import "./CSS/header.css"

const Header = () => {
  return (
    <>
    <header>
      <nav><h1>Irrigation System</h1>
        <div className='avtar'>
            <Avatar style={{background:"blue"}}>H</Avatar>
        </div>
      </nav>
    </header>
    </>
  )
}

export default Header
