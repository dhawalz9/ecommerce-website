import React, {useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate,useParams } from 'react-router-dom'
import { Select } from 'antd'
const {Option} = Select

const UpdateProduct = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [description,setDescription] = useState('')
  const [categories,setCategories] = useState([])
  const [category,setCategory] = useState('')
  const [quantity,setQuantity] = useState('')
  const [shipping,setShipping] = useState('')
  const [photo,setPhoto] = useState('')
  const [id,setId] = useState('')

  const getSingleProduct = async () => {
    try {
      const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      console.log(data)
        setName(data.product.name)
        setId(data.product._id)
        setPrice(data.product.price)
        setDescription(data.product.description)
        setCategory(data.product.category)
        setQuantity(data.product.quantity)
        setShipping(data.product.shipping)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getSingleProduct()
    //eslink-disable-next-line
  },[])
  const getAllCategories = async () => {
    try {
      const {data} = await axios.get('/api/v1/category/get-category')
      if(data?.success){
        setCategories(data.categories)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in getting categories")
    }
  }
  useEffect(()=>{
    getAllCategories();
  },[])

  // function to create product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      let categoryId = category;
    if (typeof category === 'object' && category !== null) {
      categoryId = category._id; // or some other property that holds the ObjectId
    }
    productData.append("category", categoryId);

      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
        let answer = window.prompt("Are You Sure want to delete this product ? ")
        if(!answer) return
      // const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`)
      toast.success("Product deleted successfully")
      navigate('/dashboard/admin/products')
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in deleting product")
    }
  }

  return (
    <Layout title={"Dashboard - Create Products"}>
      <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <h1>Update products</h1>
          <div className="m-1 w-75">
            <Select bordered={false} placeholder="Select a category" suffixIcon={null} showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}} value={category?.name}>
              {categories.map((c)=>(
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              

              <div className="mb-3">
                <input type="text" value={name} placeholder='write a name' className='form-control' onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" value={description} placeholder='write a description' className='form-control' onChange={(e)=>setDescription(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="number" value={price} placeholder='write a price' className='form-control' onChange={(e)=>setPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} placeholder='write a quantity' className='form-control' onChange={(e)=>setQuantity(e.target.value)} />
              </div>
              <div className="mb-3">
                <Select bordered={false} placeholder="Select Shiping" size='large' showSearch className='form-select mb-3' suffixIcon={null} onChange={(value)=>setShipping(value)} value={shipping?"Yes":"No"}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Select>
              </div>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12 mb-10">
                  {photo?photo.name:'Upload photo'}
                  <input type="file" name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive'/>
                  </div>
                ):(
                  <div className="text-center">
                    <img src={`/api/v1/product/product-photo/${id}`} alt="product_photo" height={'200px'} className='img img-responsive'/>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <button className='btn btn-primary btn-dark' onClick={handleUpdate}>Update Product</button>
              </div>
              <div className="mb-3">
                <button className='btn btn-primary btn-danger' onClick={handleDelete}>Delete Product</button>
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
