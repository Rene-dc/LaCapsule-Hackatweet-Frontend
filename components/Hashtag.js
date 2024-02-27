import styles from '../styles/Feed.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/session';
import { useRouter } from 'next/router';
import Tweet from './Tweet';

import Leftbar from './Leftbar';
import Rightbar from './Rightbar';

function Hashtag() {
 
    const router = useRouter(); 
    const hashtag = router.query.hashtag;

    const [hashtagData, setHashtagData] = useState([]);
      const [error, setError] = useState('');
    
      useEffect(() => {
        if (hashtag) {
          const fetchHashtagData = async () => {
            try {
              const response = await fetch(`https://hackatweet-backend-puce.vercel.app/tweets/hashtag/${hashtag}`);
              const data = await response.json();
              setHashtagData(data.hashtagTweets);
            } catch (error) {
              setError(error.message);
            }
          };
          fetchHashtagData();
        }
      }, [hashtag]);


      const deletePost = (id) => {
    }
    const likePost = (id) => {
    }
    

      const hashtagTweets = hashtagData.map((tweet, i) => {
        console.log(tweet)
        return(<Tweet 
            
            key={i} 
            firstname={tweet.firstname} 
            username={tweet.username} 
            id={tweet.id} 
            content={tweet.content} 
            deletePost={deletePost} 
            likePost={likePost} 
            likedBy={tweet.likedBy} 
            numberOfLikes={tweet.numberOfLikes}
            postedAt={tweet.postedAt}
            elapsedTime={tweet.elapsedTime}
          />)
      })

      return (

        <div className={styles.mainContainer}>
        <div className={styles.leftbar}>
          <Leftbar />
        </div>
        <div className={styles.middleContainer}>
        <h2 className={styles.title}>#{hashtag}</h2>
        {hashtagTweets}
        </div>
        <Rightbar/>
      </div>
      )
     
}

export default Hashtag;
