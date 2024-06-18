import React from 'react';
import "./chart.css";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgress, Typography } from '@mui/material';
import { PostAdd } from '@mui/icons-material';


const Chart = ({ title, data, dataKey, grid, isLoading, error }) => {

  return (
    <div className='chart'>
      <h3 className="chartTitle">{title}</h3>
      {isLoading ? (
        <div className='LoadingContainer'>
          <CircularProgress  style={{ color: "#38bdf8", marginBottom: "12px" }} size={30}  />
          <Typography variant="h6" color="#9ca3af">Loading...</Typography>
        </div>
      ) : error ? (
        <div className='NoDataContainer'>
          <PostAdd style={{ fontSize: 70, marginBottom: "10px", color: "#9ca3af" }} />
          <Typography variant="h6" color="#9ca3af">{error}</Typography>
        </div>
      ) : (
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke='#b91c1c'/>
            <Line type="monotone" dataKey="Active User" stroke='#b91c1c'/>
            <Tooltip/>
            {grid && <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5"/>}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
