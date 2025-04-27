
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMobileNumber = (mobile: string): boolean => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, one letter, one number and one special character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateBarCouncilNumber = (number: string): boolean => {
  // This is a simple validation - you may need to adjust based on actual format
  return number.length >= 4;
};

export const validateRequiredField = (field: string): boolean => {
  return field !== undefined && field !== null && field.trim() !== '';
};

export const validateRequiredNumber = (field: string): boolean => {
  return field !== undefined && field !== null && field.trim() !== '' && !isNaN(parseInt(field, 10));
};

export const validateArray = (arr: string[]): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

export const validateFile = (file: File | null, required: boolean): boolean => {
  if (required && !file) return false;
  if (!file) return true;
  
  // Check file size (max 5MB)
  const maxSizeInBytes = 5 * 1024 * 1024;
  if (file.size > maxSizeInBytes) return false;
  
  return true;
};
