import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between items-center'>
        
        <h1>Logo</h1>
        <h1>Location</h1>
        <div>
          <button>Guest</button>
          <button>Login</button>
        </div>

    </div>
  )
}

export default Navbar
