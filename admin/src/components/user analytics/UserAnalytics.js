import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { PostAdd } from '@mui/icons-material';
import { ResponsiveLine } from '@nivo/line';
import './useranalytics.css';

const UserAnalytics = ({ title, data, isLoading, error }) => {

    const formattedData = [
        {
          "id": 'Active Users',
          "color": "hsl(132, 70%, 50%)",
          "data": data.map(item => ({
            "x": item.name,
            "y": item['Active User']
          }))
        }
    ];

    console.log(formattedData)

    return (
        <div className='chart'>
            <h3 className="chartTitle">{title}</h3>
            {isLoading ? (
                <div className='LoadingContainer'>
                    <CircularProgress style={{ color: "#38bdf8", marginBottom: "12px" }} size={30} />
                    <Typography variant="h6" color="#9ca3af">Loading...</Typography>
                </div>
            ) : error ? (
                <div className='NoDataContainer'>
                    <PostAdd style={{ fontSize: 70, marginBottom: "10px", color: "#9ca3af" }} />
                    <Typography variant="h6" color="#9ca3af">{error}</Typography>
                </div>
            ) : (
                <ResponsiveLine
                    data={formattedData}
                    margin={{ top: 0, right: 30, bottom: 95, left: 65 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 0, max: 4 }}
                    stacked={true}
                    curve="monotoneX"   
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5, // increase tick size
                        tickPadding: 5, // increase tick padding
                        tickRotation: 0,
                        legend: 'Month',
                        legendOffset: 35,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 5, // increase tick size
                        tickPadding: 5, // increase tick padding
                        tickRotation: 0,
                        legend: 'Active Users',
                        legendOffset: -54,
                        legendPosition: 'middle',
                    }}
                    pointSize={20}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={5}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    defs={[{
                        id: 'gradientC',
                        type: 'linearGradient',
                        colors: [  
                            { offset: 0, color: '#f87171' }, // Solid color at the top
                            { offset: 75, color: '#fef2f2' }  // Faded color at the bottom    
                        ],
                    },]}
                    fill={[
                        { match: '*', id: 'gradientC' },
                    ]}
                    animate={true}
                    enableGridY={false}
                    colors={['#f87171']} // Line color
                    colorBy="id"
                    lineWidth={3}
                      pointSymbol={({ datum: { x, y, color } }) => (
                        <circle
                            cx={0}
                            cy={0}
                            r={4    }
                            fill={color}
                            stroke={color}
                            strokeWidth={2}
                        />
                    )}
                    enableDots={false}
                    enableDotLabel={true}
                    dotSize={14}    
                    dotColor="#f87171" // Point color
                    dotBorderWidth={2}
                    dotBorderColor="#991b1b"
                    dotLabel="y"
                    dotLabelYOffset={-12}
                    enableArea={true}
                    areaOpacity={0.4}
                    motionStiffness={90}
                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fontSize: 12,
                                    fontWeight: 600,
                                }
                            },
                            legend: {
                                text: {
                                    fontSize: 16,
                                    fontWeight: 700,
                                }
                            }
                        },
                        legends: {
                            text: {
                                fontSize: 16,
                                fontWeight: 700,
                            }
                        }
                    }}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            )}
        </div>
    );
};

export default UserAnalytics;
