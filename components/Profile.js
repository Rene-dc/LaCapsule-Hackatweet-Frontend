import styles from '../styles/Feed.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/session';
import { useRouter } from 'next/router';
import Tweet from './Tweet';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';


function Profile() {
 
    const router = useRouter(); 
    const username = router.query.username;
    const session = useSelector(state => state.session.value)
    const [isFollowed, setisFollowed] = useState(false)

    const [userData, setUserData] = useState({
        id: null,
        firstname: null,
        username: null,
        likedTweets: [],
        postedTweets: [],
        followedBy: [],
        following: [],
      });
      const [error, setError] = useState('');
    
      useEffect(() => {
        if (username) {
          const fetchUserData = async () => {
            try {
              const response = await fetch(`https://hackatweet-backend-puce.vercel.app/users/profile/${username}`);
              const data = await response.json();
              setUserData(data);
              setisFollowed(data.followedBy.some(user => user._id === session.id))
            } catch (error) {
              setError(error.message);
            }
          };
          fetchUserData();
        }
      }, [username, isFollowed]);

      const deletePost = (id) => {
    }
    const likePost = (id) => {
    }
    
    const handleFollow = async () => {
      
      const link = 'https://hackatweet-backend-puce.vercel.app/users/follow/'
      const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ follower: session.id, followed: userData.id  }),
                  }

      const response = await fetch(link, options);

      const data = await response.json();

      setisFollowed(data.following)


    }

      const postedTweets = userData.postedTweets.map((tweet, i) => {
        console.log(tweet)
        return(<Tweet 
            key={i} 
            firstname={userData.firstname} 
            username={userData.username} 
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
        <div>
          <div className={styles.profile}>
            <img 
              className={styles.profilePic}
              src='http://localhost:3001/icons/profile_icon.svg'
              alt="profile picture"
            />
            <div className={styles.profileContainer}>
              <div className={styles.top}>
                <div className={styles.names}>
                  <p className={styles.firstname}>{userData.firstname}'s Profile</p>
                  <p className={styles.username}>@{userData.username}</p>
                </div>
                {isFollowed ? <button onClick={handleFollow} className={styles.follow}>Unfollow</button> : <button className={styles.follow} onClick={handleFollow}>Follow</button>}
              </div>
              <div className={styles.infos}>
                <div className={styles.tweetsInfos}>
                  <p>Posted Tweets: {userData.postedTweets.length}</p>
                  <p>Liked Tweets: {userData.likedTweets.length}</p>
                </div>
                <div className={styles.followInfos}>
                  <p>Followed By: {userData.followedBy.length}</p>
                  <p>Following: {userData.following.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div>{postedTweets}</div>
        </div>
        </div>
        <Rightbar/>
      </div>
       
      );
}

export default Profile;
