import React, { Component } from 'react'
import Cards from './Components/Cards/Cards'
import CountryPicker from './Components/CountryPicker/CountryPicker'
import Chart from './Components/Chart/Chart'
import styles from './App.module.css'
import { fetchData } from './Api'



 class App extends Component {
        state ={
            data: {},
            country: ''
        }
   async componentDidMount(){
        const fetchedData = await fetchData();
        
        this.setState({ data: fetchedData })
    }

    handleCountryChange = async(country) => {
        const fetchedData = await fetchData(country);
        
        this.setState({ data: fetchedData, country: country })

    }
    render() {
        const { data, country } = this.state
        return (
            <div className={styles.container}>
                <img src="https://media.tghn.org/medialibrary/2020/04/covid19_logo.png" alt= "Covid-19" className= {styles.image}/> 
                <h3>We can only hope for a better future. Another day is given to us if we overcome today.</h3>
                <CountryPicker handleCountryChange = {this.handleCountryChange} />
                <Cards data = {data} />
                <Chart data = {data} country = {country} />
                
            </div>
        )
    }
}

export default App
