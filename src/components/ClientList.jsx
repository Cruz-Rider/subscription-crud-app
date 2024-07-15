import axios from "axios";
import React, { useEffect, useState } from "react";

const ClientList = () => {
  const [clientData, setClientData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:3001/api/client_data"
        );
        setClientData(response.data);
      } catch (err) {
        console.error("Error fetching client data:", err);
        setError("Failed to load client data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    setClientData(clientData.filter((client) => client.id === id));
  };

  const edit_id = clientData.map((client) => client.id);

  const editClient = async (edit_id) => {
    if (window.confirm("Confirm Changes?")) {
      try {
        const response = await axios.put(
          `http://localhost:3001/api/client_data/${edit_id}`
        );
      } catch (err) {
        console.error("Error deleting client:", err);
        setError("Failed to delete client. Please try again later.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/client_data/${id}`
        );
        setClientData(clientData.filter((client) => client.id !== id));
      } catch (err) {
        console.error("Error deleting client:", err);
        setError("Failed to delete client. Please try again later.");
      }
    }
  };

  return (
    <div>
      <table className="table table-hover">
        <thead className="table-info">
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-secondary">
          {isLoading ? (
            <tr>
              <td colSpan="7" className="text-center">
                Loading clients...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="7" className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : (
            clientData.map((client, index) => (
              <tr key={client.id}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary mx-2"
                    onClick={() => handleEdit(client.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger mx-2"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Client
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
