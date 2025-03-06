
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormProps {
  onSubmit: (formData: ContactFormData) => void;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  termsAccepted: boolean;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    termsAccepted: false,
  });
  
  const handleInputChange = (field: keyof ContactFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  const isFormValid = (): boolean => {
    return (
      !!formData.firstName.trim() &&
      !!formData.lastName.trim() &&
      !!formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.termsAccepted
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid()) {
      onSubmit(formData);
      toast.success('Information submitted successfully!');
    } else {
      toast.error('Please complete all required fields correctly.');
    }
  };
  
  return (
    <div className="form-container animate-slide-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Almost There!</h2>
        <p className="text-lg text-muted-foreground">
          Provide your contact information to receive details about your carbon credits
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="input-container p-6">
            <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-2">
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full text-lg font-medium focus:outline-none bg-transparent"
              placeholder="Enter your first name"
              required
            />
          </div>
          
          <div className="input-container p-6">
            <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-2">
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full text-lg font-medium focus:outline-none bg-transparent"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>
        
        <div className="input-container p-6">
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full text-lg font-medium focus:outline-none bg-transparent"
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div className="flex items-start gap-3 p-1">
          <div 
            className={`h-6 w-6 rounded border flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
              formData.termsAccepted ? 'bg-radicalGreen-500 border-radicalGreen-500' : 'border-gray-300 bg-white'
            }`}
            onClick={() => handleInputChange('termsAccepted', !formData.termsAccepted)}
          >
            {formData.termsAccepted && <Check className="h-4 w-4 text-white" />}
          </div>
          <div>
            <label
              htmlFor="terms"
              className="cursor-pointer text-sm text-gray-600"
              onClick={() => handleInputChange('termsAccepted', !formData.termsAccepted)}
            >
              I accept the <span className="text-radicalGreen-600 underline">terms and conditions</span> and 
              I consent that Radical Zero can contact me via email to provide information about carbon credits.
            </label>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`px-8 py-4 rounded-xl text-lg font-medium w-full md:w-auto ${
              isFormValid()
                ? 'bg-radicalGreen-600 text-white hover:bg-radicalGreen-700 transition-colors shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
