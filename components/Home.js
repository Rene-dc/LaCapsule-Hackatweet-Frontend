import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/session';
import { useRouter } from 'next/router';
import Image from 'next/image';


function Home() {

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/feed');
    }
  }, [isLoggedIn, router]);

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.session.value.username);

  const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');
  const [isSignUpHidden, setIsSignUpHidden] = useState(true);
  const [isSignInHidden, setIsSignInHidden] = useState(true);

  const handleSignUp = () => {
		fetch('https://hackatweet-backend-puce.vercel.app/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname: signUpFirstName, username: signUpUsername, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signUpUsername, firstname: signUpFirstName, id: data.userId}));
          setSignUpFirstName('');
					setSignUpUsername('');
					setSignUpPassword('');				}
			});
	};

	const handleSignIn = () => {

		fetch('https://hackatweet-backend-puce.vercel.app/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signInUsername, firstname: data.firstname, id: data.userId}));
					setSignInUsername('');
					setSignInPassword('');
        }
			});
	};

  const handleKeyDownSignUp = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  const handleKeyDownSignIn = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  let userConnection = <div className={styles.registerContainer}>
  <div className={`${styles.registerSection} ${isSignUpHidden && styles.hidden}`}>
    <div className={styles.registerCard}>
      <div className={styles.close}>
        <Image
          src='http://localhost:3001/icons/close_round_border.svg'
          alt="close button"
          height={34}
          width={34}
          onClick={() => setIsSignUpHidden(true)}
        />
      </div>
      <p className={styles.registerTitle}>Sign-up</p>
      <input className={styles.inputField} type="text" onKeyDown={handleKeyDownSignUp} placeholder="Firstname" id="signupFirstname" onChange={(e) => setSignUpFirstName(e.target.value)} value={signUpFirstName} />
      <input className={styles.inputField} type="text" onKeyDown={handleKeyDownSignUp} placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
      <input className={styles.inputField} type="password" onKeyDown={handleKeyDownSignUp} placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
      <button id="register" onClick={() => handleSignUp()} className={styles.signin}>Register</button>
    </div>
  </div>
  <div className={`${styles.registerSection} ${isSignInHidden && styles.hidden}`}>
    <div className={styles.registerCard}>
      <div className={styles.close}>
        <Image
          src='http://localhost:3001/icons/close_round_border.svg'
          alt="close button"
          height={34}
          width={34}
          onClick={() => setIsSignInHidden(true)}
        />
      </div>
      <p className={styles.registerTitle}>Sign-in</p>
      <input className={styles.inputField} onKeyDown={handleKeyDownSignIn} type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
      <input className={styles.inputField} onKeyDown={handleKeyDownSignIn} type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
      <button id="connection" onClick={() => handleSignIn()} className={styles.signin} >Connect</button>
    </div>
  </div>
</div>

  if (isLoggedIn) {
    router.push('/feed');
    return null;
  }

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>HACKATWEET</h1>
        <div className={styles.container}>
          <div className={styles.left}>
            <Image
              className={styles.logo}
              src='http://localhost:3001/logo/logo.png'
              alt="profile picture"
              height={540}
              width={540}
            />
          </div>
          <div className={styles.separator}>Lorem</div>
          <div className={styles.right}>
            <h2 className={styles.join}>JOIN HACKATWEET TODAY</h2>
            <button className={styles.signup} onClick={() => setIsSignUpHidden(false)}>SIGNUP</button>
            <button className={styles.signin} onClick={() => setIsSignInHidden(false)}>SIGNIN</button>
          </div>
            {userConnection}
        </div>
      </main>
    </div>
  );
}

export default Home;
