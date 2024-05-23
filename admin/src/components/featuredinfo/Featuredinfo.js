import React from 'react';
import "./featuredinfo.css"
import {ArrowDownward, ArrowUpward } from "@mui/icons-material";
// import { userRequest } from "../../requestMethod";
// 

const Featuredinfo = () => {
    // const [income, setIncome] = useState([]);
    // const [percentage, setPercentage] = useState(0);

    // useEffect(() => {
        // const getIncome = async () => {
            // try {
                // const res = await userRequest.get("orders/income");
                //   setIncome(res.data);
                // setPercentage((res.data[1].total*100 / res.data[0].total - 100))
            // } catch (error) {
                // console.log(error)
            // }
        // };

        // getIncome();
    // }, [])


  return (
    <div className='featured'>
        <div className="featuredItem">
            <span className="featuredTitle">Revenue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">₦400,000</span>
                <span className="featuredMoneyRate">
                    -11.4<ArrowDownward className='featuredIcon negative'/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Sales</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">₦240,000</span>
                <span className="featuredMoneyRate">
                    +1.2<ArrowUpward className='featuredIcon'/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Cost</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">₦180,000</span>
                <span className="featuredMoneyRate">
                    -1.4<ArrowDownward className='featuredIcon negative'/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
    </div>
  )
}

export default Featuredinfo;