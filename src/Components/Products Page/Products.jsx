import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faMagnifyingGlass, faXmark, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { ProductsData } from '../../Database/ProductsData';
import { useContext } from 'react';
import CartContext from '../../Store/cart-context';

export const Products = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [ searchParams, setSearchParams ] = useSearchParams();
  const cartContext = useContext(CartContext)
  const [ filteredProducts, setFilteredProducts ] = useState(ProductsData)
  const [ category, setCategory ] = useState('')
  const [ search, setSearch ] = useState('');
  
  useEffect(() => {
    const param = location.search.substring(1)
    setCategory(param)
    setFilteredProducts( 
      ProductsData.filter( (item) => (item.type.toLowerCase().includes(param)) )
    )
    if (searchParams.has(param)) {
      searchParams.delete(param);
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line
  }, [])
  
  const filterProducts = (e) => {
    setSearch(e.target.value)
    const prod = e.target.value.toLowerCase()
    if (category !== 'all') {
      setFilteredProducts( 
        ProductsData.filter( (item) => (
          item.title.toLowerCase().includes(prod) 
          && item.type.toLowerCase().includes(category) 
        )))
    }
    else {  
      setFilteredProducts(ProductsData.filter( item => item.title.toLowerCase().includes(prod)))
    }
  }

  const filterCategory = (e) => { 
    const cat = e.target.value
    setCategory(cat)
    setSearch('');
    if (cat !== 'all') {
      setFilteredProducts( 
        ProductsData.filter( (item) => (item.type.toLowerCase().includes(cat)) )
      )
    }
    else { setFilteredProducts(ProductsData) }
  }

  const clearSearch = () => {
    setSearch('')
    if (category !== 'all') {
      setFilteredProducts( 
        ProductsData.filter( (item) => (item.type.toLowerCase().includes(category)) )
      )
    }
    else { setFilteredProducts(ProductsData) }
  }

  const addToCart = (item) => {
    cartContext.addItem({
      id: item.id,
      title: item.title,
      type: item.type,
      price: item.price,
      image: item.img1,
      amount: 1
    })
  }

  return (
    <div className="container">
      <div className="search-container">
        <select 
          onChange={(event) => {filterCategory(event)}} value={category}
          name="category" id="search_concept"
        >
          <option value="all">All</option>
          <option value="gloss">Lip Gloss</option>
          <option value="balm">Lip Balm</option>
          <option value="oil">Lip Oil</option>
        </select>
        <input 
         type="text" placeholder="Search by name..." 
         value={search} onChange={(event) => {filterProducts(event)}}
        />
        { !search ? (
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-container-text-icon'/>
          </button>
          ) : (             
          <button onClick={() => {clearSearch()}}>
            <FontAwesomeIcon icon={faXmark} className='search-container-text-icon'/>
          </button>
        )}
      </div>
      <div className="products-container">
      { !ProductsData.length ? (
        <div>
          <h3 className="text-muted text-center">No Products "Empty"</h3>
        </div>
      ) : ( filteredProducts.map((item) => {
        return ( 
        <div className="product" key={item.id}>
          <div className="product-info">
            <div className='product-info-hover'>
              <img 
               className="product-info-img" src={item.img1} alt={item.title} 
               onClick={() => {navigate(`/products/${item.id}`)}}
              />
               { item.price !== 0 ?(
                <button onClick={() => {addToCart(item)}}>
                  <FontAwesomeIcon icon={faCartPlus} className='product-info-hover-icon'/>
                </button>
              ) :('')}
            </div>
            <Link to={`/products/${item.id}`} className="product-info-name">{item.title}</Link>
            <p className='product-info-type'>
              {item.type}
              <FontAwesomeIcon 
              icon={faCircle} 
              style={{color: `${item.color}`}}
              size="sm" 
              className="product-info-color" 
              />
            </p>
            { item.price !== 0 ? 
            (<p className="product-info-price">LE {item.price}</p>) : 
            (<p className="product-info-price">OUT OF STOCK</p>)
            }
          </div>
        </div>
       )
      }))}
      </div>
    </div>
  )
}