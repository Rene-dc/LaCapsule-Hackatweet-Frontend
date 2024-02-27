import React, { useEffect, useState } from 'react';
import styles from '../styles/Trends.module.css';
import Link from 'next/link';

function Trends({posted}) {

  const [trends, setTrends] = useState([])
  
  useEffect(() => {
        fetch('https://hackatweet-backend-puce.vercel.app/tweets/trends')
        .then(response => response.json())
    .then(data => {
        const loadingTrends = data.trends.map(trend => {
            return  <Link href={`/hashtag/${trend._id}`}>
                      <div className={styles.container}>
                          <p className={styles.hashtag}>#{trend._id}</p>
                        <p className={styles.count}>{trend.count} tweet(s)</p>
                      </div>
                    </Link>
            })
        setTrends(loadingTrends)
    })

  }, [posted]);  

  return (
    <div className={styles.trends}>
        <h2 className={styles.title}>Trends</h2>
        {trends}
    </div>
   
  )
}

export default Trends