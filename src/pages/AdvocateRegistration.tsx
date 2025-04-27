
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import FormHeader from "@/components/AdvocateRegistration/FormHeader";
import PersonalInfoSection from "@/components/AdvocateRegistration/PersonalInfoSection";
import ProfessionalInfoSection from "@/components/AdvocateRegistration/ProfessionalInfoSection";
import ExperienceSection from "@/components/AdvocateRegistration/ExperienceSection";
import AvailabilitySection from "@/components/AdvocateRegistration/AvailabilitySection";
import DocumentsSection from "@/components/AdvocateRegistration/DocumentsSection";
import AccountSection from "@/components/AdvocateRegistration/AccountSection";
import SubmitButton from "@/components/AdvocateRegistration/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import * as validators from "@/utils/validators";
import { registerAdvocate } from "@/services/advocateService";

const AdvocateRegistration = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Basic information
    fullName: "",
    mobileNumber: "",
    email: "",
    barCouncilNumber: "",
    experienceYears: "",
    consultationFee: "",
    practicingCourts: [] as string[],
    specializations: [] as string[],
    city: "",
    state: "",
    languages: [] as string[],
    
    // Detailed experience
    ongoingCases: "",
    notableCases: "",
    awards: "",
    publications: "",
    
    // Availability
    virtualConsultation: true,
    inPersonMeeting: true,
    availableDays: [] as string[],
    availableTimeSlots: [] as string[],
    consentProfileVisibility: false,
    
    // Account
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [files, setFiles] = useState({
    barIdProof: null as File | null,
    profilePicture: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field: string, value: string | boolean) => {
    if (typeof value === "boolean") {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => {
        const currentValues = prev[field as keyof typeof prev] as string[];
        if (Array.isArray(currentValues)) {
          if (currentValues.includes(value)) {
            return {
              ...prev,
              [field]: currentValues.filter((item) => item !== value),
            };
          } else {
            return {
              ...prev,
              [field]: [...currentValues, value],
            };
          }
        }
        return prev;
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle file changes
  const handleFileChange = (field: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  // Validate form fields and set errors
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Personal Info Validation
    if (!validators.validateRequiredField(formData.fullName)) {
      newErrors.fullName = "Full name is required";
    }

    if (!validators.validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = "Valid 10-digit mobile number is required";
    }

    if (!validators.validateEmail(formData.email)) {
      newErrors.email = "Valid email address is required";
    }

    if (!validators.validateBarCouncilNumber(formData.barCouncilNumber)) {
      newErrors.barCouncilNumber = "Valid Bar Council Registration Number is required";
    }

    if (!validators.validateRequiredNumber(formData.experienceYears)) {
      newErrors.experienceYears = "Years of experience is required";
    }

    if (
      formData.consultationFee !== "" &&
      !validators.validateRequiredNumber(formData.consultationFee)
    ) {
      newErrors.consultationFee = "Consultation fee must be a valid number";
    }

    // Professional Info Validation
    if (!validators.validateArray(formData.practicingCourts)) {
      newErrors.practicingCourts = "Select at least one practicing court";
    }

    if (!validators.validateArray(formData.specializations)) {
      newErrors.specializations = "Select at least one area of specialization";
    }

    if (!validators.validateRequiredField(formData.city)) {
      newErrors.city = "City is required";
    }

    if (!validators.validateRequiredField(formData.state)) {
      newErrors.state = "State is required";
    }

    // Document Validation
    if (!validators.validateFile(files.barIdProof, true)) {
      newErrors.barIdProof = "Bar Council ID proof is required (max 5MB)";
    }

    if (files.profilePicture && !validators.validateFile(files.profilePicture, false)) {
      newErrors.profilePicture = "Profile picture must be less than 5MB";
    }

    // Availability Validation
    if (!validators.validateArray(formData.availableDays)) {
      newErrors.availableDays = "Select at least one available day";
    }

    if (!validators.validateArray(formData.availableTimeSlots)) {
      newErrors.availableTimeSlots = "Select at least one available time slot";
    }

    if (!formData.consentProfileVisibility) {
      newErrors.consentProfileVisibility = "You must consent to profile visibility";
    }

    // Account Validation
    if (!validators.validatePassword(formData.password)) {
      newErrors.password = "Password must contain at least 8 characters, including letters, numbers, and special characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Form Validation Failed",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit the form data
      const response = await registerAdvocate({
        ...formData,
        ...files,
      });

      setSubmitStatus({
        success: true,
        message: response.message,
      });

      // Reset form after successful submission
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // This would validate fields on change in a real application
  useEffect(() => {
    // Only run live validation after the first submit attempt
    if (Object.keys(errors).length > 0) {
      validateForm();
    }
  }, [formData, files]);

  return (
    <div className="bg-dal-gray min-h-screen pb-12">
      <header className="bg-dal-blue py-4">
        <div className="dal-container">
          <h1 className="text-white text-2xl font-serif">Dhundho Apna Lawyer (DAL)</h1>
        </div>
      </header>

      <main className="dal-container py-8">
        {submitStatus && (
          <Alert
            variant={submitStatus.success ? "default" : "destructive"}
            className={`mb-6 ${
              submitStatus.success ? "bg-green-50 border-green-200" : ""
            }`}
          >
            {submitStatus.success ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <AlertTitle>
              {submitStatus.success ? "Registration Submitted" : "Registration Failed"}
            </AlertTitle>
            <AlertDescription>{submitStatus.message}</AlertDescription>
          </Alert>
        )}

        <FormHeader />

        <form onSubmit={handleSubmit} className="mt-6">
          <PersonalInfoSection
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />

          <ProfessionalInfoSection
            formData={formData}
            errors={errors}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectChange={handleSelectChange}
          />

          <ExperienceSection
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />

          <AvailabilitySection
            formData={formData}
            errors={errors}
            handleCheckboxChange={handleCheckboxChange}
          />

          <DocumentsSection
            files={files}
            errors={errors}
            handleFileChange={handleFileChange}
          />

          <AccountSection
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
          />

          <div className="mt-8 flex justify-center">
            <SubmitButton isLoading={isSubmitting} isValid={Object.keys(errors).length === 0} />
          </div>
        </form>
      </main>

      <footer className="bg-dal-blue text-white py-4 mt-12">
        <div className="dal-container text-center">
          <p>© {new Date().getFullYear()} Dhundho Apna Lawyer (DAL). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdvocateRegistration;
