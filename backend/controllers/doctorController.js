import doctorModel from "../models/doctorModel.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { doctors_data } from "../dataset/doctors.js"
const changeAvailablity = async (req, res) => {

  try {

    const { docId } = req.body
    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
    res.json({ success: true, message: 'Availablity Changed ' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

const doctorList = async (req, res) => {

  try {

    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// const seedDoctors = async () => {
//   try {

//     for (let doc of doctors_data) {
//       const email = `${doc.name.split(" ").join(".").toLowerCase()}@mail.com`;
//       const password = await bcrypt.hash("password123", 10); // Default password

//       const docObj = {
//           docId : doc.docId,
//         name: doc.name,
//         email,
//         password,
//         image: "frontend-only", // placeholder
//         speciality: doc.speciality,
//         degree: doc.degree,
//         experience: doc.experience,
//         about: doc.about,
//         fees: doc.fees,
//         address: doc.address,
//         available: true,
//         date: Date.now(),
//         slots_booked: {},
//       };

//       const existing = await doctorModel.findOne({ email });
//       if (!existing) {
//         await doctorModel.create(docObj);
//         console.log(`Inserted: ${doc.name}`);
//       } else {
//         console.log(`Skipped (exists): ${doc.name}`);
//       }
//     }

//     console.log("✅ Doctors seeding complete!");
//     mongoose.connection.close();
//   } catch (err) {
//     console.error("❌ Error seeding doctors:", err);
//     mongoose.connection.close();
//   }
// };

// seedDoctors();


export { changeAvailablity, doctorList }