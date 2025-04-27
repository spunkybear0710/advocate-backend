
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FormHeader: React.FC = () => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-3xl md:text-4xl font-serif text-dal-blue">
          Advocate Registration
        </CardTitle>
        <CardDescription className="text-lg mt-2">
          Join Dhundho Apna Lawyer (DAL) to connect with potential clients and grow your practice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <span className="bg-dal-blue text-white px-3 py-1 rounded-full text-sm">
            All fields marked with * are required
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormHeader;
