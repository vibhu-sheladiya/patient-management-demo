import React, { useState, useEffect, useRef } from "react";
import AuthSlider from "../../../components/auth-slider/AuthSlider";
import "./register.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerValidationSchema } from "../../../validation/AuthValidation";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [countries, setCountries] = useState([]); // For all countries
  const [states, setStates] = useState([]); // For states based on selected country
  const [cities, setCities] = useState([]); // For cities based on selected state
  const [hospitals, setHospitals] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newHospital, setNewHospital] = useState({
    hospital_name: "",
    hospital_address: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const initialValues = {
    first_name: "", // <-- Updated from firstName to first_name
    last_name: "", // <-- Updated from lastName to last_name
    phone_number: "", // <-- Updated from phoneNumber to phone_number
    country: "",
    state: "",
    city: "",
    hospitalId: "", // <-- Updated from hospital to hospitalId
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Form values:", values);

      // Send a POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:9500/v1/admin/create-admin",
        {
          first_name: values.first_name, // <-- Match with backend
          last_name: values.last_name, // <-- Match with backend
          phone_number: values.phone_number, // <-- Match with backend
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          country: values.country,
          state: values.state,
          city: values.city,
          hospitalId: values.hospitalId, // <-- Match with backend
          agree: values.agree,
        }
      );

      // Handle success response
      if (response.status === 201) {
        alert("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:9500/v1/hospital/create-hospital');
      setHospitals(response.data.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  // Fetch countries and states on component mount
  useEffect(() => {
    fetchCountriesAndStates();
    fetchHospitals();
  }, []);

  const fetchCountriesAndStates = async () => {
    try {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      const countryList = response.data.data.map((country) => ({
        name: country.name,
        iso3: country.iso3,
        states: country.states,
      }));
      setCountries(countryList);
    } catch (error) {
      console.error("Error fetching countries and states:", error);
    }
  };

  // POST API to fetch cities based on country and state
  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: countryName,
          state: stateName,
        }
      );
      setCities(response.data.data); // Assuming the API returns a "data" array for cities
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleHospitalSelect = (hospitalId, hospitalName) => {
    setSelectedHospital(hospitalName);
    setFieldValue("hospitalId", hospitalId);
    setShowDropdown(false);
  };

  const handleCreateHospital = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9500/v1/hospital/create-hospital",
        newHospital
      );

      if (response.status === 201 || response.status === 200) {
        await fetchHospitals();
        setShowModal(false);
        setNewHospital({
          hospital_name: "",
          hospital_address: "",
          country: "",
          state: "",
          city: "",
          zip_code: "",
        });
      }
    } catch (error) {
      console.error("Error creating hospital:", error);
    }
  };

  return (
    <section className="register-section">
      <div className="container-fluid vh-100 d-flex">
        <div className="row w-100 align-items-center">
          {/* Left Form Section */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="register-card p-4">
              <h2 className="mb-4 register-title">Registration</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={registerValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form>
                    {/* First Name and Last Name */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            name="first_name"
                            className={`form-control ${
                              errors.first_name && touched.first_name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="First Name"
                          />
                          <label htmlFor="first_name">Enter First Name</label>
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            name="last_name"
                            className={`form-control ${
                              errors.last_name && touched.last_name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Last Name"
                          />
                          <label htmlFor="last_name">Enter Last Name</label>
                          <ErrorMessage
                            name="last_name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email and Phone Number */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <Field
                            type="email"
                            name="email"
                            className={`form-control ${
                              errors.email && touched.email ? "is-invalid" : ""
                            }`}
                            placeholder="Email Address"
                          />
                          <label htmlFor="email">Email Address</label>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            name="phone_number"
                            className={`form-control ${
                              errors.phone_number && touched.phone_number
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Phone Number"
                          />
                          <label htmlFor="phone_number">Phone Number</label>
                          <ErrorMessage
                            name="phone_number"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Country, State, and City */}
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <Field
                          as="select"
                          name="country"
                          className={`form-select ${
                            errors.country && touched.country
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            const selectedCountry = e.target.value;
                            setFieldValue("country", selectedCountry);
                            const selectedCountryObj = countries.find(
                              (country) => country.name === selectedCountry
                            );
                            setStates(selectedCountryObj?.states || []); // Update states based on selected country
                          }}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.iso3} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <Field
                          as="select"
                          name="state"
                          className={`form-select ${
                            errors.state && touched.state ? "is-invalid" : ""
                          }`}
                          onChange={(e) => {
                            const selectedState = e.target.value;
                            setFieldValue("state", selectedState);
                            fetchCities(values.country, selectedState); // Fetch cities based on selected state
                          }}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state.state_code} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <Field
                          as="select"
                          name="city"
                          className={`form-select ${
                            errors.city && touched.city ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select City</option>
                          {cities.map((city, index) => (
                            <option key={index} value={city}>
                              {city}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    {/* Hospital Field */}
                    <div className="form-floating mb-3" ref={dropdownRef}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Select Hospital"
                        value={selectedHospital}
                        onClick={() => setShowDropdown(!showDropdown)}
                        readOnly
                      />
                      <label>Select Hospital</label>

                      {/* Dropdown Menu */}
                      {showDropdown && (
                        <div className="custom-dropdown">
                          {hospitals.map((hospital) => (
                            <div
                              key={hospital._id}
                              className="dropdown-item"
                              onClick={() =>
                                handleHospitalSelect(
                                  hospital._id,
                                  hospital.hospital_name
                                )
                              }
                            >
                              {hospital.hospital_name}
                            </div>
                          ))}
                          <button
                            type="button"
                            className="create-hospital-btn"
                            onClick={() => {
                              setShowModal(true);
                              setShowDropdown(false);
                            }}
                          >
                            Create Hospital
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Password */}
                    <div className="form-floating mb-3 position-relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Password"
                      />
                      <label htmlFor="password">Password</label>
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <img
                            src="./assets/images/eye-slash.svg"
                            alt="eye-slash"
                            className="img-fluid"
                          />
                        ) : (
                          <img
                            src="./assets/images/eye.svg"
                            alt="eye"
                            className="img-fluid"
                          />
                        )}
                      </button>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="form-floating mb-3 position-relative">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className={`form-control ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Confirm Password"
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <img
                            src="./assets/images/eye-slash.svg"
                            alt="eye-slash"
                            className="img-fluid"
                          />
                        ) : (
                          <img
                            src="./assets/images/eye.svg"
                            alt="eye"
                            className="img-fluid"
                          />
                        )}
                      </button>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* Agree to Terms */}
                    <div className="form-check mb-3">
                      <Field
                        type="checkbox"
                        name="agree"
                        className={`form-check-input ${
                          errors.agree && touched.agree ? "is-invalid" : ""
                        }`}
                      />
                      <label htmlFor="agree" className="form-check-label">
                        I agree to the terms and conditions
                      </label>
                      <ErrorMessage
                        name="agree"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <button type="submit" className="register-btn w-100">
                      Register
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>

          {/* Right Auth Slider */}
          <div className="col-md-6 d-none d-md-block position-relative">
            <AuthSlider />
          </div>
        </div>
      </div>
      {/* Create Hospital Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Hospital Name</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateHospital}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Hospital Name"
                      value={newHospital.hospital_name}
                      onChange={(e) =>
                        setNewHospital({
                          ...newHospital,
                          hospital_name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Hospital Address"
                      value={newHospital.hospital_address}
                      onChange={(e) =>
                        setNewHospital({
                          ...newHospital,
                          hospital_address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <select
                        className="form-select"
                        value={newHospital.country}
                        onChange={(e) =>
                          setNewHospital({
                            ...newHospital,
                            country: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="india">India</option>
                        {/* Add country options */}
                      </select>
                    </div>
                    <div className="col-6">
                      <select
                        className="form-select"
                        value={newHospital.state}
                        onChange={(e) =>
                          setNewHospital({
                            ...newHospital,
                            state: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select State</option>
                        <option value="gujarat">Gujarat</option>
                        {/* Add state options */}
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <select
                        className="form-select"
                        value={newHospital.city}
                        onChange={(e) =>
                          setNewHospital({
                            ...newHospital,
                            city: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select City</option>
                        <option value="surat">Surat</option>
                        {/* Add city options */}
                      </select>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Zip Code"
                        value={newHospital.zip_code}
                        onChange={(e) =>
                          setNewHospital({
                            ...newHospital,
                            zip_code: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="modal-footer px-0 pb-0">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </section>
  );
};

export default Register;
