import React from 'react';
import styles from '../styles/Tweet.module.css';
import Image from 'next/image';
import { Popover } from 'antd';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Tweet(props) {
  const router = useRouter()
  const username = useSelector((state) => state.session.value.username);
  const transformHashtagContent = (content) => {
    const parts = content.split(/(#\w+)/g);

    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <Link key={index} href={`/hashtag/${part.substring(1)}`}>
            <a className={styles.hashtagLink}>{part}</a>
          </Link>
        );
      } else {
        return part;
      }
    });
  };

  const popoverContent = (
    <div className={styles.popoverContent}>
      <button className={styles.delete} onClick={() => props.deletePost(props.id)}>Delete Post</button>
    </div>
  );
  
  const datePopoverContent = (
    <p>{props.postedAt}</p>
  )

  return (
    <div className={styles.tweetContainer}>

      <div className={styles.profileAndOptions}>
          <div className={styles.profile}>
              <img
                  onClick={() => {router.push(`/profile/${props.username}`);}}
                  className={styles.profilePic}
                  src='http://localhost:3001/icons/profile_icon.svg'
                  alt="profile picture"
              />
              <p onClick={() => {router.push(`/profile/${props.username}`);}} className={styles.firstname}>{props.firstname}</p>
              <p onClick={() => {router.push(`/profile/${props.username}`);}} className={styles.username}>@{props.username}</p>
          </div>
          {props.username === username && 
          <Popover title="Options" content={popoverContent} className={styles.popover} trigger="click">
            <button className={styles.popoverButton}>...</button>
          </Popover>}
      </div>

      <div className={styles.content}>
        {transformHashtagContent(props.content)}
      </div>
      <div className={styles.bottom}>
        <div className={styles.icons}>
          {!props.likedBy.includes(username) ? 
            <img 
              className={styles.likeIcon}
              src='http://localhost:3001/icons/like_button.svg'
              alt='like button'
              onClick={() => props.likePost(props.id)} 
            /> 
          : 
            <img 
              className={styles.likeIcon}
              src='http://localhost:3001/icons/unlike_button.svg' 
              alt='unlike button'
              onClick={() => props.likePost(props.id)} 
            />
          }
          <p className={styles.likeCounter}> {props.numberOfLikes > 0 && props.numberOfLikes}</p>
        </div>
        <Popover content={datePopoverContent} className={styles.datePopover} trigger="hover">
          <p className={styles.date}>Posted {props.elapsedTime}</p>
        </Popover>
      </div>
    </div>
  )
}

export default Tweet;

{/* <p className={styles.date} alt={`Posted ${props.postedAt}`} >Posted {props.elapsedTime}</p> */}