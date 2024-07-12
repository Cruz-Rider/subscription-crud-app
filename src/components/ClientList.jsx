import axios from 'axios';
import React, { useEffect } from 'react';

const ClientList = () => { 
    const data = [];
    
    const fetch_data = async () => {
        try{
            
            const res = await axios.get('http://localhost:3001/api/client_data');
            data.push(...res.data);

        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        fetch_data();
    })
    
    return( 
        <table className="table table-hover">
            <thead className='table-info'>
                <tr>
                    <th>Name</th>
                    <th>Email ID</th>
                    <th>Mobile Number</th>
                    <th>Address</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody className='table-dark'>
                {}
            </tbody>
        </table> 
    ); 
}

    export default ClientList;