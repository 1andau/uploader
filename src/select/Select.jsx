import React from 'react'
import {MenuItem, Select} from '@material-ui/core';
import './select.scss'

export const Selecters = ({id, options, register, isRequired}) => {


  return (
  <>
 

<div className="selecterDiv" id={id} required={isRequired} {...register(id)}>
    <select className="SelectDiv">
    {
    options.map((obj, index) => (
        <option 
        value={obj.value}
        key={index}> 
        {obj.label}
      </option>

    ))
}  
    </select>
</div>
  
  </>
  )
}

