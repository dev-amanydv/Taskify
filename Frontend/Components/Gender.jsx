import React from 'react'

const Gender = ({selectedGender, onCheckboxChange}) => {
  
  return (
    <div className='flex justify-around mt-2 '>
        <div className={`flex gap-5 `} >
            <h2>Male</h2>
            <input type="checkbox" checked={selectedGender == "male"} onChange={() => {
              onCheckboxChange("male")
            }} className="checkbox" />
        </div>
        <div className={`flex gap-5`}>
            <h2>Female</h2>
            <input type="checkbox" checked={selectedGender == "female"} onChange={()=> {
              onCheckboxChange("female")
            }} className="checkbox" />
        </div>
      
    </div>
  )
}

export default Gender
