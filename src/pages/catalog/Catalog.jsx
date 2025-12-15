import React, { useEffect, useState } from 'react'
import { getProducts } from '../../redux/productReducer';
import { useDispatch, useSelector } from 'react-redux';

function Catalog() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const {total,limit,skip} = useSelector((state) => state.product);
  const [page,setPage] = useState(0);

  useEffect(() => {
    dispatch(getProducts(page));
  }, [page]);

  return (
    <div className='container py-5'>
      <h2 className='mb-4 pb-4 border-bottom'>Products</h2>
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
                <a href="#" className='btn btn-success'>Add To Cart</a>
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