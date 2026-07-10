const nodemailer = require("nodemailer");

const sendAdmissionEmail = async (admission, files = []) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Upload attachments
    const attachments = (files || []).map((file) => ({
      filename: file.originalname,
      path: file.path,
    }));

    // ===========================
    // Send email to School
    // ===========================
    const schoolInfo = await transporter.sendMail({
      from: `"St. Paul's Matriculation School" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
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

        <p><strong>Address:</strong> ${admission.address || "-"}</p>
        <p><strong>Previous School:</strong> ${admission.previousSchool || "-"}</p>
        <p><strong>Academic Year:</strong> ${admission.academicYear || "-"}</p>
        <p><strong>Medical Information:</strong> ${admission.medicalInfo || "-"}</p>
      `,
      attachments,
    });

    console.log("✅ School mail sent:", schoolInfo.response);

    // ===========================
    // Send email to Parent
    // ===========================
    if (admission.email) {
      console.log("Sending parent email to:", admission.email);

      const parentInfo = await transporter.sendMail({
        from: `"St. Paul's Matriculation School" <${process.env.EMAIL_USER}>`,
        to: admission.email,
        subject: "Admission Application Submitted Successfully",
        html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #ddd;border-radius:10px;overflow:hidden">

          <div style="background:#800020;color:#fff;padding:20px;text-align:center">
            <h2 style="margin:0;">St. Paul's Matriculation School</h2>
            <p style="margin-top:8px;">Admission Confirmation</p>
          </div>

          <div style="padding:25px;line-height:1.8">

            <p>Dear <strong>${admission.parentName}</strong>,</p>

            <p>
              Thank you for submitting your child's admission application.
              We have successfully received your application.
            </p>

            <table style="width:100%;border-collapse:collapse">

              <tr>
                <td style="border:1px solid #ddd;padding:10px"><b>Student Name</b></td>
                <td style="border:1px solid #ddd;padding:10px">${admission.studentName}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:10px"><b>Class Applied</b></td>
                <td style="border:1px solid #ddd;padding:10px">${admission.class}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:10px"><b>Academic Year</b></td>
                <td style="border:1px solid #ddd;padding:10px">${admission.academicYear || "-"}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:10px"><b>Status</b></td>
                <td style="border:1px solid #ddd;padding:10px;color:green">
                  Pending Review
                </td>
              </tr>

            </table>

            <br>

            <p>
              Our Admission Team will review your application and contact you
              if any additional information is required.
            </p>

            <p>
              Thank you for choosing
              <strong>St. Paul's Matriculation School</strong>.
            </p>

            <br>

            <p>
              Regards,<br>
              <strong>Admission Office</strong><br>
              St. Paul's Matriculation School
            </p>

          </div>

          <div style="background:#f5f5f5;padding:12px;text-align:center;font-size:12px;color:#666">
            This is an automated email. Please do not reply.
          </div>

        </div>
        `,
      });

      console.log(" Parent mail sent:", parentInfo.response);
    } else {
      console.log(" Parent email is missing.");
    }
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

module.exports = sendAdmissionEmail;