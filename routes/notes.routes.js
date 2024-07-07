const express = require("express");

const router = express.Router();
const studentsController = require("../controllers/notes.controller"); // Ensure correct path

// Define routes
router.get("/get-students", studentsController.getStudents);
router.get("/get-student/:id", studentsController.getStudentById);
router.post("/create-student/", studentsController.createStudent);
router.put("/update-student/:id", studentsController.updateStudent);
router.delete("/delete-student/:id", studentsController.deleteStudent);

module.exports = router;
