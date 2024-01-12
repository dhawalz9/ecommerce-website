import React from 'react'

const CategoryForm = ({value,handleSubmit,setValue}) => {
    return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" value={value} onChange={(e)=>{setValue(e.target.value)}}/>
            </div>
            <br />
            <button type="submit" class="btn btn-primary">Submit</button>

        </form>

    </>
  )
}

export default CategoryForm
