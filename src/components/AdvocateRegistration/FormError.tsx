
import React from "react";

interface FormErrorProps {
  error?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;
  return <div className="form-field-error">{error}</div>;
};
