import React from 'react';
import styles from '../styles/Leftbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { login, logout } from '../reducers/session';


function Leftbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.value);

  const handleLogout = () => {

    dispatch(logout())
    router.push('/')

  };

  return (
    
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img onClick={() => {user ? router.push('/feed') : router.push('/');}} className={styles.logo} src='http://localhost:3001/logo/logo.png' alt='logo' />
      </div>
      <div className={styles.bottom}>
        <div className={styles.profile}>
          <img 
            onClick={() => {router.push(`/profile/${user.username}`);}}
            className={styles.profilePic + ' ' + styles.clickable}
            src='http://localhost:3001/icons/profile_icon.svg'
            alt="profile picture"
          />
          <div className={styles.user}>
            <h2 onClick={() => {router.push(`/profile/${user.username}`);}} className={styles.firstname + ' ' + styles.clickable}>{user.firstname}</h2>
            <h3 onClick={() => {router.push(`/profile/${user.username}`);}} className={styles.username + ' ' + styles.clickable }>@{user.username}</h3>
          </div>
        </div>
        <button className={styles.logout} onClick={() => handleLogout()}>LOGOUT</button>
      </div>
    </div>
     
    
  )
}

export default Leftbar