import React, { useEffect, useState }  from 'react';
import Swal from 'sweetalert2'
// import React, { useState }  from 'react';
import './App.css';
import Header from '../Header';
//import Button from '../../shared/Button';
import Container from '../../shared/Container';
import Table, {TableHeader} from '../../shared/Table';
import { Product } from '../../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from '../Products/ProductForm';
import { createSingleProduct, deleteSingleProduct, getAllProducts, updateSingleProduct } from '../../services/Products.service';

// function TestComponent () {
//   return <img width="16" src="https://img.icons8.com/pastel-glyph/2x/search--v2.png" alt="search icon" />
// }

const headers: TableHeader[] = [
  {key: 'id', value: '#'},
  {key: 'name', value: 'Product'},
  {key: 'price', value: 'Price', right: true},
  {key: 'stock', value: 'Available Stock', right: true}
]

function App() {

  const [products, setProducts] = useState<Product[]>([])
  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(undefined)

  async function fetchData() {
    const _products = await getAllProducts()
    setProducts(_products)
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      await createSingleProduct(product)
      fetchData()
    } catch (err) {
      Swal.fire('Oops!', err.message, 'error')
    }
  }

  const handleProductUpdate = async (newProduct: Product) => {
    try{
      await updateSingleProduct(newProduct)
      setUpdatingProduct(undefined)
      fetchData()
    }catch(err){
      Swal.fire('Oops!', err.message, 'error')
    }
  }

  const deleteProduct = async (id: string) => {
    try{
      await deleteSingleProduct(id)
      Swal.fire('Uhul', 'Product successfully deleted', 'success')
      fetchData()
    }catch(err){
      Swal.fire('Oops!', err.message, 'error')
    }    
  }

  const handleProductDelete  = (product: Product) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09f',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete ${product.name}!`
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product._id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const handleProductDetail = (product:Product) => {
    Swal.fire(
      'Product details',
      `${product.name} costs $${product.price} and we have ${product.stock} available in stock.`,
      'info'
    )
  }

  const handleProductEdit = (product: Product) => {
    setUpdatingProduct(product)
  }
   
  return (
    <div className="App">
      <Header title="TriSoft Stock"/>
      
      <Container>   
            <Table
              headers={headers}
              data={products}
              enableActions
              onEdit={handleProductEdit}
              onDetail={handleProductDetail}
              onDelete={handleProductDelete}
            />

            <ProductForm 
              form={updatingProduct}
              onSubmit={handleProductSubmit}
              onUpdate={handleProductUpdate}  
            />
      </Container>
    </div>
  );
}

export default App;
