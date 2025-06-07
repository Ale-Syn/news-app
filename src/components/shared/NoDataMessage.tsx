import { FileQuestion } from "lucide-react";

interface NoDataMessageProps {
  title: string;
  message: string;
  className?: string;
}

const NoDataMessage = ({ title, message, className = "" }: NoDataMessageProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center w-full ${className}`}>
      <FileQuestion className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default NoDataMessage; 