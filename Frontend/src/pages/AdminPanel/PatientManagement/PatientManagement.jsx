import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import "./PatientManagement.scss";
import PatientDetailsModal from "../../../components/modals/PatientDetailsModal/PatientDetailsModal";

const allAppointments = {
  today: [
    {
      profilePicture: "/assets/images/Avatar-2.png",
      patientName: "Marcus Philips",
      patientIssue: "Stomach Ache",
      phoneNumber: "92584 58475",
      age: "36 Years",
      gender: "Male",
      doctorName: "Dr. Marcus Philips",
      diseaseName: "Viral Infection",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "4:30 PM",
      appointmentType: "Online",
      address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar.",
    },
    {
      profilePicture: "/assets/images/Avatar-2.png",
      patientName: "Julianna Warren",
      patientIssue: "Stomach Ache",
      phoneNumber: "92584 58475",
      age: "32 Years",
      gender: "Female",
      doctorName: "Dr. Sophia Patel",
      diseaseName: "Diabetes",
      appointmentDate: "3 Jan, 2022",
      appointmentTime: "2:40 PM",
      appointmentType: "Onsite",
      address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar.",
    },
    // Add more dummy data...
  ],
  upcoming: [
    {
      profilePicture: "/assets/images/Avatar-2.png",
      patientName: "Olive Valencia",
      patientIssue: "Headache",
      phoneNumber: "92584 58475",
      age: "32 Years",
      gender: "Male",
      doctorName: "Dr. Tessa Lee",
      diseaseName: "Headache",
      appointmentDate: "12 Jan, 2022",
      appointmentTime: "3:30 PM",
      appointmentType: "Online",
      address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar.",
    },
    {
      profilePicture: "/assets/images/Avatar-2.png",
      patientName: "Rowen Floyd",
      patientIssue: "Fever",
      phoneNumber: "92584 58475",
      age: "32 Years",
      gender: "Female",
      doctorName: "Dr. Winter Strong",
      diseaseName: "Fever",
      appointmentDate: "22 Jan, 2022",
      appointmentTime: "2:00 AM",
      appointmentType: "Onsite",
      address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar.",
    },
    // Add more dummy data...
  ],
  previous: [
    {
      profilePicture: "/assets/images/Avatar-2.png",
      patientName: "Gaige Castillo",
      patientIssue: "Fever",
      phoneNumber: "92584 58475",
      age: "32 Years",
      gender: "Male",
      doctorName: "Dr. Yusuf Mercado",
      diseaseName: "Viral Infection",
      appointmentDate: "20 Feb, 2022",
      appointmentTime: "1:30 PM",
      appointmentType: "Onsite",
      address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar.",
    },
    {
      profilePicture: "/assets/images/Avatar-2.png",
      patientName: "Kayla Maddox",
      patientIssue: "Feeling Tired",
      phoneNumber: "92584 58475",
      age: "32 Years",
      gender: "Female",
      doctorName: "Dr. Titan Grant",
      diseaseName: "Blood Pressure",
      appointmentDate: "10 Jun, 2022",
      appointmentTime: "5:00 AM",
      appointmentType: "Online",
      address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar.",
    },
    // Add more dummy data...
  ],
  canceled: [
    {
      profilePicture: "/assets/images/Avatar-2.png",
      patientName: "Trenton Mejia",
      patientIssue: "Fever",
      phoneNumber: "92584 58475",
      age: "32 Years",
      gender: "male",
      doctorName: "Dr. Keenan Tucker",
      diseaseName: "Viral Infection",
      appointmentDate: "25 Jan, 2022",
      appointmentTime: "4:30 PM",
      appointmentType: "Online",
      address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar.",
    },
    {
      profilePicture: "/assets/images/Avatar-2.png",
      patientName: "Julianna Warren",
      patientIssue: "Headache",
      phoneNumber: "92584 58475",
      age: "32 Years",
      gender: "Female",
      doctorName: "Dr. Ari Bullock",
      diseaseName: "Headache",
      appointmentDate: "18 Aug, 2022",
      appointmentTime: "6:00 AM",
      appointmentType: "Onsite",
      address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar.",
    },
    // Add more dummy data...
  ],
};

const PatientManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    today: "",
    upcoming: "",
    previous: "",
    canceled: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Change Invoice Theme",
      description: "Lincoln Philips changed the Invoice Theme.",
      time: "5 min ago",
      icon: "theme-icon.svg",
    },
    {
      id: 2,
      title: "Dr.Bharat",
      description: "Created a bill by Dr. Bharat.",
      time: "5 min ago",
      icon: "theme-icon.svg",
    },
    {
      id: 3,
      title: "Payment Received",
      description: "24,668 is the payment done of Miracle Canter.",
      time: "1:52PM",
      icon: "payment-received-icon.svg",
    },
    {
      id: 4,
      title: "Payment Cancelled",
      description: "24,668 is the payment cancelled of Miracle Canter.",
      time: "1:52PM",
      icon: "payment-cancelled-icon.svg",
    },
  ]);

  const noNotificationImage = "/assets/images/no-notification.png";

  const clearNotifications = () => {
    setNotifications([]); // Clear the notifications array
  };

  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSearchChange = (e, tab) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [tab]: e.target.value,
    }));
  };

  const getFilteredAppointments = (appointments, searchTerm) => {
    return appointments.filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patientIssue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderAppointmentTable = (appointments, searchTerm) => {
    const filteredAppointments = getFilteredAppointments(
      appointments,
      searchTerm
    );
    if (filteredAppointments.length === 0) {
      return (
        <div className="text-center py-5">
          <img
            src="/assets/images/no-today-appointment.png"
            alt="No appointments"
            className="mb-3 img-fluid"
          />
        </div>
      );
    }

    return (
      <div className="table-responsive">
        <table className="table today-patient_management-table table-hover">
          <thead>
            <tr>
              <th className="rounded-end-0">Patient Name</th>
              <th className="rounded-end-0 rounded-start-0">Patient Issue</th>
              <th className="rounded-end-0 rounded-start-0">Doctor Name</th>
              <th className="rounded-end-0 rounded-start-0">Dieses Name</th>
              <th className="rounded-end-0 rounded-start-0">
                Appointment Time
              </th>
              <th className="rounded-end-0 rounded-start-0">
                Appointment Type
              </th>
              <th className="rounded-start-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={appointment.profilePicture}
                    alt={appointment.patientName}
                    className="me-3 img-fluid profile_img"
                  />
                  {appointment.patientName}
                </td>
                <td>{appointment.patientIssue}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.diseaseName}</td>
                <td>
                  <div className="patient_management-time">
                    {appointment.appointmentTime}
                  </div>
                </td>
                <td className="text-center patient_management-badge">
                  <span
                    className={`badge badge-${
                      appointment.appointmentType === "Online"
                        ? "warning"
                        : "primary"
                    }`}
                  >
                    {appointment.appointmentType}
                  </span>
                </td>
                <td>
                  <button
                    className="bg-transparent"
                    onClick={() => handleViewPatient(appointment)}
                  >
                    <img
                      src="/assets/images/view-icon-box.svg"
                      alt="view-icon-box"
                      className="img-fluid"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="d-flex">
      <div className="w-15 w-md-0">
        <Sidebar
          isOpen={isSidebarOpen}
          sidebarRef={sidebarRef}
          activeLink={location.pathname}
        />
      </div>
      <div className="w-85 w-md-100">
        <div className="profile-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6 col-12 mobile-screen">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">
                        <img
                          src="/assets/images/home-2.svg"
                          alt="Home"
                          className="breadcrumb-icon"
                        />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Patient Management
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-md-6 col-12 d-lg-flex d-block justify-content-lg-end">
                <div className="d-lg-flex d-none search-container me-3 mt-lg-0 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quick Search"
                  />
                  <img
                    src="/assets/images/search.svg"
                    alt="search"
                    className="search-icon"
                  />
                  <Dropdown className="me-3">
                    <Dropdown.Toggle variant="link" id="dropdown-all">
                      All
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>All</Dropdown.Item>
                      <Dropdown.Item>Doctor</Dropdown.Item>
                      <Dropdown.Item>Patient</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-lg-none d-flex align-items-center justify-content-between">
                  <nav className="breadcrumb-container d-block d-lg-none p-0">
                    <button className="btn btn-primary" onClick={toggleSidebar}>
                      <i className="bi bi-text-left"></i>
                    </button>
                  </nav>
                  <div className="d-flex align-items-center justify-content-center">
                    <button className="btn" onClick={toggleSearch}>
                      <img
                        src="/assets/images/search.svg"
                        alt="search"
                        className="search-icon"
                      />
                    </button>
                    {isSearchVisible && (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Quick Search"
                        style={{ display: isSearchVisible ? "block" : "none" }}
                      />
                    )}
                    <Dropdown className="notification-dropdown mx-3">
                      <Dropdown.Toggle
                        variant="link"
                        className="notification-toggle"
                      >
                        <img
                          src="/assets/images/notification-bing.svg"
                          alt="Notification Icon"
                          className="img-fluid"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="notification-menu">
                        <div className="notification-header d-flex justify-content-between align-items-center">
                          <span>Notification</span>
                          <button className="close-btn" onClick={clearNotifications}>&times;</button>
                        </div>
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="notification-item d-flex align-items-start"
                            >
                              <img
                                src={`/assets/images/${notification.icon}`}
                                alt={notification.title}
                                className="notification-icon"
                              />
                              <div className="notification-content">
                                <h5>{notification.title}</h5>
                                <p>{notification.description}</p>
                              </div>
                              <span className="notification-time">
                                {notification.time}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="no-notifications text-center">
                            <img
                              src={noNotificationImage}
                              alt="No Notifications"
                              className="no-notifications-img"
                            />
                          </div>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle variant="link" id="dropdown-user">
                        <div className="d-flex align-items-center">
                          <img
                            src="/assets/images/profile.png"
                            alt="Lincoln Philips"
                            className="profile-pic img-fluid"
                          />
                          <div className="d-none text-start">
                            <h3 className="user-name mb-0">Lincoln Philips</h3>
                            <span className="user-role">Admin</span>
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="#/settings">
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="d-lg-flex d-none align-items-center">
                  <Dropdown className="notification-dropdown">
                    <Dropdown.Toggle
                      variant="link"
                      className="notification-toggle"
                    >
                      <img
                        src="/assets/images/notification-bing.svg"
                        alt="Notification Icon"
                        className="img-fluid"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="notification-menu">
                      <div className="notification-header d-flex justify-content-between align-items-center">
                        <span>Notification</span>
                        <button className="close-btn" onClick={clearNotifications}>&times;</button>
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="notification-item d-flex align-items-start"
                          >
                            <img
                              src={`/assets/images/${notification.icon}`}
                              alt={notification.title}
                              className="notification-icon"
                            />
                            <div className="notification-content">
                              <h5>{notification.title}</h5>
                              <p>{notification.description}</p>
                            </div>
                            <span className="notification-time">
                              {notification.time}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="no-notifications text-center">
                          <img
                            src={noNotificationImage}
                            alt="No Notifications"
                            className="no-notifications-img"
                          />
                        </div>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-user">
                      <div className="d-flex align-items-center">
                        <img
                          src="/assets/images/profile.png"
                          alt="Lincoln Philips"
                          className="profile-pic img-fluid"
                        />
                        <div className="d-block text-start">
                          <h3 className="user-name mb-0">Lincoln Philips</h3>
                          <span className="user-role">Admin</span>
                        </div>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                      <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                      <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid patient_management_page py-4">
          <Tabs
            defaultActiveKey="today"
            activeKey={activeTab}
            onSelect={(tabKey) => setActiveTab(tabKey)}
            className="mb-3"
          >
            <Tab eventKey="today" title="Today Appointment">
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center mb-3">
                <h2 className="patient_management-title">Today Appointment</h2>
                <div className="patient_management-search-container">
                  <input
                    type="text"
                    value={searchTerms.today}
                    onChange={(e) => handleSearchChange(e, "today")}
                    placeholder="Search Patient"
                    className="form-control"
                  />
                  <img
                    src="/assets/images/search.svg"
                    alt="search"
                    className="search-icon"
                  />
                </div>
              </div>
              {renderAppointmentTable(allAppointments.today, searchTerms.today)}
            </Tab>
            <Tab eventKey="upcoming" title="Upcoming Appointment">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="patient_management-title">
                  Upcoming Appointment
                </h2>
                <div className="patient_management-search-container">
                  <input
                    type="text"
                    placeholder="Search Patient"
                    value={searchTerms.upcoming}
                    onChange={(e) => handleSearchChange(e, "upcoming")}
                    className="form-control"
                  />
                  <img
                    src="/assets/images/search.svg"
                    alt="search"
                    className="search-icon"
                  />
                </div>
              </div>
              {renderAppointmentTable(allAppointments.upcoming, searchTerms.upcoming)}
            </Tab>
            <Tab eventKey="previous" title="Previous Appointment">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="patient_management-title">
                  Previous Appointment
                </h2>
                <div className="patient_management-search-container">
                  <input
                    type="text"
                    placeholder="Search Patient"
                    value={searchTerms.previous}
                  onChange={(e) => handleSearchChange(e, "previous")}
                    className="form-control"
                  />
                  <img
                    src="/assets/images/search.svg"
                    alt="search"
                    className="search-icon"
                  />
                </div>
              </div>
              {renderAppointmentTable(allAppointments.previous, searchTerms.previous)}
            </Tab>
            <Tab eventKey="canceled" title="Cancel Appointment">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="patient_management-title">Cancel Appointment</h2>
                <div className="patient_management-search-container">
                  <input
                    type="text"
                    placeholder="Search Patient"
                    value={searchTerms.canceled}
                  onChange={(e) => handleSearchChange(e, "canceled")}
                    className="form-control"
                  />
                  <img
                    src="/assets/images/search.svg"
                    alt="search"
                    className="search-icon"
                  />
                </div>
              </div>
              {renderAppointmentTable(allAppointments.canceled, searchTerms.canceled)}
            </Tab>
          </Tabs>
        </div>
      </div>
      <PatientDetailsModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        patient={selectedPatient}
      />
    </div>
  );
};

export default PatientManagement;
