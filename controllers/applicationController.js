import Application from "../models/applicationModel.js";
import Pet from "../models/petModel.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import asyncHandler from "../middlewares/asyncHandler.js";

export const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message, petId, appointment } = req.body;

  const pet = await Pet.findById(petId).populate("createdBy", "email");
  if (!pet) {
    return res.status(404).json({ message: "Pet not found" });
  }

  const shelterUser = pet.createdBy;
  if (!shelterUser || !shelterUser.email) {
    return res
      .status(404)
      .json({ message: "Shelter user not found for this pet." });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User (Admin) not found" });
  }

  
  const newApplication = new Application({
    pet: petId,
    user: req.user._id,
    message,
    status: "Pending",
    appointment, 
  });

  await newApplication.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${email}`,
    to: shelterUser.email,
    subject: `Inquiry about ${pet.name} - ${subject}`,
    text: `
      You have received a message regarding the pet "${pet.name}".

      From: ${name} (${email})
      Subject: ${subject}

      Message:
      ${message}

      Pet Details:
      Name: ${pet.name}
      Breed: ${pet.breed}
      Description: ${pet.description}

      Application Details:
      Status: ${newApplication.status}
      User ID: ${req.user._id}

      Appointment Details:
      Date & Time: ${appointment}
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      return res.status(500).json({ message: "Failed to send email." });
    }

    res.status(200).json({
      message: "Application submitted and email sent successfully!",
      application: newApplication,
    });
  });
});
