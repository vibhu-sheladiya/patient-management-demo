import React, { useState, useEffect } from "react";
import AuthSlider from "../../../components/auth-slider/AuthSlider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { registerValidationSchema } from "../../../validation/AuthValidation";
import "./PatientRegister.scss";

const PatientRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    hospital: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Add your register logic here (e.g., API call)
  };

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
    fetchHospitals(); // Fetch hospital list
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryList = response.data.map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }));
      setCountries(countryList);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await axios.get(
        `https://example.com/api/states/${countryCode}`
      );
      setStates(response.data.states);
      setCities([]); // Clear cities when country changes
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateCode) => {
    try {
      const response = await axios.get(
        `https://example.com/api/cities/${stateCode}`
      );
      setCities(response.data.cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("https://example.com/api/hospitals");
      setHospitals(response.data.hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  return (
    <section className="register-section">
      <div className="container-fluid vh-100 d-flex">
        <div className="row w-100 align-items-center">
          {/* Left Form Section */}
          <div className="col-md-6 d-flex justify-content-center ">
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
                            name="firstName"
                            className={`form-control ${
                              errors.firstName && touched.firstName
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="First Name"
                          />
                          <label htmlFor="firstName">Enter Last Name</label>
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            name="lastName"
                            className={`form-control ${
                              errors.lastName && touched.lastName
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Last Name"
                          />
                          <label htmlFor="lastName">Enter Last Name</label>
                          <ErrorMessage
                            name="lastName"
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
                            name="phoneNumber"
                            className={`form-control ${
                              errors.phoneNumber && touched.phoneNumber
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Phone Number"
                          />
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="form-floating">
                          <Field
                            type="number"
                            name="age"
                            className={`form-control ${
                              errors.age && touched.age ? "is-invalid" : ""
                            }`}
                            placeholder="Enter Age"
                          />
                          <label htmlFor="age">Age</label>
                          <ErrorMessage
                            name="age"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="form-floating">
                          <Field
                            type="number"
                            name="height"
                            className={`form-control ${
                              errors.height && touched.height
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter Hoght"
                          />
                          <label htmlFor="height">Height (cm)</label>
                          <ErrorMessage
                            name="height"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="form-floating">
                          <Field
                            type="number"
                            name="weight"
                            className={`form-control ${
                              errors.weight && touched.weight
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter Weight"
                          />
                          <label htmlFor="weight">Weight (Kg)</label>
                          <ErrorMessage
                            name="weight"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="form-floating">
                          <Field
                            as="select"
                            name="gender"
                            className="form-select"
                          >
                            <option value="select">Select Gender</option>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>FeMale</option>
                          </Field>
                          <label htmlFor="gender">Gender</label>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="form-floating">
                          <Field
                            as="select"
                            name="bloodgroup"
                            className="form-select"
                          >
                            <option value="">Select Group</option>
                            <option value={"male"}>A+</option>
                            <option value={"female"}>B+</option>
                            <option value={"female"}>B-</option>
                            <option value={"female"}>AB-</option>
                            <option value={"female"}>AB+</option>
                          </Field>
                          <label htmlFor="bloodgroup">Blood Group</label>
                          <ErrorMessage
                            name="bloodgroup"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="form-floating">
                          <Field
                            type="date"
                            name="birthdate"
                            className={`form-control ${
                              errors.birthdate && touched.birthdate
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Select Date"
                          />
                          <label htmlFor="birthdate">Date of Birth</label>
                          <ErrorMessage
                            name="birthdate"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Country, State, and City */}
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="form-floating">
                          <Field
                            as="select"
                            name="country"
                            className="form-select"
                            onChange={(e) => {
                              const selectedCountry = e.target.value;
                              setFieldValue("country", selectedCountry);
                              fetchStates(selectedCountry); // Fetch states based on country
                            }}
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </Field>
                          <label htmlFor="country">Country</label>
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="form-floating">
                          <Field
                            as="select"
                            name="state"
                            className="form-select"
                            onChange={(e) => {
                              const selectedState = e.target.value;
                              setFieldValue("state", selectedState);
                              fetchCities(selectedState); // Fetch cities based on state
                            }}
                          >
                            <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state.code} value={state.code}>
                                {state.name}
                              </option>
                            ))}
                          </Field>
                          <label htmlFor="state">State</label>
                          <ErrorMessage
                            name="state"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="form-floating">
                          <Field
                            as="select"
                            name="city"
                            className="form-select"
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.code} value={city.code}>
                                {city.name}
                              </option>
                            ))}
                          </Field>
                          <label htmlFor="city">City</label>
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hospital Field */}
                    <div className="form-floating mb-3">
                      <Field
                        as="select"
                        name="hospital"
                        className="form-select"
                      >
                        <option value="">Select Hospital</option>
                        {hospitals.map((hospital) => (
                          <option key={hospital.id} value={hospital.id}>
                            {hospital.name}
                          </option>
                        ))}
                      </Field>
                      <label htmlFor="hospital">Hospital</label>
                      <ErrorMessage
                        name="hospital"
                        component="div"
                        className="invalid-feedback"
                      />
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
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={togglePasswordVisibility}
                      >
                        <img
                          src={
                            showPassword
                              ? "./assets/images/eye-slash.svg"
                              : "./assets/images/eye.svg"
                          }
                          alt="toggle password"
                          className="img-fluid"
                        />
                      </button>
                      <label htmlFor="password">Password</label>
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
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <img
                          src={
                            showConfirmPassword
                              ? "./assets/images/eye-slash.svg"
                              : "./assets/images/eye.svg"
                          }
                          alt="toggle confirm password"
                          className="img-fluid"
                        />
                      </button>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="mb-3 form-check">
                      <Field
                        type="checkbox"
                        name="agreeToTerms"
                        className={`form-check-input ${
                          errors.agreeToTerms ? "is-invalid" : ""
                        }`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="agreeToTerms"
                      >
                        I agree to the{" "}
                        <span style={{ color: "blue" }}>Terms</span> and{" "}
                        <span style={{ color: "blue" }}>Privacy Policy</span>
                      </label>
                      <ErrorMessage
                        name="agreeToTerms"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* Register Button */}
                    <button type="submit" className="register-btn w-100">
                      Register
                    </button>

                    <div className="text-center account-text mt-3">
                      Already have an account?{" "}
                      <Link to={"/patient-login"} className="main-link ms-1">
                        Login
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Right Image/Illustration Section */}
          <div className="col-md-6 p-0 p-md-5 d-none d-lg-block position-relative d-md-block slider">
            <AuthSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientRegister;
