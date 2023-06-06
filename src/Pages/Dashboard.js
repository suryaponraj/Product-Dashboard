import React, { use, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { GoogleLogout } from "react-google-login";
import { GoogleLoginBtn, Logout } from "./Icons";
import FilterTableComponent from "./FilterTableComponent";
import {
  Total_Revenue,
  Total_Transactions,
  Total_Likes,
  Total_Users,
  Transactions,
  Schedules,
  Users,
  Settings,
  Dash,
  Notifications,
  Profile,
  search,
  Search,
  Rarrow,
  Darrow,
  Green,
  Yellow,
  Red,
} from "./Icons";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function Dashboard(props) {
 
  const [pieData, setData] = useState([]);
  const [lineData1, setlineData1] = useState([]);
  const [lineData2, setlineData2] = useState([]);
  const [lineData3, setlineData3] = useState([]);
  const [lineData4, setlineData4] = useState([]);
  const LineDatas = [];
  const LineDataLabels = [
    "Week1",
    "Week2",
    "Week3",
    "Week4",
    "Week5",
    "Week6",
    "Week7",
    "Week8",
  ];
  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        console.log(response.data);
        const filteredData = response.data
          .filter((country) =>
            ["Asia", "Europe", "Africa"].includes(country.region)
          )
          .map((country) => ({
            name: country.name,
            population: country.population,
          }))
          .sort((a, b) => b.population - a.population)
          .slice(0, 4);
        setData(filteredData);
        const filteredData1 = response.data
          .filter((country) =>
            ["Asia", "Europe", "Africa"].includes(country.region)
          )
          .map((country) => ({
            name: country.name,
            population: country.population,
            area: country.area,
          }))
          .sort((a, b) => 10000 - a.population)
          .slice(1, 7);
        setlineData1(filteredData1);
        const filteredData2 = response.data
          .filter((country) =>
            ["Asia", "Europe", "Africa"].includes(country.region)
          )
          .map((country) => ({
            name: country.name,
            population: country.population,
            area: country.area,
          }))
          .sort((a, b) => 10000 - a.population)
          .slice(3, 9);
        console.log(filteredData2);
        setlineData2(filteredData2);
        const filteredData3 = response.data
          .filter((country) =>
            ["European Union", "Armenia", "Austria"].includes(country.region)
          )
          .map((country) => ({
            name: country.name,
            population: country.population,
            area: country.area,
          }))
          .sort((a, b) => 10000 - a.population)
          .slice(1, 7);
        setlineData3(filteredData3);
        const filteredData4 = response.data
          .filter((country) =>
            ["European Union", "Armenia", "Austria"].includes(country.region)
          )
          .map((country) => ({
            name: country.name,
            population: country.population,
            area: country.area,
          }))
          .sort((a, b) => 10000 - a.population)
          .slice(1, 7);
        setlineData4(filteredData4);
        LineDatas.push(filteredData1);
        LineDatas.push(filteredData2);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const Pieoptions = {
    chart: {
      type: "pie",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          return '';
        }
      }},
    
    legend: {
      show: false,
      fontSize: "14px",
      fontFamily: "Montserrat",
      fontWeight: 700,
      itemMargin: {
        horizontal: 10,
        vertical: 6,
      },
      // offsetY: 100,
      offsetX: -50, // adjust this value to change the distance between the chart and the legend
      labels: {
        colors: ["#333"],
        useSeriesColors: false,
      },
    },
    

    colors: ["#98D89E", "#EE8484", "#F6DC7D", "#EF9484"],
    series: pieData.map((country) => country.population),
    labels: ["Himalayas", "Mama Earth ", "Dove" ,"Attitude"],
    //pieData.map(country => country.name)
  };

  const data = {
    series: [
      {
        name: "Himalayas",
        data: lineData1.map((country) => country.area),
      },
      {
        name: "Mama Earth",
        data: lineData2.map((country) => country.area),
      },
      {
        name: "Attitude",
        data: lineData3.map((country) => country.area),
      },
      {
        name: "Dove",
        data: lineData4.map((country) => country.area),
      }
    ],

    //  [
    //   {
    //     name: 'Guest',
    //     data: [30, 40, 35, 50],
    //   },
    //   {
    //     name: 'User',
    //     data: [23, 12, 54, 61],
    //   },
    // ],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "14px",
        fontFamily: "Lato",
        fontWeight: 400,
        markers: {
          width: 12,
          height: 12,
          radius: 18,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 5,
        },
        style: {
          fontSize: "14px",
          fontFamily: "sans-serif",
          fontWeight: 600,
          colors: ["#333"],
        },
      },
      xaxis: {
        categories: LineDataLabels,
        //lineData2.map(country => country.name),
        labels: {
          offsetX: 20,
          style: {
            fontSize: "14px",
            colors: "#858585",
            fontWeight: "400",
            fontFamily: "Open-Sans,sans-serif",
          },
        },
      },

      yaxis: {
        labels: {
          offsetX: -10, // Set offsetX to move y-axis labels to the left
          style: {
            fontSize: "14px",
            colors: "#858585",
            fontWeight: "400",
            fontFamily: "Open-Sans,sans-serif",
          },
        },
      },
      stroke: {
        width: 3,
        curve: "smooth",
      },
      colors: ["#E9A0A0", "#9BDD7C"],
    },
  };
  const navigate=useNavigate();
  
  // chart.updateOptions({
  //   colors: ['red', 'blue', 'green']
  // });

  return (
    <div className="dashboard-page">
      <div className="left-bar">
        <div className="left-top-content">
          <div className="heading1">Board.</div>
          <div className="dashboard-LB">
            <div className="icon">
            <Dash />
            </div>
            <div className="details">Dashboard</div>
          </div>
          <div className="contents">
          <div className="icon">   <Transactions /></div>
            <div className="details"> Transactions</div>
          </div>
          <div className="contents">
          <div className="icon">  <Schedules /></div>
          <div className="details">   Schedules</div>
          </div>
          <div className="contents">
          <div className="icon"><Users /></div>
            <div className="details">  Users</div>
          </div>
          <div className="contents">
          <div className="icon">  <Settings /></div>
            <div className="details"> Settings</div>
          </div>
          <div className="parent-class">
          <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={(response) => {navigate(-1) }}
          render={renderProps => (
            <button className="custom-google-login1" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <Logout className="custom-google-icon" />
             <div className="logout"> Logout</div>
            </button>
          )}
        ></GoogleLogout></div>
        </div>
        <div className="left-bottom-content">
          
          <div className="contents1">Help</div>
          <div className="contents1">Contact Us</div>
        </div>
      </div>
      <div className="right-bar">
        <div className="top-bar-box">
          <p className="dash-RB">Dashboard</p>
          <div className="see-all1">
            <div className="notification">
              <Notifications />
            </div>
            <div className="profile" >  
              <Profile />
            </div>
          </div>
        </div>
        <div className="cards-container">
          <div className="card1">
            <div className="card1-content">
              <div className="cards-heading">Total Revenues</div>
              <div className="card1-values">$2,129,430</div>
            </div>
            <div className="icon-card">
              <Total_Revenue />
            </div>
          </div>
          <div className="card2">
            <div className="card2-content">
              <div className="cards-heading">Total Transactions</div>
              <div className="card2-values">1,520</div>
            </div>
            <div className="icon-card">
              <Total_Transactions />
            </div>
          </div>
          <div className="card3">
            <div className="card3-content">
              <div className="cards-heading">Total Likes</div>
              <div className="card3-values">9,721</div>
            </div>
            <div className="icon-card">
              <Total_Likes />
            </div>
          </div>
          <div className="card4">
            <div className="card3-content">
              <div className="cards-heading">Total Users</div>
              <div className="card3-values">892</div>
            </div>
            <div className="icon-card">
              <Total_Users />
            </div>
          </div>
        </div>
        <div>
          <FilterTableComponent/>
        </div>
        <div className="line-chart-container">
          <div className="activities">Activities</div>
          <div className="calender">
            May - June 2021{" "}
            <div className="Darrow">
              <Darrow />
            </div>
          </div>
          <Chart
            options={data.options}
            series={data.series}
            type="line"
            height={350}
          />
        </div>
        <div className="chart-containers">
          <div className="pie-chart-container1">
            <div className="top-bar-box">
              <h2 className="today-heading">Top Products</h2>
              <div className="see-all">
                May - June 2021{" "}
                <div className="Darrow">
                  <Darrow />
                </div>
              </div>
            </div>
            <div className='pie'>
            <div className='pie-chart'>
            <Chart
              options={Pieoptions}
              series={Pieoptions.series}
              type="pie"
              height="200"
              width="230"
            />
            </div>
            <div className='pie-legends'>
              <div className='legend-space'>
              <div className='legend-1'>
                <div><Green/></div>
                <div className='legend-name'>Basic Tees </div></div>
                <div className='percentage'>45.9%</div>
                </div>
                <div className='legend-space'>
              <div className='legend-2'>
                <div><Yellow/></div>
                <div className='legend-name'>Custom Short Pants</div></div>
                <div className='percentage'>9.0%</div>
                </div>
                <div className='legend-space'>
              <div className='legend-3'>
                <div><Red/></div>
                <div className='legend-name'>Super Hoodies</div></div>
                <div className='percentage'>45.2%</div>
                </div>
            </div>
            </div>
           
          </div>
          <div className="schedule-container">
            <div className="top-bar-box">
              <h2 className="today-heading">Today's schedule</h2>
              <div className="see-all">
                See All{" "}
                <div className="Rarrow">
                  <Rarrow />
                </div>
              </div>
            </div>
            <div className="schedules">
            <Chart
              options={Pieoptions}
              series={Pieoptions.series}
              type="bar"
              height="200"
              width="230"
            />
              {/* <div className="address1">
                <div className="rectangle1"></div>
                <div className="schedule-content">

                  <div className="font">
                    Meeting with suppliers from Kutta Bali
                  </div>
                  <div className="timings">14.00-15.00</div>
                  <div className="location">At Sunset Road ,Kutta ,Bali</div>
                </div>
              </div>
              <div className="address1">
                <div className="rectangle2"></div>
                <div className="schedule-content">
                  <div className="font">Check operation at Giga Factory 1</div>
                  <div className="timings">16.00-18.00</div>
                  <div className="location">at Central Jakarta</div>
                </div>
              </div> */}
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default Dashboard;