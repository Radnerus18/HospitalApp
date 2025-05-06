export interface UserData {
    title: string;                // e.g. "mr", "mrs", "ms", "dr"
    fullName: string;
    dateOfBirth: string;          // e.g. "1990-01-01"
    age: number | string;
    gender: string;               // e.g. "male", "female", "other"
    photo: string|File | null;           // File object
    photoCaptured: string | File | null;  
    currentAddress: string;
    permanentAddress: string;
    contactNumber: string;
    email: string;               // optional
    citizenship:string;
    idProofType: string;          // e.g. "aadhar", "passport", "dl"
    idProofNumber: string;
    IDScanUpload: File | null|string;     // File object (optional)
}