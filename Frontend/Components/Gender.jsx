import React from 'react'

function Gender() {
  return (
    <div className='flex justify-around mt-2 '>
        <div className='flex gap-5'>
            <h2>Male</h2>
            <input type="checkbox" defaultChecked className="checkbox" />
        </div>
        <div className='flex gap-5'>
            <h2>Female</h2>
            <input type="checkbox" defaultChecked className="checkbox" />
        </div>
      
    </div>
  )
}

export default Gender
