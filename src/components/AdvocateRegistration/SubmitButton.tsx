
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isValid: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, isValid }) => {
  return (
    <Button
      type="submit"
      className="w-full md:w-auto bg-dal-blue hover:bg-dal-blue/90 text-white py-2 px-6 text-lg"
      disabled={isLoading || !isValid}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Submit Registration"
      )}
    </Button>
  );
};

export default SubmitButton;
