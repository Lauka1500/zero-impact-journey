
import React, { useState, useRef } from 'react';
import Hero from '../components/Hero';
import CarbonCalculator, { type CalculationResults } from '../components/CarbonCalculator';
import Results from '../components/Results';
import ContactForm, { type ContactFormData } from '../components/ContactForm';
import { toast } from 'sonner';

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'calculator' | 'contact' | 'results' | 'completion'>('hero');
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  const handleGetStarted = () => {
    setCurrentView('calculator');
    setTimeout(() => {
      calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  const handleCalculationComplete = (results: CalculationResults) => {
    setCalculationResults(results);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleContactSubmit = (contactData: ContactFormData) => {
    // In a real application, you would send this data to your backend
    console.log('Contact form submitted:', contactData);
    console.log('Calculation results:', calculationResults);
    
    // Now show results after contact form
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleViewCompletion = () => {
    setCurrentView('completion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success('Thank you for your submission!');
  };
  
  return (
    <div className="min-h-screen bg-gradient">
      <header className="w-full p-6 flex justify-between items-center z-20 relative">
        <div className="font-bold text-xl">
          <img 
            src="/lovable-uploads/68ed5295-f319-4617-9268-139ff01c89b9.png" 
            alt="Radical-Zero Logo" 
            className="h-10"
          />
        </div>
        <nav>
          <button 
            onClick={() => {
              setCurrentView('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/80 transition-colors"
          >
            Home
          </button>
        </nav>
      </header>
      
      <main className="container px-4 pb-20">
        {currentView === 'hero' && <Hero onGetStarted={handleGetStarted} />}
        
        <div ref={calculatorRef} className={currentView !== 'hero' ? 'mt-12' : 'hidden'}>
          {currentView === 'calculator' && (
            <CarbonCalculator onComplete={handleCalculationComplete} />
          )}
          
          {currentView === 'contact' && calculationResults && (
            <ContactForm onSubmit={handleContactSubmit} />
          )}
          
          {currentView === 'results' && calculationResults && (
            <Results 
              results={calculationResults} 
              onNext={handleViewCompletion} 
            />
          )}
          
          {currentView === 'completion' && (
            <div className="form-container animate-slide-up text-center">
              <div className="mx-auto mb-6 w-48">
                <img 
                  src="/lovable-uploads/68ed5295-f319-4617-9268-139ff01c89b9.png" 
                  alt="Radical-Zero Logo" 
                  className="w-full"
                />
              </div>
              
              <div className="h-24 w-24 rounded-full bg-radicalBlue-100 flex items-center justify-center mx-auto mb-8">
                <div className="h-16 w-16 rounded-full bg-radicalBlue-500 flex items-center justify-center">
                  <div className="text-white text-4xl">✓</div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Submission Successful!</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Thank you for your interest in carbon credits. A Radical-Zero representative will contact you 
                soon with more information about your potential carbon savings.
              </p>
              
              <button
                onClick={() => {
                  setCurrentView('hero');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl font-medium bg-radicalBlue-600 text-white hover:bg-radicalBlue-700 transition-colors shadow-md mx-auto"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="w-full py-8 px-4 bg-white border-t border-gray-100">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm text-muted-foreground text-[12px]">
            Radical Zero 2025
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Radical-Zero.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
