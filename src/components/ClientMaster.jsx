import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientMaster = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    address: '',
    start_date: '',
    end_date: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (formData.start_date > formData.end_date) {
      validationErrors.subscriptionDates = 'Start date should be before end date.';
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.password = 'Passwords do not match.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3001/api/add_client', formData);
        console.log("Client Added Successfully", response.data);
        navigate('/admin_dashboard');
      } catch (err) {
        console.error(err);
      } finally {
        setFormData({
          name: '',
          email: '',
          mobileNumber: '',
          address: '',
          subscriptionStartDate: '',
          subscriptionEndDate: '',
          password: '',
          confirmPassword: '',
        });
      }
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            placeholder='Name'
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID (unique):</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            placeholder='Email ID'
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number (unique):</label>
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            placeholder='Mobile Number'
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            placeholder='Address'
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subscriptionStartDate">Subscription Start Date:</label>
          <input
            type="date"
            className="form-control"
            id="subscriptionStartDate"
            name="subscriptionStartDate"
            value={formData.subscriptionStartDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subscriptionEndDate">Subscription End Date:</label>
          <input
            type="date"
            className="form-control"
            id="subscriptionEndDate"
            name="subscriptionEndDate"
            value={formData.subscriptionEndDate}
            onChange={handleChange}
            required
          />
          {errors.subscriptionDates && (
            <small className="text-danger">{errors.subscriptionDates}</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
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
    </div>
  );
};

export default ClientMaster;