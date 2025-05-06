import React, { useState } from "react";
import { UserData } from "../types/User_types";
import axios from "axios";
const NewUser = () => {
        const userData: UserData = {
        title: "",                
        fullName: "",
        dateOfBirth: "",          
        age: 0,
        gender: "",               
        photo: null,              
        currentAddress: "",
        permanentAddress: "",
        contactNumber: "",
        email: "",                
        idProofType: "",          
        idProofNumber: "",
        passportScan: null,       
        aadharScan: null          
    };
      const [formData,setFormData] = useState(userData)
      const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value
        })
      }
      const handleDataSubmit = async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        try {
            const PostData = await axios.post("http://localhost:3000/new-user",formData)
            console.log(PostData.data)
        } catch (error) {
            console.log('Error in Posting new User data',error)
        }
      }
  return (
    <div className="max-w-4xl mx-auto p-6">        
      <form className="space-y-6 bg-white p-6 shadow-lg rounded-lg">
        {/* Title and Full Name */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-red-600">Title *</label>
            <select required onChange={(e)=>handleFormData(e)} id="title" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select title</option>
              <option value="mr">Mr.</option>
              <option value="mrs">Mrs.</option>
              <option value="ms">Ms.</option>
              <option value="dr">Dr.</option>
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="fullName" className="text-sm font-medium text-red-600">Full Name *</label>
            <input required onChange={(e)=>handleFormData(e)} id="fullName" type="text" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter full name" />
          </div>
        </div>

        {/* DOB, Age, DOB not defined */}
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="dob" className="text-sm font-medium text-red-600">Date of Birth *</label>
            <input required onChange={(e)=>handleFormData(e)} id="dob" type="date" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Age</label>
            <div className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-blue-600">25 years</div>
          </div>
        </div>

        {/* Gender and Photo */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="gender" className="text-sm font-medium text-red-600">Gender *</label>
            <select required onChange={(e)=>handleFormData(e)} id="gender" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="relative">
                <label htmlFor="photo" className="text-sm font-medium text-gray-700">Photo (Capture/Upload)</label>
                <label
                    htmlFor="upload"
                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                >
                    Choose file
                </label>
                <input required onChange={(e)=>handleFormData(e)} id="photo" type="file" accept="image/*" className="hidden" />
          </div>          
        </div>

        {/* Addresses */}
        <div>
          <label htmlFor="currentAddress" className="text-sm font-medium text-red-600">Current Address *</label>
          <textarea required onChange={(e)=>handleFormData(e)} id="currentAddress" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter current address" />
        </div>
        <div>
          <label htmlFor="permanentAddress" className="text-sm font-medium text-gray-700">Permanent Address</label>
          <textarea required onChange={(e)=>handleFormData(e)} id="permanentAddress" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter permanent address" />
        </div>

        {/* Contact and Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact" className="text-sm font-medium text-red-600">Contact Number *</label>
            <input required onChange={(e)=>handleFormData(e)} id="contact" type="tel" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter contact number" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</label>
            <input required onChange={(e)=>handleFormData(e)} id="email" type="email" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter email" />
          </div>
        </div>

        {/* ID Proof */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="idType" className="text-sm font-medium text-gray-700">ID Proof Type</label>
            <select required id="idType" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select ID Type</option>
              <option value="aadhar">Aadhar</option>
              <option value="passport">Passport</option>
              <option value="dl">Driving License</option>
            </select>
          </div>
          <div>
            <label htmlFor="idNumber" className="text-sm font-medium text-gray-700">ID Proof Number</label>
            <input required onChange={(e)=>handleFormData(e)} id="idNumber" type="text" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter ID number" />
          </div>
        </div>

        {/* Scans */}
        <div className="grid grid-cols-2 gap-4">
            <div className="relative">
                <label htmlFor="passportScan" className="text-sm font-medium text-gray-700">Passport Scan (Foreign Patients)</label>
                <label
                    htmlFor="passportScanUpload"
                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                >
                    Choose file
                </label>
                <input required onChange={(e)=>handleFormData(e)} id="passportScanUpload" type="file" accept="image/*" className="hidden" />
            </div>
            <div className="relative">
                <label htmlFor="aadharScan" className="text-sm font-medium text-gray-700">Aadhar Scan</label>
                <label
                    htmlFor="aadharScanUpload"
                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                >
                    Choose file
                </label>
                <input required onChange={(e)=>handleFormData(e)} id="aadharScanUpload" type="file" accept="image/*" className="hidden" />
            </div>
        </div>

        {/* Payment Mode */}
        {/* <div>
          <label className="text-sm font-medium text-red-600">Payment Mode *</label>
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
          <button onClick={handleDataSubmit} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Register</button>
          <button type="reset" className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Reset</button>
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Cancel</button>
        </div>

        {/* Note for mandatory fields */}
        <p className="text-xs text-red-600 italic">* indicates mandatory fields</p>
      </form>
    </div>
  )
}

export default NewUser