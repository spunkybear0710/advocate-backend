
import React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormError } from "./FormError";

interface ProfessionalInfoProps {
  formData: {
    practicingCourts: string[];
    specializations: string[];
    city: string;
    state: string;
    languages: string[];
  };
  errors: Record<string, string>;
  handleCheckboxChange: (field: string, value: string) => void;
  handleSelectChange: (field: string, value: string) => void;
}

const courts = ["District Court", "High Court", "Supreme Court"];
const specializations = [
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Civil Law",
  "Constitutional Law",
  "Intellectual Property",
  "Tax Law",
  "Labor Law",
  "Real Estate Law",
];
const languages = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Odia",
  "Punjabi",
  "Malayalam",
  "Assamese",
];
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
];

const ProfessionalInfoSection: React.FC<ProfessionalInfoProps> = ({
  formData,
  errors,
  handleCheckboxChange,
  handleSelectChange,
}) => {
  return (
    <Card className="dal-section">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-dal-blue">Professional Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="dal-form-group mb-6">
          <Label className="required-field mb-2 block">Practicing Courts</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {courts.map((court) => (
              <div key={court} className="flex items-center space-x-2">
                <Checkbox
                  id={`court-${court}`}
                  checked={formData.practicingCourts.includes(court)}
                  onCheckedChange={() => handleCheckboxChange("practicingCourts", court)}
                />
                <Label htmlFor={`court-${court}`} className="cursor-pointer">
                  {court}
                </Label>
              </div>
            ))}
          </div>
          <FormError error={errors.practicingCourts} />
        </div>

        <div className="dal-form-group mb-6">
          <Label className="required-field mb-2 block">Areas of Specialization</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {specializations.map((specialization) => (
              <div key={specialization} className="flex items-center space-x-2">
                <Checkbox
                  id={`spec-${specialization}`}
                  checked={formData.specializations.includes(specialization)}
                  onCheckedChange={() => handleCheckboxChange("specializations", specialization)}
                />
                <Label htmlFor={`spec-${specialization}`} className="cursor-pointer">
                  {specialization}
                </Label>
              </div>
            ))}
          </div>
          <FormError error={errors.specializations} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="dal-form-group">
            <Label htmlFor="city" className="required-field">
              City
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("city", value)}
              value={formData.city}
            >
              <SelectTrigger id="city" className={errors.city ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Kolkata">Kolkata</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                <SelectItem value="Jaipur">Jaipur</SelectItem>
                <SelectItem value="Lucknow">Lucknow</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormError error={errors.city} />
          </div>

          <div className="dal-form-group">
            <Label htmlFor="state" className="required-field">
              State
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("state", value)}
              value={formData.state}
            >
              <SelectTrigger id="state" className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormError error={errors.state} />
          </div>
        </div>

        <div className="dal-form-group mt-4">
          <Label className="mb-2 block">Languages Spoken</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${language}`}
                  checked={formData.languages.includes(language)}
                  onCheckedChange={() => handleCheckboxChange("languages", language)}
                />
                <Label htmlFor={`lang-${language}`} className="cursor-pointer">
                  {language}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalInfoSection;
