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
    "1000",
    "2000",
    "3000",
    "4000",
    "5000",
    "6000",
    "7000",
    "8000",
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
            ["Asia", "Europe", "Africa"].includes(country.region)
          )
          .map((country) => ({
            name: country.name,
            population: country.population,
            area: country.area,
          }))
          .sort((a, b) => 10000 - a.population)
          .slice(10, 15);
        setlineData3(filteredData3);
        const filteredData4 = response.data
          .filter((country) =>
            ["Asia", "Europe", "Africa"].includes(country.region)
          )
          .map((country) => ({
            name: country.name,
            population: country.population,
            area: country.area,
          }))
          .sort((a, b) => 1000 - a.population)
          .slice(16, 25);
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
    

    colors: [ "#c966cc","#F6DC7D","#EE8484" , "#98D89E"],
    series: pieData.map((country) => country.population),
    labels: ["Himalayas", "Mama Earth ", "Dove" ,"Attitude"],
    //pieData.map(country => country.name)
  };
  const Baroptions={
    series: [{
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
      chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    
    dataLabels: {
      enabled: true
    },
    xaxis: {
      categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
        'United States', 'China', 'Germany'
      ],
    }
  }

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
      colors: ["#c966cc","#F6DC7D","#EE8484" , "#98D89E"],
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
          <div className="heading1">Dashboard</div>
          <div className="dashboard-LB">
            <div className="icon">
            <Dash />
            </div>
            <div className="details">Product Overview</div>
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
      </div>
      <div className="right-bar">
        <div className="top-bar-box">
          <p className="dash-RB">Product Overview</p>
        </div>
        <div className="cards-container">
          <div className="card1">
            <div className="card1-content">
              <div className="cards-heading">Total Purchases</div>
              <div className="card1-values">$2,129,430</div>
            </div>
            <div className="icon-card">
              <Total_Revenue />
            </div>
          </div>
          <div className="card2">
            <div className="card2-content">
              <div className="cards-heading">Average Buys</div>
              <div className="card2-values">9,345</div>
            </div>
            <div className="icon-card">
              <Total_Transactions />
            </div>
          </div>
          <div className="card3">
            <div className="card3-content">
              <div className="cards-heading">Total Likes</div>
              <div className="card3-values">98.9%</div>
            </div>
            <div className="icon-card">
              <Total_Likes />
            </div>
          </div>
          <div className="card4">
            <div className="card3-content">
              <div className="cards-heading">Total Users</div>
              <div className="card3-values">80,92,000</div>
            </div>
            <div className="icon-card">
              <Total_Users />
            </div>
          </div>
        </div>
        <div>
          <FilterTableComponent/>
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
              height="280"
              width="260"
            />
            </div>
            <div className='pie-legends'>
              <div className='legend-space'>
              <div className='legend-1'>
                <div><Green/></div>
                <div className='legend-name'>Himalayas </div></div>
                <div className='percentage'>45.9%</div>
                </div>
                <div className='legend-space'>
              <div className='legend-2'>
                <div><Yellow/></div>
                <div className='legend-name'>Mama Earth</div></div>
                <div className='percentage'>90%</div>
                </div>
                <div className='legend-space'>
              <div className='legend-3'>
                <div><Red color='#c966cc'/></div>
                <div className='legend-name'>Attitude</div></div>
                <div className='percentage'>85.2%</div>
                </div>
                <div className='legend-space'>
              <div className='legend-3'>
                <div><Red color='#cc6670'/></div>
                <div className='legend-name'>Dove</div></div>
                <div className='percentage'>32%</div>
                </div>
            </div>
            
            </div>
           
          </div>
          <div className="schedule-container">
            <div className="top-bar-box">
              <h2 className="today-heading">Product Sales</h2>
              <div className="see-all">
                See All{" "}
                <div className="Rarrow">
                  <Rarrow />
                </div>
              </div>
            </div>
            <div className="schedules">
            <Chart
              options={Baroptions}
              series={Baroptions.series}
              type="bar"
              height="300"
              width="400"
            />
           
              
            </div>
          </div>
          
        </div>
        <div className="line-chart-container">
          <div className="activities">Product Usage</div>
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
      </div>
    </div>
  );
}
export default Dashboard;