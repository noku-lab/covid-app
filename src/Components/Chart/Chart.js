import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../Api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'


const Chart = ({ data:{ confirmed, recovered, deaths }, country})=> {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() =>{
    const fetchApi = async() =>{
        setDailyData(await fetchDailyData());
    }

    fetchApi();
    }, []);

    const lineChart = (
       dailyData.length  ?
       ( <Line 
        data = {{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: false
            },{
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill: false
            }]
        }}
        />): null
    )

 
    const barChart = (
        confirmed ?
        (<Bar
         data = {{
            labels: ['Infected', 'Recovered', 'Deaths'],
             datasets:[{
                 label: 'People',
                 backgroundColor: ['rgba(0, 0, 200, 0.7)','rgb(0, 100, 0)','rgba(255, 0, 0, 1)'],
                 data: [confirmed.value, recovered.value, deaths.value]
             }]
         }}
         options = {{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}`}

         }}
        />): null
    )
    return (
        <div className = {styles.container}>
            {country? barChart: lineChart}
        </div>
    )
}

export default Chart