import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClientMaster = () => {
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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (formData.start_date > formData.end_date) {
      validationErrors.subscriptionDates =
        "Start date should be before end date.";
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.password = "Passwords do not match.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/add_client",
          formData
        );
        console.log("Client Added Successfully", response.data);
        navigate("/admin_dashboard");
      } catch (err) {
        console.error(err);
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control mb-3"
        id="name"
        name="name"
        value={formData.name}
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        className="form-control mb-3"
        id="email"
        name="email"
        value={formData.email}
        placeholder="Email ID"
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        className="form-control mb-3"
        id="mobileNumber"
        name="mobileNumber"
        value={formData.mobile_number}
        placeholder="Mobile Number"
        onChange={handleChange}
        required
      />
      <textarea
        className="form-control mb-3"
        id="address"
        name="address"
        value={formData.address}
        placeholder="Address"
        onChange={handleChange}
        rows="3"
        required
      />
      <div className="row mb-3">
        <div className="col-6">
          <label className="form-label text-light" htmlFor="startDate">
            Start Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-6">
          <label className="form-label text-light" htmlFor="endDate">
            End Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={formData.end_date}
            min={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        {errors.subscriptionDates && (
          <small className="text-danger">{errors.subscriptionDates}</small>
        )}
      </div>
      <input
        type="password"
        className="form-control mb-3"
        id="password"
        name="password"
        value={formData.password}
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
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        {errors.password && (
          <small className="text-danger">{errors.password}</small>
        )}
      </div>
      <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
        Add Client
      </button>
    </form>
  );
};

export default ClientMaster;
