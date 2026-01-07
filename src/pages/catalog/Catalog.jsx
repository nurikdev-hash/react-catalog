import React, { useEffect, useRef, useState } from 'react'
import { filterProducts, getCategories, getProducts } from '../../redux/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';

function Catalog() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.product.categories);
  const {total,limit,skip} = useSelector((state) => state.product);
  const [page,setPage] = useState(0);
  const [order,setOrder] = useState("asc");
  const [sort,setSort] = useState("title");
  const selectRef = useRef(null);
  const filterSelect = useRef(null);

  useEffect(() => {
    if(filterSelect.current.value == "all"){
      dispatch(getProducts({page,sort,order}));
    }else{
      dispatch(filterProducts({category: filterSelect.current.value,page,sort,order}));
    }
  }, [page,order]);

  const sortProducts = ()=>{
    switch(selectRef.current.value){
      case "title-asc": setOrder("asc"); setSort("title"); break;
      case "title-desc": setOrder("desc"); setSort("title"); break;
      case "price-asc": setOrder("asc"); setSort("price"); break;
      case "price-desc": setOrder("desc"); setSort("price"); break;
    }
  }

  useEffect(()=>{
    dispatch(getCategories());
  },[]);

  const handleFilter = ()=>{
    dispatch(filterProducts({category: filterSelect.current.value,page,sort,order}));
  }

  const handleAdd = (product)=>{
    dispatch(addToCart(product));
  }

  return (
    <div className='container py-5'>
      <div className='d-flex justify-content-between mb-4 pb-4 border-bottom'>
        <h2 className='mb-0'>Products</h2>
        <div className='d-flex'>
          <select ref={filterSelect} className='form-select me-3' onChange={()=>handleFilter()}>
            <option value="all">Categories</option>
            {categories ? categories.map((category)=>
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ) : ""}
          </select>
          <select ref={selectRef} className='form-select' onChange={(e)=>{sortProducts();}}>
            <option value="title-asc">Sort a-z</option>
            <option value="title-desc">Sort z-a</option>
            <option value="price-asc">Cheap</option>
            <option value="price-desc">Expensive</option>
          </select>
        </div>
      </div>
      <div className="row g-4">
        {
          products.length > 0 ? products.map(item => <div key={item.id} className="col-3">
            <div className="card">
              <div className=''>
                <img src={item.thumbnail} style={{ height: "200px", objectFit: "contain" }} className='card-img-top' alt="" />
              </div>
              <div className="card-body">
                <h5>{item.title}</h5>
                <p className='card-text' style={{ height: "55px", overflow: "hidden" }}>{item.description}</p>
                <h6 className='text-muted'>${item.price}</h6>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={()=>handleAdd(item)}
                >Add To Cart</button>
              </div>
            </div>
          </div>) : ""
        }
      </div>
      {
        total && total > 30 ?
          <nav className='mt-4'>
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button
                  type='button'
                  className='page-link'
                  disabled={page == 0}
                  onClick={()=>{
                    if(page == 0){
                      return;
                    }
                    setPage(page-1);
                  }}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {new Array(Math.ceil(total/limit)).fill("page").map((item,i) =>
                <li key={i} className="page-item">
                  <button type='button' onClick={()=>setPage(i)} className={`page-link ${skip/limit == i ? "active" : ""}`}>{i+1}</button>
                </li>
              )}
              <li className="page-item">
                <button
                  type='button'
                  className='page-link'
                  disabled={page == Math.ceil(total/limit) - 1}
                  onClick={()=>{
                    if(page == Math.ceil(total/limit) - 1){
                      return;
                    }
                    setPage(page+1);
                  }} 
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav> : ""
      }
    </div>
  )
}

export default Catalog