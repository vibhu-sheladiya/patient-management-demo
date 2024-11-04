
/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();

// const { singleFileUpload } = require("../../../../helpers/upload");
const {   billCreateController, billPatientFlowController } = require("../../../controllers");
const { singleFileUpload } = require("../../../helpers/upload");



/* -------------------------- CREATE/SIGNUP DOCTOR ----------- */
router.post("/create-bill", billCreateController.createBill);

router.get("/list-bill", billCreateController.monitorBill);
router.get("/list-bill-search-patient", billCreateController.searchPatient);
router.get("/list-bill-view", billCreateController.billView);

// router.put("/hospital-bill-update-logo",  singleFileUpload('/hospitalImg', 'hospital_logo'), billCreateController.updateHospitalLogo);
// router.put("/hospital-bill-update", billCreateController.updateBill);
// router.put("/hospital-bill-update-hospital", billCreateController.updateHospital);



// in patient pannel of Bill
router.get("/list-bill-view-unpaid", billPatientFlowController.billViewOfUnpaid);
router.get("/list-bill-view-paid", billPatientFlowController.billViewOfPaid);





module.exports = router;
