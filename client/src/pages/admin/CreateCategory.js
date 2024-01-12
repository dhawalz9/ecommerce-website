import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd'

const CreateCategory = () => {
  
  const [categories,setCategories] = useState([])
  const [name,setName] = useState('')
  const [selected,setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/v1/category/create-category',{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategories()
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in input form")
    }
  }

  const getAllCategories = async () => {
    try {
      const {data} = await axios.get('/api/v1/category/get-category')
      if(data?.success){
        setCategories(data?.categories)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in getting categories")
    }
  }

  useEffect(()=>{
    getAllCategories();
  },[])


  //Update Category
  const handleUpdate = async(e) =>{
    e.preventDefault()
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName('')
        handleCancel()
        getAllCategories()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in input form")
    }
  }
  
  
  //Delete Category
  const handleDelete = async(pId) =>{
    
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`)
      if(data.success){
        toast.success(`Category is deleted`)
        getAllCategories()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while deleting category")
    }
  }


  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <h1 className='text-center w-75'>Manage category</h1>
          <br />
          <div className="p-25 w-50">
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>

          <table className="table table-borderless table-hover w-75 text-center">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c)=>(
              <tr>
                  <td className='pt-3' key={c._id}>{c.name}</td>
                  <td>
                    <button className="btn btn-dark m-3" onClick={()=>{showModal();setUpdatedName(c.name);setSelected(c)}}>
                      Edit
                    </button>
                    <button className="btn btn-danger m-3" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                  </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
        </Modal>
      </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
