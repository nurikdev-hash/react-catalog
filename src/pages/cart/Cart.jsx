import React from 'react'
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart } from '../../redux/cartReducer';

function Cart() {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  // const [total]
  console.log(cart);

  const handeDelete = (obj)=>{
    dispatch(deleteFromCart(obj));
  }

  return (
    <div className='container py-5'>
      <div className='mb-4 pb-4 border-bottom'>
        <h2>Selected Products</h2>
      </div>
      <table className='table align-middle'>
        <thead>
          <tr className='table-light'>
            <th></th>
            <th>Image</th>
            <th>Info</th>
            <th>Price</th>
            <th>Count</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((item) =>
            <tr key={item.id}>
              <td>
                <button onClick={()=>handeDelete(item)} type='button' className='btn btn-danger p-0' style={{width: "30px",height: "30px",borderRadius: "50%",lineHeight: "14px",fontSize: "22px"}}>
                  <BsX />
                </button>
              </td>
              <td>
                <img src={item.thumbnail} alt="" style={{ width: "150px" }} />
              </td>
              <td>
                <h5>{item.title}</h5>
                <p className='mb-0' style={{maxWidth: "300px"}}>{item.description}</p>
              </td>
              <td>
                <div className='fs-5'>${item.price}</div>
              </td>
              <td>
                <div className='input-group'>
                  <button type='button' className='btn btn-danger'>-</button>
                  <input type="text" className='form-control text-center' readOnly value={item.quantity} style={{ width: "65px", flexGrow: "0" }} />
                  <button type='button' className='btn btn-success'>+</button>
                </div>
              </td>
              <td>
                <div className='fs-5'>${item.price*item.quantity}</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='py-3 fixed-bottom bg-dark border-top'>
          <div className="container d-flex justify-content-between">
            <h3>Total: ${cart.total}</h3>
            <button type='button' className='btn btn-success'>Confirm</button>
          </div>
      </div>
    </div>
  )
}

export default Cart