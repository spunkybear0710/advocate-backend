
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormError } from "./FormError";
import { Upload } from "lucide-react";

interface DocumentsSectionProps {
  files: {
    barIdProof: File | null;
    profilePicture: File | null;
  };
  errors: Record<string, string>;
  handleFileChange: (field: string, file: File | null) => void;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  files,
  errors,
  handleFileChange,
}) => {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(field, file);
  };

  return (
    <Card className="dal-section">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-dal-blue">Documents</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="dal-form-group">
          <Label htmlFor="barIdProof" className="required-field mb-2 block">
            Bar Council ID Proof
          </Label>
          <div
            className={`file-upload-container ${errors.barIdProof ? "border-red-500" : ""}`}
            onClick={() => document.getElementById("barIdProof")?.click()}
          >
            <input
              type="file"
              id="barIdProof"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => onFileChange(e, "barIdProof")}
              hidden
            />

            {files.barIdProof ? (
              <div className="text-center">
                <p className="font-medium text-dal-blue">{files.barIdProof.name}</p>
                <p className="text-sm text-gray-500">
                  {(files.barIdProof.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  className="mt-2 text-red-500 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileChange("barIdProof", null);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2">Click to upload Bar Council ID (PDF or JPG)</p>
                <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
              </div>
            )}
          </div>
          <FormError error={errors.barIdProof} />
        </div>

        <div className="dal-form-group">
          <Label htmlFor="profilePicture" className="mb-2 block">
            Profile Picture (Optional)
          </Label>
          <div
            className="file-upload-container"
            onClick={() => document.getElementById("profilePicture")?.click()}
          >
            <input
              type="file"
              id="profilePicture"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => onFileChange(e, "profilePicture")}
              hidden
            />

            {files.profilePicture ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(files.profilePicture)}
                  alt="Profile Preview"
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />
                <p className="mt-2 font-medium text-dal-blue">{files.profilePicture.name}</p>
                <button
                  type="button"
                  className="mt-2 text-red-500 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileChange("profilePicture", null);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2">Click to upload your profile photo</p>
                <p className="text-xs text-gray-500 mt-1">
                  Square image recommended (JPG, PNG)
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsSection;
