import React from 'react';

const AdminLogin = () => { 
    return( 
        <div className={`container-fluid vh-100 vw-100 d-flex align-items-center justify-content-center`}> 
            <div className='card text-bg-info w-25 h-50'>
                <div className='card-header text-center'>ADMIN LOGIN</div>
                <div className='card-body'>
                    <form className='d-flex flex-column align-items-center justify-content-center'>
                      <div className="mb-3">
                        <label for="adminEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="adminEmail" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">Please enter your email!</div>
                      </div>
                      <div className="mb-3">
                        <label for="adminPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="adminPassword" />
                      </div>
                      <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div> 
    ); 
}

export default AdminLogin;