const nodemailer = require("nodemailer");

const sendSuccessMail = async (admission) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: admission.email,

    subject: "Admission Application Submitted Successfully",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width:650px;
        margin:auto;
        padding:20px;
        border:1px solid #ddd;
        border-radius:10px;
      ">

        <h2 style="color:#800020;">
          St. Paul's Matriculation School
        </h2>

        <hr/>

        <h3>
          Admission Application Received Successfully
        </h3>

        <p>
          Dear ${admission.parentName},
        </p>

        <p>
          Thank you for submitting the admission application.
          We have successfully received your application.
        </p>


        <h4>Application Details:</h4>

        <table 
          border="1"
          cellpadding="8"
          cellspacing="0"
          style="border-collapse:collapse;width:100%"
        >

          <tr>
            <td><b>Student Name</b></td>
            <td>${admission.studentName}</td>
          </tr>

          <tr>
            <td><b>Class Applied</b></td>
            <td>${admission.class}</td>
          </tr>

          <tr>
            <td><b>Academic Year</b></td>
            <td>${admission.academicYear}</td>
          </tr>

          <tr>
            <td><b>Application Status</b></td>
            <td>${admission.status}</td>
          </tr>

          <tr>
            <td><b>Submitted Date</b></td>
            <td>${new Date(admission.createdAt).toDateString()}</td>
          </tr>

        </table>


        <br/>

        <p>
          Our admission team will review your application 
          and contact you soon.
        </p>


        <p>
          Regards,<br/>
          <b>Admission Office</b><br/>
          St. Paul's Matriculation School
        </p>

      </div>
    `,
  });
};


module.exports = sendSuccessMail;