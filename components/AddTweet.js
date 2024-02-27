import React from 'react';
import { useState } from 'react';
import styles from '../styles/AddTweet.module.css';
import { useSelector } from 'react-redux';

function AddTweet(props) {
  const session = useSelector((state) => state.session.value);
  const [length, setLength] = useState(0);
  const [tweetContent, setTweetContent] = useState('');

  const getHashtags = (content) => {
    const hashtagRegex = /#(\w+)/g;
    const hashtags = content.match(hashtagRegex)
    if (hashtags) {
      return hashtags.map(item => {
        return item.slice(1)
      })
    }
    return [];
  }

  const handleNewTweet = (e) => {
      setTweetContent(e.target.value);
      setLength(e.target.value.length);
  }

  const postNewTweet = () => {
    props.newPost(tweetContent, getHashtags(tweetContent), session.id)
          setTweetContent('');
          setLength(0);
  }

  return (
    <div className={styles.newTweetContainer}>
      <textarea className={styles.tweetInput} maxlength="280" onChange={(e) => handleNewTweet(e)} placeholder="What's happening ?" value={tweetContent}></textarea>
      <div className={styles.separator}>Lorem</div>
      <div className={styles.button}>
        <div className={styles.tweetLength}>{length}/280</div>
        <button className={styles.tweet} onClick={() => postNewTweet()}>TWEET</button>
      </div>
    </div>
  )
}

export default AddTweet
