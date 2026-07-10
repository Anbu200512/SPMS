const nodemailer = require("nodemailer");

const sendAdmissionEmail = async (admission, files = []) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const attachments = files.map((file) => ({
    filename: file.originalname,
    path: file.path,
  }));

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // School receives the admission
    subject: `New Admission - ${admission.studentName}`,
    html: `
      <h2>New Admission Application</h2>

      <p><strong>Student Name:</strong> ${admission.studentName}</p>
      <p><strong>Date of Birth:</strong> ${admission.dob}</p>
      <p><strong>Class:</strong> ${admission.class}</p>
      <p><strong>Gender:</strong> ${admission.gender}</p>

      <hr>

      <p><strong>Parent Name:</strong> ${admission.parentName}</p>
      <p><strong>Relationship:</strong> ${admission.relationship}</p>
      <p><strong>Phone:</strong> ${admission.phone}</p>
      <p><strong>Email:</strong> ${admission.email}</p>

      <hr>

      <p><strong>Address:</strong> ${admission.address}</p>
      <p><strong>Previous School:</strong> ${admission.previousSchool}</p>
      <p><strong>Academic Year:</strong> ${admission.academicYear}</p>
      <p><strong>Medical Information:</strong> ${admission.medicalInfo}</p>
    `,
    attachments,
  });
};

module.exports = sendAdmissionEmail;