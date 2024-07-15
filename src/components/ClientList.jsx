import axios from "axios";
import React, { useEffect, useState } from "react";

const ClientList = () => {
  const [clientData, setClientData] = useState([]);
  const [selectedClient, setSelectedClient] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    address: "",
    start_date: "",
    end_date: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const reload = () => window.location.reload;
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

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
    setSelectedClient(clientData.find((client) => client.id === id));
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSaveChanges = async (edit_id) => {
    if (window.confirm("Confirm Changes?")) {
      const validationErrors = {};

      if (formData.start_date > formData.end_date) {
        validationErrors.subscriptionDates =
          "Start date should be before end date.";
      }

      if (formData.password !== formData.confirmPassword) {
        validationErrors.password = "Passwords do not match.";
      }

      setFormErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        try {
          const response = await axios.put(
            `http://localhost:3001/api/client_data/${edit_id}`,
            formData
          );
          console.log("Client Data Updated", response.data);
        } catch (err) {
          console.error("Error deleting client:", err);
          setError("Failed to delete client. Please try again later.");
        } finally {
          setFormData({
            name: "",
            email: "",
            mobile_number: "",
            address: "",
            start_date: "",
            end_date: "",
            password: "",
            confirmPassword: "",
          });
        }
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveChanges(selectedClient.id);
    reload();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/client_data/${id}`
        );
        console.log("Client Deleted", response.data);
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
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Client
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedClient && (
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="name"
                    name="name"
                    placeholder={selectedClient.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="email"
                    name="email"
                    placeholder={selectedClient.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="tel"
                    className="form-control mb-3"
                    id="mobile_number"
                    name="mobile_number"
                    placeholder={selectedClient.mobile_number}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    className="form-control mb-3"
                    id="address"
                    name="address"
                    placeholder={selectedClient.address}
                    rows="3"
                    onChange={handleChange}
                    required
                  />
                  <div className="row mb-3">
                    <div className="col-6">
                      <label
                        className="form-label text-light"
                        htmlFor="startDate"
                      >
                        Start Date:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="start_date"
                        name="start_date"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label
                        className="form-label text-light"
                        htmlFor="endDate"
                      >
                        End Date:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="end_date"
                        name="end_date"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {formErrors.subscriptionDates && (
                      <small className="text-danger">
                        {formErrors.subscriptionDates}
                      </small>
                    )}
                  </div>
                  <input
                    type="password"
                    className="form-control mb-3"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                  <div>
                    <input
                      type="password"
                      className="form-control mb-3"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      required
                    />
                    {formErrors.password && (
                      <small className="text-danger">
                        {formErrors.password}
                      </small>
                    )}
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
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
