import React, { useEffect, useState } from 'react';
import "./widgetlarge.css";
import { userRequest } from '../../requestMethod';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { PostAdd } from '@mui/icons-material';
import { CircularProgress, Typography } from '@mui/material';

const Widgetlarge = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await userRequest.get("orders");
        if (response.status >= 200 && response.status < 300) {
          setOrders(response.data);
          setError(null);
          setIsLoading(false);
        } else {
          // If the response status is not in the success range, handle the error
          throw new Error(response.data.error);
        }
      } catch (error) {
        setIsLoading(false);
        setError("No Data...");
      }
    };

    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLargeButton " + type}>{type}</button>;
  };

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
          {orders.map((order) => (
            <tr className="widgetLargeTr" key={order._id}>
              <td className="widgetLargeUser">
                <span className="widgetLargeName">{order.userId}</span>
              </td>
              <td className="widgetLargeDate">
                {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
              </td>
              <td className="widgetLargeAmount">₦{order.amount}</td>
              <td className="widgetLargeStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
          {isLoading && (
            <tr className="widgetLargeTr">
              <td colSpan="8">
                <div className='LoadingContainer'>
                  <CircularProgress style={{ color: "#7dd3fc", marginBottom: "12px" }} size={30} />
                  <Typography variant="h6" color="#9ca3af">Loading...</Typography>
                </div>
              </td>
            </tr>
          )}
          {error && (
            <tr className="widgetLargeTr">
              <td colSpan="8">
                <div className='NoDataContainer'>
                  <PostAdd style={{ fontSize: 70, marginBottom: "10px", color: "#9ca3af" }} />
                  <Typography variant="h6" color="#9ca3af">{error}</Typography>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Widgetlarge;
