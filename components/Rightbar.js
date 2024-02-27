import styles from '../styles/Feed.module.css';
import Search from './Search';
import Trends from './Trends';

function Rightbar({posted}) {
  
    return (
      
        <div className={styles.rightbar}>
            <Search/>
            <Trends posted={posted}/>
        </div>
       
      
    )
  }
  
  export default Rightbar