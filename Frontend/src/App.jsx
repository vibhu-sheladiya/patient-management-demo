import React from "react";
import "./css/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Login from "./pages/AdminPanel/login/Login";
import Forgot_Password from "./pages/AdminPanel/ForgotPassword/Forgot_Password";
import Otp_screen from "./pages/AdminPanel/OtpScreen/Otp_screen";
import ResetPassword from "./pages/AdminPanel/ResetPassword/ResetPassword";
import AdminProfile from "./pages/AdminPanel/AdminProfile/AdminProfile";
import Register from "./pages/AdminPanel/Register/Register";
import Dashboard from "./pages/AdminPanel/Dashboard/Dashboard";
import DoctorLogin from "./pages/DoctorPanel/DoctorLogin/DoctorLogin";
import DoctorForgotPassword from "./pages/DoctorPanel/DoctorForgotPassword/DoctorForgotPassword";
import DoctorOtpScreen from "./pages/DoctorPanel/DoctorOtpScreen/DoctorOtpScreen";
import DoctorResetPassword from "./pages/DoctorPanel/DoctorResetPassword/DoctorResetPassword";
import PatientLogin from "./pages/PatientPanel/PatientLogin/PatientLogin";
import PatientForgotPassword from "./pages/PatientPanel/PatientForgotPassword/PatientForgotPassword";
import PatientOtpScreen from "./pages/PatientPanel/PatientOtpScreen/PatientOtpScreen";
import PatientResetPassword from "./pages/PatientPanel/PatientResetPassword/PatientResetPassword";
import PatientRegister from "./pages/PatientPanel/PatientRegister/PatientRegister";
import PendingBills from "./pages/AdminPanel/PendingBills/PendingBills";
import DoctorProfile from "./pages/DoctorPanel/DoctorProfile/DoctorProfile";
import PatientAppointment from "./pages/PatientPanel/PatientAppointment/PatientAppointment";
import PatientBookAppointment from "./pages/PatientPanel/PatientBookAppointment/PatientBookAppointment";
import InvoicePage from "./components/InvoicePage/InvoicePage";
import AppointmentTimeSlot from "./pages/PatientPanel/AppointmentTimeSlot/AppointmentTimeSlot";
import DoctorAppointment from "./pages/DoctorPanel/DoctorAppointment/DoctorAppointment";
import DoctorAppointmentTimeSlot from "./pages/DoctorPanel/DoctorAppointmentTimeSlot/DoctorAppointmentTimeSlot";
import PrescriptionAccess from "./pages/PatientPanel/PrescriptionAccess/PrescriptionAccess";
import PatientRecordAccess from "./pages/DoctorPanel/PatientRecordAccess/PatientRecordAccess";
import PatientDetails from "./pages/DoctorPanel/PatientDetails/PatientDetails";
import DoctorChat from "./components/DoctorChat/DoctorChat";
import DoctorMeetingConference from "./components/DoctorMeetingConference/DoctorMeetingConference";
import DoctorTeleconsultation from "./pages/DoctorPanel/DoctorTeleconsultation/DoctorTeleconsultation";
import PrescriptionToolsDetails from "./components/PrescriptionToolsDetails/PrescriptionToolsDetails";
import PrescriptionTools from "./pages/DoctorPanel/PrescriptionTools/PrescriptionTools";
import CreatePrescription from "./pages/DoctorPanel/CreatePrescription/CreatePrescription";
import PatientRecordFile from "./components/PatientRecordFile/PatientRecordFile";
import PrescriptionToolsManage from "./pages/DoctorPanel/PrescriptionToolsManage/PrescriptionToolsManage";
import PatientChat from "./components/PatientChat/PatientChat";
import PatientMeetingConference from "./components/PatientMeetingConference/PatientMeetingConference";
import DoctorTeleconsulationTimeSlot from "./pages/DoctorPanel/DoctorTeleconsulationTimeSlot/DoctorTeleconsulationTimeSlot";
import PatientTeleconsultation from "./pages/PatientPanel/PatientTeleconsultation/PatientTeleconsultation";
import PatientTeleconsulationTimeSlot from "./pages/PatientPanel/PatientTeleconsulationTimeSlot/PatientTeleconsulationTimeSlot";
import PatientBills from "./pages/PatientPanel/PatientBills/PatientBills";
import BillInvoicePage from "./components/BillInvoicePage/BillInvoicePage";
import PaidBillInvoicePage from "./components/PaidBillInvoicePage/PaidBillInvoicePage";
import PersonalHealthRecord from "./pages/PatientPanel/PersonalHealthRecord/PersonalHealthRecord";
import PatientDetailsEdit from "./pages/PatientPanel/PatientDetailsEdit/PatientDetailsEdit";
import PersonalHealthRecordPrescription from "./pages/PatientPanel/PersonalHealthRecordPrescription/PersonalHealthRecordPrescription";
import PersonalHealthTestReports from "./pages/PatientPanel/PersonalHealthTestReports/PersonalHealthTestReports";
import PersonalHealthMedicalRecord from "./pages/PatientPanel/PersonalHealthMedicalRecord/PersonalHealthMedicalRecord";
import PersonalHealthMedicalRecordDetails from "./pages/PatientPanel/PersonalHealthMedicalRecordDetails/PersonalHealthMedicalRecordDetails";
import BookingInvoice from "./components/BookingInvoice/BookingInvoice";
import ReportingAndAnalytics from "./pages/AdminPanel/ReportingAndAnalytics/ReportingAndAnalytics";
import DoctorManagement from "./pages/AdminPanel/DoctorManagement/DoctorManagement";
import AddDoctorForm from "./pages/AdminPanel/DoctorManagement/AddDoctorForm";
import EditDoctor from "./pages/AdminPanel/DoctorManagement/EditDoctor";
import PatientManagement from "./pages/AdminPanel/PatientManagement/PatientManagement";
import MonitorBilling from "./pages/AdminPanel/MonitorBilling/MonitorBilling";
import MonitorBillingInvoice from "./components/MonitorBillingInvoice/MonitorBillingInvoice";
import CreateBill from "./pages/AdminPanel/MonitorBilling/CreateBill/CreateBill";
import EditInvoiceDesign from "./pages/AdminPanel/MonitorBilling/EditInvoiceDesign/EditInvoiceDesign";
import SelectInvoiceTheme from "./pages/AdminPanel/MonitorBilling/SelectInvoiceTheme/SelectInvoiceTheme";
import InvoiceCreateBill from "./pages/AdminPanel/MonitorBilling/InvoiceCreateBill/InvoiceCreateBill";
import InsuranceClaims from "./pages/AdminPanel/InsuranceClaims/InsuranceClaims";
import InsuranceClaimsInvoice from "./pages/AdminPanel/InsuranceClaims/InsuranceClaimsInvoice/InsuranceClaimsInvoice";
import PaymentProcess from "./pages/AdminPanel/PaymentProcess/PaymentProcess";
import PaymentProcessEditBill from "./pages/AdminPanel/PaymentProcess/PaymentProcessEditBill/PaymentProcessEditBill";
import PaymentProcessInvoice from "./pages/AdminPanel/PaymentProcess/PaymentProcessInvoice/PaymentProcessInvoice";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/otp-verification" element={<Otp_screen />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/adminProfile" element={<AdminProfile />} />
        <Route path="/doctor-management" element={<DoctorManagement />} />
        <Route path="/patient-management" element={<PatientManagement />} />
        <Route path="/billing/monitor-billing" element={<MonitorBilling />} />
        <Route path="/billing/monitor-billing/invoice" element={<MonitorBillingInvoice />} />
        <Route path="/add-new-doctor" element={<AddDoctorForm />} />
        <Route path="/edit-doctor/:doctorId" element={<EditDoctor />} />
        <Route path="/billing/pandingbills" element={<PendingBills />} />
        <Route path="/billing/monitor-billing/pending-invoice" element={<BookingInvoice />} />
        <Route path="/billing/monitor-billing/createBill" element={<CreateBill />} />
        <Route path="/billing/monitor-billing/invoice-create-bill/:templateId" element={<InvoiceCreateBill />} />
        <Route path="/billing/monitor-billing/editInvoice" element={<EditInvoiceDesign />} />
        <Route path="/billing/monitor-billing/selectInvoiceTheme" element={<SelectInvoiceTheme />} />
        <Route path="/billing/insurance-claims" element={<InsuranceClaims />} />
        <Route path="/billing/insurance-claims/Invoice" element={<InsuranceClaimsInvoice />} />
        <Route path="/billing/payment-process" element={<PaymentProcess />} />
        <Route path="/billing/payment-process/edit" element={<PaymentProcessEditBill />} />
        <Route path="/billing/payment-process/invoice" element={<PaymentProcessInvoice />} />
        <Route path="/analytics" element={<ReportingAndAnalytics />} />
        {/* Doctor */}
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-forgot-password" element={<DoctorForgotPassword />} />
        <Route path="/doctor-otp-verification" element={<DoctorOtpScreen />} />
        <Route path="/doctor-reset-password" element={<DoctorResetPassword />} />
        <Route path="/doctorProfile" element={<DoctorProfile />} />
        <Route path="/doctorAppointmentManagement" element={<DoctorAppointment />} />
        <Route path="/doctorAppointmentTimeSlot" element={<DoctorAppointmentTimeSlot />} />
        <Route path="/doctorTeleconsulationAppointmentTimeSlot" element={<DoctorTeleconsulationTimeSlot />} />
        <Route path="/patientRecordAccess" element={<PatientRecordAccess />} />
        <Route path="/patientRecordFile" element={<PatientRecordFile />} />
        <Route path="/patientDetails" element={<PatientDetails />} />
        <Route path="/prescription-tools" element={<PrescriptionTools />} />
        <Route path="/prescription-tools/create/details" element={<PrescriptionToolsDetails />} />
        <Route path="/prescription-tools/create" element={<CreatePrescription />} />
        <Route path="/prescription-tools/manage" element={<PrescriptionToolsManage />} />
        <Route path="/doctorMeetingConference" element={<DoctorMeetingConference />} />
        <Route path="/doctorTeleconsultation" element={<DoctorTeleconsultation />} />
        <Route path="/doctor-chat" element={<DoctorChat />} />
        {/* Patient */}
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-forgot-password" element={<PatientForgotPassword />} />
        <Route path="/patient-otp-verification" element={<PatientOtpScreen />} />
        <Route path="/patient-reset-password" element={<PatientResetPassword />} />
        <Route path="/personalHealthRecord" element={<PersonalHealthRecord />} />
        <Route path="/patientDetailsEdit" element={<PatientDetailsEdit />} />
        <Route path="/personalHealthRecordPrescription" element={<PersonalHealthRecordPrescription />} />
        <Route path="/personalHealthTestReport" element={<PersonalHealthTestReports />} />
        <Route path="/personalHealthMedicalHistory" element={<PersonalHealthMedicalRecord />} />
        <Route path="/personalHealthMedicalHistoryDetails" element={<PersonalHealthMedicalRecordDetails />} />
        <Route path="/patientAppointment" element={<PatientAppointment />} />
        <Route path="/patientBookAppointment" element={<PatientBookAppointment />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/billInvoice" element={<BillInvoicePage />} />
        <Route path="/paidBillInvoice" element={<PaidBillInvoicePage />} />
        <Route path="/appointmentTimeSlot" element={<AppointmentTimeSlot />} />
        <Route path="/patientTeleconsulationAppointmentTimeSlot" element={<PatientTeleconsulationTimeSlot />} />
        <Route path="/prescriptionAccess" element={<PrescriptionAccess />} />
        <Route path="/patientMeetingConference" element={<PatientMeetingConference />} />
        <Route path="/patientTeleconsultationAccess" element={<PatientTeleconsultation />} />
        <Route path="/patient-chat" element={<PatientChat />} />
        <Route path="/bills" element={<PatientBills />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
