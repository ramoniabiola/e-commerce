import React, { useMemo, useState, useEffect } from 'react';
import "./home.css";
import Featuredinfo from '../../components/featuredinfo/Featuredinfo';
import Widgetsmall from '../../components/widgetsmall/Widgetsmall';
import Widgetlarge from '../../components/widgetlarge/Widgetlarge';
import { userRequest } from '../../requestMethod';
import UserAnalytics from '../../components/user analytics/UserAnalytics';
import ProductOverview from '../../components/product overview/ProductOverview';

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const MONTHS = useMemo(() => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ], []
  );

  useEffect(() => {
    const getStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await userRequest.get("users/stats");
        if (response.status >= 200 && response.status < 300) {
          setUserStats(response.data.map((item) => ({
            name: MONTHS[item._id - 1],
            "Active User": item.total,
          })));
          setIsLoading(false);
        } else {
          throw new Error(response.data.error);
        }
      } catch (error) {
        setIsLoading(false);
        setError("No Data...");
      }
    };

    getStats();
  }, [MONTHS]);

  return (
    <div className='home'>
      <Featuredinfo />
      <div className="charts">
        <UserAnalytics data={userStats} title="User Analytics" isLoading={isLoading}  error={error} />
        <ProductOverview />
      </div>
      <div className="homeWidgets">
        <Widgetsmall />
        <Widgetlarge />
      </div>
    </div>
  );
}

export default Home;
