import React from 'react';
import ClientList from '../../components/ClientList';

const AdminDashboard = () => { 
    return( 
        <div className={`container-fluid`}>
            <div className='row vh-100'>
                <div className='col-5 bg-dark'>

                </div>
                <div className='col-7'>
                    <ClientList />
                </div>
            </div>
        </div> 
    ); 
}

export default AdminDashboard;