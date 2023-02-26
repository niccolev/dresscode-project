import React from 'react'

function FilterProduct() {
    const categoryChangeHandler = (e) => {
        console.log(e.target.value)
    }

    const categorySelectedHandler = (categorySelected) => {

    }


  return (
    <div>
        <select name='Category' onChange={categoryChangeHandler}>
            <option value="all">All</option>
            <option value="dresses">Dresses</option>
            <option value="casual">Casual</option>
        </select>
        
    </div>
  )
}

export default FilterProduct