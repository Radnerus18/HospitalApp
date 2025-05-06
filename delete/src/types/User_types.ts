export interface UserData {
    title: string;                // e.g. "mr", "mrs", "ms", "dr"
    fullName: string;
    dateOfBirth: string;          // e.g. "1990-01-01"
    age: number;
    gender: string;               // e.g. "male", "female", "other"
    photo: File | null;           // File object
    currentAddress: string;
    permanentAddress: string;
    contactNumber: string;
    email?: string;               // optional
    idProofType: string;          // e.g. "aadhar", "passport", "dl"
    idProofNumber: string;
    passportScan?: File | null;   // File object (optional)
    aadharScan?: File | null;     // File object (optional)
}