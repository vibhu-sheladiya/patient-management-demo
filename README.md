📋 Patient Management Demo
🏥 Healthcare Management System
Overview
This Healthcare Management System is a web application designed to facilitate efficient management of healthcare services. The system allows different user roles, including Admin, Doctor, and Patient, to perform various tasks and communicate seamlessly using technologies like Socket.IO and PayPal for payments.

Features
👨‍💼 Admin Features
Create Hospitals: Admin can add new hospitals to the system. 🏥
Manage Doctors: Admin can create, update, or remove doctor profiles. 🩺
Manage Patients: Admin can create, update, or remove patient profiles. 👩‍⚕️
View Reports: Admin can view reports and statistics related to hospitals, doctors, and patients. 📊
👨‍⚕️ Doctor Features
Manage Patients: Doctors can view their patients' profiles, update details, and manage appointments. 📋
Create Prescriptions: Doctors can create and manage prescriptions for their patients. 💊
Chat: Real-time chat functionality with patients using Socket.IO. 💬
Audio and Video Calls: Conduct audio and video consultations with patients using Socket.IO. 📞
Manage Test Reports: Doctors can edit and manage test reports related to their patients. 📝
Edit Appointments: Doctors can edit appointment details as needed. 📅
👩‍⚕️ Patient Features
Create Account: Patients can create their own accounts to access the system. 🆕
Book Appointments: Patients can schedule appointments with doctors. 📅
Chat: Patients can communicate with their doctors in real-time using Socket.IO. 💬
Audio and Video Calls: Patients can have audio and video consultations with doctors through Socket.IO. 📞
Payment Integration: Patients can make payments for consultations using PayPal. 💳
Technologies Used
Frontend: HTML, CSS, JavaScript (React/Vue/Angular) 🌐
Backend: Node.js, Express 🚀
Database: MongoDB 🗄️
Real-time Communication: Socket.IO ⚡
Payment Integration: PayPal API 💵
Installation
Prerequisites
Node.js 🌳
MongoDB 🐱‍🏍
npm or yarn 📦
Steps to Run the Application
Clone the repository:

bash
Copy code
git clone https://github.com/vibhu-sheladiya/patient-management-demo
Navigate to the project directory:

bash
Copy code
cd patient-management-demo
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add the following environment variables:

plaintext
Copy code
MONGODB_URI=your_mongodb_connection_string
PAYPAL_CLIENT_ID=your_paypal_client_id
PORT=5000
Start the server:

bash
Copy code
npm start
Open your browser and navigate to http://localhost:9500 to access the application. 🌍

Usage
Admin: Log in as an admin to create hospitals, manage doctors, and patients. 🏢
Doctor: Log in as a doctor to manage your patients and conduct consultations. 🩺
Patient: Sign up to create an account, book appointments, and chat with doctors. 👥
Contributing
If you would like to contribute to this project, please follow these steps:

Fork the repository. 🍴
Create a new branch (git checkout -b feature/YourFeature). 🌿
Make your changes and commit them (git commit -m 'Add some feature'). 📝
Push to the branch (git push origin feature/YourFeature). ⬆️
Open a pull request. 📬
