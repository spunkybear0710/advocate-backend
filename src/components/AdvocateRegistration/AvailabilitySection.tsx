
import React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormError } from "./FormError";

interface AvailabilitySectionProps {
  formData: {
    virtualConsultation: boolean;
    inPersonMeeting: boolean;
    availableDays: string[];
    availableTimeSlots: string[];
    consentProfileVisibility: boolean;
  };
  errors: Record<string, string>;
  handleCheckboxChange: (field: string, value: string | boolean) => void;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  formData,
  errors,
  handleCheckboxChange,
}) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = ["Morning (9AM-12PM)", "Afternoon (12PM-4PM)", "Evening (4PM-8PM)"];

  return (
    <Card className="dal-section">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-dal-blue">Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="dal-form-group">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="virtualConsultation"
                checked={formData.virtualConsultation}
                onCheckedChange={(checked) => 
                  handleCheckboxChange("virtualConsultation", !!checked)
                }
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="virtualConsultation" className="cursor-pointer">
                  Available for Virtual Consultation
                </Label>
                <p className="text-sm text-muted-foreground">
                  Clients can consult with you via video call or phone
                </p>
              </div>
            </div>
          </div>

          <div className="dal-form-group">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="inPersonMeeting"
                checked={formData.inPersonMeeting}
                onCheckedChange={(checked) => 
                  handleCheckboxChange("inPersonMeeting", !!checked)
                }
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="inPersonMeeting" className="cursor-pointer">
                  Available for In-Person Meetings
                </Label>
                <p className="text-sm text-muted-foreground">
                  Clients can meet you in person at your office
                </p>
              </div>
            </div>
          </div>

          <div className="dal-form-group">
            <Label className="mb-2 block">Available Days</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {days.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day}`}
                    checked={formData.availableDays.includes(day)}
                    onCheckedChange={() => handleCheckboxChange("availableDays", day)}
                  />
                  <Label htmlFor={`day-${day}`} className="cursor-pointer">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
            <FormError error={errors.availableDays} />
          </div>

          <div className="dal-form-group">
            <Label className="mb-2 block">Available Time Slots</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <div key={slot} className="flex items-center space-x-2">
                  <Checkbox
                    id={`slot-${slot}`}
                    checked={formData.availableTimeSlots.includes(slot)}
                    onCheckedChange={() => handleCheckboxChange("availableTimeSlots", slot)}
                  />
                  <Label htmlFor={`slot-${slot}`} className="cursor-pointer">
                    {slot}
                  </Label>
                </div>
              ))}
            </div>
            <FormError error={errors.availableTimeSlots} />
          </div>

          <div className="dal-form-group">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consentProfileVisibility"
                checked={formData.consentProfileVisibility}
                onCheckedChange={(checked) => 
                  handleCheckboxChange("consentProfileVisibility", !!checked)
                }
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="consentProfileVisibility" className="cursor-pointer required-field">
                  Consent for Profile Visibility
                </Label>
                <p className="text-sm text-muted-foreground">
                  I agree that my profile will be publicly viewable by users after admin approval
                </p>
              </div>
            </div>
            <FormError error={errors.consentProfileVisibility} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilitySection;
