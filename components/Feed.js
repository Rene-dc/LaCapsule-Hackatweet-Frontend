import styles from '../styles/Feed.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/session';
import { useRouter } from 'next/router';

import Tweet from './Tweet';
import AddTweet from './AddTweet';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';

function Feed() {
	const [tweets, setTweets] = useState([]);
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.value.username);
  const userId = useSelector(state => state.session.value.id)
  const [posted, setPosted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  // GET ALL TWEETS
	useEffect(() => {
		fetch('https://hackatweet-backend-puce.vercel.app/tweets/')
    .then(response => response.json())
		.then(data => {
		  setTweets(data.allTweets);
		})
	}, [posted])

  const deletePost = (id) => {
    fetch(`https://hackatweet-backend-puce.vercel.app/tweets/delete/${id}`)
    .then(response => response.json())
    .then(data => {
      data.result && setPosted(!posted)
    })
  }

  const likePost = (id) => {
    fetch('https://hackatweet-backend-puce.vercel.app/tweets/like', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, user: userId }),
		}).then(response => response.json())
    .then(data => {
      data.result && setPosted(!posted)
    })
  }

  const newPost = (content, hashtags, postedBy) => {
    fetch('https://hackatweet-backend-puce.vercel.app/tweets/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ content, hashtags, postedBy }),
		}).then(response => response.json())
    .then(data => {
      data.result && setPosted(!posted)
    })
  }

  const tweetList = tweets.map((tweet) => {
    return(<Tweet 
      key={tweet.id} 
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
    
  if (user) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.leftbar}>
          <Leftbar />
        </div>
        <div className={styles.middleContainer}>
          <h2 className={styles.title}>Home</h2>
          <AddTweet newPost={newPost} />
          <div className={styles.tweetList}>{tweetList}</div>
        </div>
        <Rightbar posted={posted}/>
      </div>
    );
  }
	return (
		<><span>Logged-out</span></>
	);
}

export default Feed;
