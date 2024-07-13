import React from "react";
import ClientList from "../../components/ClientList";
import ClientMaster from "../../components/ClientMaster";

const AdminDashboard = () => {
  return (
    <div className={`container-fluid`}>
      <div className="row vh-100">
        <div className="col-5 h-100 bg-dark">
          <h1 className="text-center text-success m-5">CLIENT MASTER</h1>
          <ClientMaster />
        </div>
        <div className="col-7">
          <h1 className="text-center text-primary m-5">CLIENT TABLE</h1>
          <ClientList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
