
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormError } from "./FormError";

interface PersonalInfoProps {
  formData: {
    fullName: string;
    mobileNumber: string;
    email: string;
    barCouncilNumber: string;
    experienceYears: string;
    consultationFee: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoProps> = ({
  formData,
  errors,
  handleChange,
}) => {
  return (
    <Card className="dal-section">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-dal-blue">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="dal-form-group">
          <Label htmlFor="fullName" className="required-field">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? "border-red-500" : ""}
          />
          <FormError error={errors.fullName} />
        </div>

        <div className="dal-form-group">
          <Label htmlFor="mobileNumber" className="required-field">
            Mobile Number
          </Label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="10 digits mobile number"
            className={errors.mobileNumber ? "border-red-500" : ""}
          />
          <FormError error={errors.mobileNumber} />
          {!errors.mobileNumber && formData.mobileNumber.length === 10 && (
            <div className="text-xs text-gray-500 mt-1">
              An OTP will be sent for verification on submission
            </div>
          )}
        </div>

        <div className="dal-form-group">
          <Label htmlFor="email" className="required-field">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
          />
          <FormError error={errors.email} />
        </div>

        <div className="dal-form-group">
          <Label htmlFor="barCouncilNumber" className="required-field">
            Bar Council Registration Number
          </Label>
          <Input
            id="barCouncilNumber"
            name="barCouncilNumber"
            value={formData.barCouncilNumber}
            onChange={handleChange}
            className={errors.barCouncilNumber ? "border-red-500" : ""}
          />
          <FormError error={errors.barCouncilNumber} />
        </div>

        <div className="dal-form-group">
          <Label htmlFor="experienceYears" className="required-field">
            Years of Experience
          </Label>
          <Input
            id="experienceYears"
            name="experienceYears"
            type="number"
            min="0"
            value={formData.experienceYears}
            onChange={handleChange}
            className={errors.experienceYears ? "border-red-500" : ""}
          />
          <FormError error={errors.experienceYears} />
        </div>

        <div className="dal-form-group">
          <Label htmlFor="consultationFee">
            Consultation Fee (₹)
          </Label>
          <Input
            id="consultationFee"
            name="consultationFee"
            type="number"
            min="0"
            value={formData.consultationFee}
            onChange={handleChange}
            placeholder="Leave blank if variable"
            className={errors.consultationFee ? "border-red-500" : ""}
          />
          <FormError error={errors.consultationFee} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
