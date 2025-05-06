import React, { useState } from "react";
import { UserData } from "../types/User_types";
import axios from "axios";
import { Camera, X } from "lucide-react";
import WebcamCapture from "./PhotoCapture";
import Otpverify from "./Otp-verify";
import { ToastContainer, toast } from "react-toastify";

const NewUser = () => {
  const userData: UserData = {
    title: "",
    fullName: "",
    dateOfBirth: "",
    age: 0,
    gender: "",
    photo: null,
    photoCaptured: null,
    currentAddress: "",
    permanentAddress: "",
    contactNumber: "",
    email: "",
    idProofType: "",
    idProofNumber: "",
    citizenship: "",
    IDScanUpload: null,
  };
  const [isNRI, setIsNRI] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [takePhoto, setTakePhoto] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [verified, setVerified] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContactNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handleFormData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleDataSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("formdata", formData);
    try {
      const hasEmptyFields = Object.values(formData).some(
        (value) => value === null || value === ""
      );

      if (hasEmptyFields) {
        setErrorMsg(true);
        toast.error("All fields required");
        return;
      }

      if (!validateEmail(formData.email)) {
        toast.error("Invalid email format");
        return;
      }

      if (!validateContactNumber(formData.contactNumber)) {
        toast.error("Invalid contact number");
        return;
      }

      setVerifyOtp(true);
      try {
        const PostData = await axios.post(
          import.meta.env.VITE_SEND_OTP_URL,
          { email: formData.email }
        );
        console.log(PostData.data);
      } catch (error) {
        console.error("Error in Posting new User data", error);
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in Posting new User data", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handlePhotoCaptureOpen = () => {
    setTakePhoto(true);
  };

  const handleClose = () => {
    setTakePhoto(false);
    setVerifyOtp(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
        {/* Title and Full Name */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-[#00008B]"
            >
              Title *
            </label>
            <select
              onChange={(e) => handleFormData(e)}
              id="title"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select title</option>
              <option value="mr">Mr.</option>
              <option value="mrs">Mrs.</option>
              <option value="ms">Ms.</option>
              <option value="dr">Dr.</option>
            </select>
            {(formData.title === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Title is required.</p>
            )}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-[#00008B]"
            >
              Full Name *
            </label>
            <input
              onChange={(e) => handleFormData(e)}
              id="fullName"
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter full name"
            />
            {(formData.fullName === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">FullName is required.</p>
            )}
          </div>
        </div>

        {/* DOB, Age, DOB not defined */}
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="dob" className="text-sm font-medium text-[#00008B]">
              Date of Birth *
            </label>
            <input
              onChange={(e) => handleFormData(e)}
              id="dateOfBirth"
              type="date"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {(formData.dateOfBirth === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Date of Birth is required.</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-[#00008B]">Age</label>
            <div className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-blue-600">
              25 years
            </div>
            {(formData.age === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Age is required.</p>
            )}
          </div>
        </div>

        {/* Gender and Photo */}
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label
              htmlFor="gender"
              className="text-sm font-medium text-[#00008B]"
            >
              Gender *
            </label>
            <select
              onChange={(e) => handleFormData(e)}
              id="gender"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {(formData.gender === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Gender is required.</p>
            )}
          </div>
          <div className={`relative `}>
            <label
              htmlFor="photo"
              className="text-sm font-medium text-[#00008B]"
            >
              Photo (Capture/Upload) *
            </label>
            <label
              htmlFor="photo"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 cursor-pointer hover:bg-gray-200"
              style={{ maxHeight: "42px", overflow: "auto" }}
            >
              {formData.photo
              ? typeof formData.photo === "string"
                ? formData.photo.split("\\").pop()
                : formData.photo.name
              : "Upload photo"}
            </label>
            <input
              onChange={(e) => handleFormData(e)}
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
            />
            {(formData.photo === null && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Photo is required.</p>
            )}
          </div>
          
          <div className={`w-[100px] h-[50px] relative flex items-center justify-center`}>
            {
              !formData.photoCaptured ? (<button
                type="button"
                className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white shadow"
                title="Capture / Upload Photo"
              ><Camera size={18} onClick={handlePhotoCaptureOpen}/></button>) : (<div><img src={typeof formData.photoCaptured === "string" ? formData.photoCaptured : formData.photoCaptured ? URL.createObjectURL(formData.photoCaptured) : ""} alt="Captured" /></div>)
            }
            
          </div>
        </div>

        {/* Addresses */}
        <div>
          <label
            htmlFor="currentAddress"
            className="text-sm font-medium text-[#00008B]"
          >
            Current Address *
          </label>
          <textarea
            onChange={(e) => handleFormData(e)}
            id="currentAddress"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter current address"
          />
          {(formData.currentAddress === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Current Address is required.</p>
            )}
        </div>
        <div>
          <label
            htmlFor="permanentAddress"
            className="text-sm font-medium text-[#00008B]"
          >
            Permanent Address
          </label>
          <textarea
            onChange={(e) => handleFormData(e)}
            id="permanentAddress"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter permanent address"
          />
          {(formData.permanentAddress === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Permanent Address is required.</p>
            )}
        </div>

        {/* Contact and Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contactNumber"
              className="text-sm font-medium text-[#00008B]"
            >
              Contact Number *
            </label>
            <input
              onChange={(e) => handleFormData(e)}
              id="contactNumber"
              type="tel"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter contact number"
            />
            {(formData.contactNumber === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Contact is required.</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#00008B]"
            >
              Email
            </label>
            <input
              onChange={(e) => handleFormData(e)}
              id="email"
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email"
            />
            {(formData.email === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Email is required.</p>
            )}
          </div>
        </div>
        {/* Citizenship Status */}
        <div>
          <label className="text-sm font-medium text-[#00008B]">
            Citizenship Status *
          </label>
          <div className="mt-2 flex space-x-4">
            <label className="inline-flex items-center text-gray-700">
              <input
                type="radio"
                name="citizenship"
                value="Indian"
                onChange={(e) => {
                  setFormData({ ...formData, citizenship: e.target.value });
                  setIsNRI(false);
                }}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Indian</span>
              
            </label>
            <label className="inline-flex items-center text-gray-700">
              <input
                type="radio"
                name="citizenship"
                value="NRI"
                onChange={(e) => {
                  setFormData({ ...formData, citizenship: e.target.value });
                  setIsNRI(true);
                }}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">NRI</span>
              
            </label>
            {(formData.citizenship === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">Citizenship is required.</p>
            )}
          </div>
        </div>
        {/* ID Proof */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="idProofType"
              className="text-sm font-medium text-[#00008B]"
            >
              ID Proof Type *
            </label>
            <select
              id="idProofType"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleFormData(e)}
            >
              <option value="">Select ID Type</option>
              <option value="aadhar" className={isNRI ? "hidden" : ""}>
                Aadhar
              </option>
              <option value="passport">Passport</option>
              <option value="dl">Driving License</option>
            </select>
            {(formData.idProofType === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">ID required.</p>
            )}
          </div>
          <div>
            <label
              htmlFor="idProofNumber"
              className="text-sm font-medium text-[#00008B]"
            >
              ID Proof Number *
            </label>
            <input
              onChange={(e) => handleFormData(e)}
              id="idProofNumber"
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter ID number"
            />
            {(formData.idProofNumber === "" && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">ID Number is required.</p>
            )}
          </div>
        </div>

        {/* Scans */}
        <div className="grid grid-cols-2 gap-4">
          
          <div className={`relative ${isNRI ? "hidden" : ""} `}>
            <label
              htmlFor="IDScan"
              className="text-sm font-medium text-[#00008B]"
            >
              ID Scan
            </label>
            <label
              htmlFor="IDScanUpload"
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 cursor-pointer hover:bg-gray-200"
            >
              {
                formData.IDScanUpload ? typeof formData.IDScanUpload == 'string'? formData.IDScanUpload.split('\\').pop():formData.IDScanUpload.name:'Choose File'
              }
            </label>
            <input
              onChange={(e) => handleFormData(e)}
              id="IDScanUpload"
              type="file"
              accept="image/*"
              className="hidden"
            />
            {(formData.IDScanUpload === null && errorMsg) && (
              <p className="text-red-500 text-xs mt-1">ID upload is required.</p>
            )}
          </div>
        </div>

        {/* Payment Mode */}
        {/* <div>
          <label className="text-sm font-medium text-[#00008B]">Payment Mode *</label>
        <div className="mt-2 flex space-x-4">
            <label className="inline-flex items-center text-gray-700">
                <input type="radio" name="payment" className="form-radio text-blue-500" /> 
                <span className="ml-2">UPI</span>
            </label>
            <label className="inline-flex items-center text-gray-700">
                <input type="radio" name="payment" className="form-radio text-blue-500" /> 
                <span className="ml-2">Net Banking</span>
            </label>
            <label className="inline-flex items-center text-gray-700">
                <input type="radio" name="payment" className="form-radio text-blue-500" /> 
                <span className="ml-2">Card</span>
            </label>
            <label className="inline-flex items-center text-gray-700">
                <input type="radio" name="payment" className="form-radio text-blue-500" /> 
                <span className="ml-2">Cash</span>
            </label>
        </div>
        </div> */}
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={handleDataSubmit}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Register
          </button>
        </div>

        {/* Note for mandatory fields */}
        <p className="text-xs text-[#00008B] italic">
          * indicates mandatory fields
        </p>
      </form>
      {takePhoto ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <X
              className="text-black-500 cursor-pointer m-1"
              style={{ float: "right" }}
              onClick={handleClose}
            />
            <WebcamCapture
              imgUrl={(capturedPhoto) =>
                setFormData({ ...formData, photoCaptured: capturedPhoto })
              }
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />

      {verifyOtp && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <X
              className={`text-black-500 cursor-pointer m-1 ${
                verified && "hidden"
              }`}
              style={{ float: "right" }}
              onClick={handleClose}
            />
            <Otpverify
              formData={formData}
              email={formData.email}
              isVerified={(yes) => setVerified(yes)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUser;
