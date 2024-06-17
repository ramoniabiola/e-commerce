import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import "./piechart.css"


const data = [
    { id: 0, value: 10, label: 'Men', color: 'pink' },
    { id: 1, value: 15, label: 'Women', color: 'red' },
    { id: 2, value: 20, label: 'Unisex', color: 'skyblue' },
];   


const Piechart = () => {
    
  return (
    <div className='pieChart'> 
        <h3 className="pieChartTitle">Product Overview</h3>
        <PieChart
            series={[
                {
                    data,
                    cx: 168,
                    cy: 98,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
            ]}
            height={220}
        />
    </div>
  );
}

export default Piechart;