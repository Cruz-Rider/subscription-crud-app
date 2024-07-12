import React from 'react';
import styles from './Home.module.css';
import { Outlet, Link } from 'react-router-dom';

const Home = () => { 
    return( 
        <>
        <div className={`${styles.main} container-fluid vh-100 vw-100 d-flex justify-content-evenly align-items-center`}> 
            <Link to="/admin">
                <button type='button' className='btn btn-primary rounded-pill w-100 h-100'>Admin</button>
            </Link>
            <Link to="/client">
                <button type='button' className='btn btn-primary rounded-pill w-100 h-100'>Client</button>
            </Link>
        </div>

        <Outlet />
        </>
    ); 
}

export default Home;