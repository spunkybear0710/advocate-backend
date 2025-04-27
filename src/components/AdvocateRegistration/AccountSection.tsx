
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "./FormError";
import { Eye, EyeOff } from "lucide-react";

interface AccountSectionProps {
  formData: {
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (field: string, value: boolean) => void;
}

const AccountSection: React.FC<AccountSectionProps> = ({
  formData,
  errors,
  handleChange,
  handleCheckboxChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card className="dal-section">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-dal-blue">Account Security</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="dal-form-group">
            <Label htmlFor="password" className="required-field">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500 pr-10" : "pr-10"}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FormError error={errors.password} />
            {!errors.password && formData.password && (
              <div className="text-xs text-gray-500 mt-1">
                Password should be at least 8 characters with letters, numbers and special characters
              </div>
            )}
          </div>

          <div className="dal-form-group">
            <Label htmlFor="confirmPassword" className="required-field">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FormError error={errors.confirmPassword} />
          </div>
        </div>

        <div className="dal-form-group mt-6">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                handleCheckboxChange("agreeToTerms", checked === true)
              }
              className={errors.agreeToTerms ? "border-red-500" : ""}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="agreeToTerms"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  errors.agreeToTerms ? "text-red-500" : ""
                }`}
              >
                I agree to the Terms and Conditions and Privacy Policy
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you consent to our{" "}
                <a href="#" className="text-dal-blue hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-dal-blue hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
          <FormError error={errors.agreeToTerms} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSection;
