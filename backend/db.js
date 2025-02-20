import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Ensure table exists
async function initializeDatabase() {
  const connection = await db.getConnection();
  await connection.query(`
    CREATE TABLE IF NOT EXISTS resumes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      mobile VARCHAR(20),
      qualification VARCHAR(255),
      skills TEXT,
      projects TEXT,
      certifications TEXT,
      experience TEXT
    );
  `);
  connection.release();
}

initializeDatabase();


// 📌 Save Resume Data to Database
async function saveResumeData(data) {
  try {
    const query = `
      INSERT INTO resumes(name, email, mobile, qualification, skills, projects, certifications, experience)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [
      data.name,
      data.email,
      data.mobile,
      data.qualification,
      data.skills,  // Stored as comma-separated values
      data.projects,
      data.certifications,
      data.experience,
    ];

    const [result] = await db.query(query, values);
    console.log("✅ Resume Saved Successfully with ID:", result.insertId);
    return { id: result.insertId, ...data };
  } catch (err) {
    console.error("❌ Error in Saving Resume:", err);
    throw err;
  }
}

export { saveResumeData, db };
