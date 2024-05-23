 import React, { useMemo, useState, useEffect } from 'react';
import "./home.css";
import Featuredinfo from '../../components/featuredinfo/Featuredinfo';
import Chart from "../../components/chart/Chart";
import Widgetsmall from '../../components/widgetsmall/Widgetsmall';
import Widgetlarge from '../../components/widgetlarge/Widgetlarge';
import Piechart from '../../components/piechart/Piechart';
import { userRequest } from '../../requestMethod';


const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(() => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("users/stats");
        setUserStats((prev) => {
          return res.data.map((item) => ({
            name: MONTHS[item._id - 1],
            "Active User": item.total,
          }))
        });
      } catch(error) {
        console.log(error);
      }
    };
    
    getStats();
  }, [MONTHS, setUserStats]);

  return (
    <div className='home'>
      <Featuredinfo />
      <div className="charts">
        <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
        <Piechart />
      </div>
      <div className="homeWidgets">
        <Widgetsmall />
        <Widgetlarge />
      </div>
    </div>
  )
}

export default Home;