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
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)


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
      setIsLoading(true);
      setError(null)


      try {
        const response = await userRequest.get("users/stats");
        if(response.status >= 200 && response.status < 300){
          setUserStats((prev) => {
            return response.data.map((item) => ({
              name: MONTHS[item._id - 1],
              "Active User": item.total,
            }))
          });
          setError(null)
          setIsLoading(false)
        } else {
          // If the response status is not in the success range, handle the error
          throw new Error(response.data.error);
        }
      }catch(error) {
        setIsLoading(false)    
        setError("No Data...") 
      }
    };
    
    getStats();
  }, [MONTHS, setUserStats]);


  return (
    <div className='home'>
      <Featuredinfo />
      <div className="charts">
        <Chart data={userStats} title="User Analytics" grid dataKey="Active User"  isLoading={isLoading} error={error} />
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