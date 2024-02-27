import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/Search.module.css';
import { useSelector } from 'react-redux';

function Search() {
    const [searchInput, setSearchInput] = useState('')
    const [results, setResults] = useState('')

    useEffect(() => {
       if (searchInput) {
        fetch(`https://hackatweet-backend-puce.vercel.app/search/${searchInput}`)
        .then(response => response.json())
           .then(data => {
               if (data) {
                    const loadingResults = data.searchResults.map(tweet => <div>{tweet.firstname} @{tweet.username} posted {tweet.content} {tweet.elapsedTime}</div>)
                   setResults(loadingResults)
               } else {
                   setResults(<div>No results</div>)
               } }) 
       } else {
        setResults('')
       }
      }, [searchInput]);
    
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <img className={styles.searchIcon} src='http://localhost:3001/icons/magnifying_glass.png' alt='search icon' />
                <input className={styles.searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Search for anything' value={searchInput}></input>
            </div>
            <div>{results}</div>
        </div>
    )
}

export default Search