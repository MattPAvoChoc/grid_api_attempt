import './App.css';
import React,{useEffect, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['mens clothing', 'jewelery', 'electronics', 'womens clothing'];

function App() {
  let mensClothingPrice = 0;
  let jeweleryPrice = 0;
  let electronicsPrice = 0;
  let womensClothing = 0;

  let [APIdata,setAPIData]=useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(
            data => setAPIData(data)
        );
  },[])

  console.log(APIdata)

  if(APIdata)
  {
    APIdata.map((d) => {
          if (d.category == "men's clothing"){
            mensClothingPrice = mensClothingPrice + d.price
          }
          else if (d.category == "jewelery"){
            jeweleryPrice = jeweleryPrice + d.price
          }
          else if (d.category == "electronics"){
            electronicsPrice = electronicsPrice + d.price
          }
          else if (d.category == "women's clothing"){
            womensClothing = womensClothing + d.price
          }
        }
    )
  }

  let arrayOfPrices = [mensClothingPrice,jeweleryPrice,electronicsPrice,womensClothing];
  console.log(arrayOfPrices);

  let data = {
    labels,
    datasets: [
      {
        label: 'Total price 1',
        data:arrayOfPrices.map((price)=>price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <div>
      <div>
        <h1>Chart thing of stuff</h1>
        <hr/>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default App;
