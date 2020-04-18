import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import { fetchCountries } from '../../Api'

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange })=> {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(()=>{
        const fetchedCountryAPI = async ()=>{
            setFetchedCountries(await fetchCountries());
        }

        fetchedCountryAPI();
    },[setFetchedCountries]) // useEffect will only change when setFetchedCountries change

  
    return (
        <FormControl className = {styles.formControl}> 
        <h3 className = {styles.heading}> Select a country</h3>
            <NativeSelect  className = {styles.name} defaultValue = "" onChange = {(e) => handleCountryChange(e.target.value)}>
                <option value = "">Global</option>
                {fetchedCountries.map((country,i) => <option key ={i} value ={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
