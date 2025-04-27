
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dal-gray">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-serif font-bold mb-4 text-dal-blue">Dhundho Apna Lawyer (DAL)</h1>
        <p className="text-xl text-gray-600 mb-8">Connect with legal professionals across India</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-dal-blue hover:bg-dal-blue/90 text-white px-6 py-6">
            <Link to="/register-advocate">Register as an Advocate</Link>
          </Button>
          
          <Button variant="outline" className="border-dal-blue text-dal-blue hover:bg-dal-lightblue px-6 py-6">
            <Link to="/">Find a Lawyer</Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-12 text-center px-4">
        <h2 className="text-2xl font-serif mb-4">About DAL</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Dhundho Apna Lawyer is a platform connecting clients with legal professionals across 
          District Courts, High Courts, and the Supreme Court of India. Our mission is to make 
          quality legal representation accessible to everyone.
        </p>
      </div>
    </div>
  );
};

export default Index;
