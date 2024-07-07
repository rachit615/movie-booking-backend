const pool = require("../config/db");

exports.getStudents = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM STUDENTS`);
    res.status(200).json({ students: rows });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await pool.query(`SELECT * FROM STUDENTS WHERE ID=?`, [id]);
    res.status(200).json({ student: row });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { grade, name, address, contact } = req.body;
    console.log(req.body);
    const [result] = await pool.query(
      `INSERT INTO STUDENTS (grade, name, address, contact) VALUES (?, ?, ?, ?)`,
      [grade, name, address, contact]
    );
    res.status(200).send("student has been created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade, name, address, contact } = req.body;
    const [result] = await pool.query(
      `UPDATE STUDENTS SET grade=?, name=?, address=?, contact=? where id=?`,
      [grade, name, address, contact, id]
    );
    res.status(200).send("student has been updated");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`DELETE FROM STUDENTS WHERE ID=?`, [id]);
    res.status(200).send("student has been deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
};
