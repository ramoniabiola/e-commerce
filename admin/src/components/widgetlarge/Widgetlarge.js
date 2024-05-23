import React, { useEffect, useState } from 'react';
import "./widgetlarge.css";
import { userRequest } from '../../requestMethod';
import formatDistanceToNow from "date-fns/formatDistanceToNow";


const Widgetlarge = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders")
        setOrders(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    getOrders();
  }, [])


  const Button = ({ type }) => {
    return <button className={"widgetLargeButton " + type}>{type}</button>
  }

  
  return (
    <div className='widgetLarge'> 
      <h3 className="widgetLargeTitle">Latest Transactions</h3>
      <table className="widgetlargeTable">
        <thead>
          <tr className="widgetLargeTr">
            <th className="widgetLargeTh">Customer</th>
            <th className="widgetLargeTh">Date</th>
            <th className="widgetLargeTh">Amount</th>
            <th className="widgetLargeTh">Status</th>
          </tr>
        </thead>
        <tbody>
        {orders.map((order)=> (
          <tr className="widgetLargeTr" key={order._id}>
            <td className="widgetLargeUser">
              <span className="widgetLargeName">{order.userId}</span> 
            </td>
            <td className="widgetLargeDate">{formatDistanceToNow(new Date (order.createdAt), {addSuffix: true})}</td>
            <td className="widgetLargeAmount">N{order.amount}</td>
            <td className="widgetLargeStatus">
              <Button type={order.status}/>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Widgetlarge;