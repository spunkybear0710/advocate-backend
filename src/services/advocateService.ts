
// This is a mock service that simulates API calls
// In a real app, these would make actual HTTP requests to your backend

interface AdvocateRegistrationData {
  fullName: string;
  mobileNumber: string;
  email: string;
  barCouncilNumber: string;
  experienceYears: string;
  consultationFee: string;
  practicingCourts: string[];
  specializations: string[];
  city: string;
  state: string;
  languages: string[];
  password: string;
  barIdProof: File | null;
  profilePicture: File | null;
}

export const registerAdvocate = async (data: AdvocateRegistrationData): Promise<{ success: boolean; message: string }> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock validation for duplicate email/mobile/bar number
  if (data.email === "test@example.com") {
    throw new Error("This email is already registered");
  }
  
  if (data.mobileNumber === "9999999999") {
    throw new Error("This mobile number is already registered");
  }
  
  if (data.barCouncilNumber === "BAR12345") {
    throw new Error("This Bar Council Number is already registered");
  }
  
  // Mock successful registration
  return {
    success: true,
    message: "Registration submitted successfully. Your application is under review.",
  };
};

export const verifyMobileOTP = async (mobile: string, otp: string): Promise<boolean> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock OTP verification - always succeeds if OTP is "123456"
  return otp === "123456";
};
