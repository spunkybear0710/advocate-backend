
import React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FormError } from "./FormError";

interface ExperienceSectionProps {
  formData: {
    ongoingCases: string;
    notableCases: string;
    awards: string;
    publications: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  formData,
  errors,
  handleChange,
}) => {
  return (
    <Card className="dal-section">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-dal-blue">
          Detailed Experience Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="dal-form-group">
          <Label htmlFor="ongoingCases">
            Current Ongoing Cases
          </Label>
          <Textarea
            id="ongoingCases"
            name="ongoingCases"
            value={formData.ongoingCases}
            onChange={handleChange}
            placeholder="Describe your current cases without revealing confidential information"
            className={errors.ongoingCases ? "border-red-500" : ""}
            rows={4}
          />
          <FormError error={errors.ongoingCases} />
        </div>

        <div className="dal-form-group">
          <Label htmlFor="notableCases">
            Notable Past Cases
          </Label>
          <Textarea
            id="notableCases"
            name="notableCases"
            value={formData.notableCases}
            onChange={handleChange}
            placeholder="Highlight your remarkable cases or achievements"
            className={errors.notableCases ? "border-red-500" : ""}
            rows={4}
          />
          <FormError error={errors.notableCases} />
        </div>

        <div className="dal-form-group">
          <Label htmlFor="awards">
            Awards & Recognitions
          </Label>
          <Textarea
            id="awards"
            name="awards"
            value={formData.awards}
            onChange={handleChange}
            placeholder="List any awards or recognitions you have received"
            className={errors.awards ? "border-red-500" : ""}
            rows={3}
          />
          <FormError error={errors.awards} />
        </div>

        <div className="dal-form-group">
          <Label htmlFor="publications">
            Publications or Articles
          </Label>
          <Textarea
            id="publications"
            name="publications"
            value={formData.publications}
            onChange={handleChange}
            placeholder="Add links to your publications or articles (one per line)"
            className={errors.publications ? "border-red-500" : ""}
            rows={3}
          />
          <FormError error={errors.publications} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
