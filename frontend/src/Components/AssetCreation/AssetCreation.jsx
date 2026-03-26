import React, { useState } from "react";
import "./AssetCreation.css";
// import Nav from '../Components/Nav/Nav';
import axios from "axios";

// Asset Creation
const AssetCreation = () => {
  // Submission Response
  const [responseMessage, setResponseMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    sharesAvailable: "",
    propertyImage: null,
    titleDocument: null,
  });

  // Set file upload names
  // const [imageName, setImage] = useState('');
  // const [documentName, setDocument] = useState('');

  // Updating of form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // // Image Upload
  // const handleImageUpload = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //         setForm({
  //             ...form,
  //             propertyImage: file
  //         });
  //         setImage(file.name);
  //     }
  // };

  // // Title Doc upload
  // const handleDocumentUpload = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //         setForm({
  //             ...form,
  //             titleDocument: file
  //         });
  //         setDocument(file.name);
  //     }
  // };

  //******* */
  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://divy-dd00.onrender.com/users/create", form);
      setResponseMessage("Data submitted successfully!");
      // console.log(response.data); // Log the response from Django
      if (response.status === 201) {
        alert("You are registered!");
      }
    } catch (error) {
      setResponseMessage("Error submitting data.");
      console.log("Error:", error);
      alert(
        "Cannot register. Either invalid information (username, email, and/or phone), or a user with same information could already exist"
      );
    }
  };

  return (
    // Create Asst Listing
    <div className="create-asset-container">
      <div className="create-asset-wrapper">
        {/* Header */}
        <div className="create-asset-header">
          <h1 className="create-asset-title">Create New Asset Listing</h1>
          <p className="create-asset-subtitle">Fill in the details below to list a new asset</p>
        </div>

        {/* Creation Form */}
        <form onSubmit={handleSubmit} className="create-asset-form">
          <div className="form-columns">
            {/* Left Column Fields */}
            <div className="form-column">
              {/* Title */}
              <div className="input-create">
                <label htmlFor="title" className="form-label">
                  Asset Title <span className="required">*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  id="title"
                  placeholder="e.g., Luxury Downtown Apartment"
                  value={form.title}
                  onChange={handleChange}
                  className="create-field"
                  required
                />
              </div>

              {/* Address */}
              <div className="input-create">
                <label htmlFor="address" className="form-label">
                  Address <span className="required">*</span>
                </label>
                <input
                  name="address"
                  type="text"
                  id="address"
                  placeholder="123 Main Street, City, State, ZIP"
                  value={form.address}
                  onChange={handleChange}
                  className="create-field"
                  required
                />
              </div>

              {/* Price */}
              <div className="input-create">
                <label htmlFor="price" className="form-label">
                  Total Price <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="input-icon">$</span>
                  <input
                    name="price"
                    type="number"
                    id="price"
                    placeholder="50000"
                    value={form.price}
                    onChange={handleChange}
                    className="create-field with-icon"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column Fields */}
            <div className="form-column">
              {/* Description */}
              <div className="input-create">
                <label htmlFor="description" className="form-label">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Provide a detailed description..."
                  value={form.description}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="3"
                  required
                />
              </div>

              {/* Shares Available */}
              <div className="input-create">
                <label htmlFor="sharesAvailable" className="form-label">
                  Shares Available <span className="required">*</span>
                </label>
                <input
                  name="sharesAvailable"
                  type="number"
                  id="sharesAvailable"
                  placeholder="100"
                  value={form.sharesAvailable}
                  onChange={handleChange}
                  className="create-field"
                  required
                />
              </div>

              {/* Property Image Upload
                            <div className="input-create">
                                <label htmlFor="propertyImage" className="form-label">
                                    Property Image <span className="required">*</span>
                                </label>
                                <div className="file-upload-container">
                                    <input
                                        name="propertyImage"
                                        type="file"
                                        id="propertyImage"
                                        onChange={handleImageUpload}
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        className="file-input"
                                        required
                                    />
                                </div>
                            </div> */}
            </div>
          </div>

          {/* Title Document - Bottom section */}
          {/* <div className="input-create-full">
                        <label htmlFor="titleDocument" className="form-label">
                            Title Document <span className="required">*</span>
                        </label>
                        <div className="file-upload-container">
                            <input
                                name="titleDocument"
                                type="file"
                                id="titleDocument"
                                onChange={handleDocumentUpload}
                                accept=".pdf,.doc,.docx"
                                className="file-input"
                                required
                            />
                        </div>
                    </div> */}

          {/* Submit Button */}
          <div className="submit-create">
            <button type="submit" className="btn-submit">
              Create New Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetCreation;
