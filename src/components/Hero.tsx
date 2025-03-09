
import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-40 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581267503707-16617aa5bbf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1274&q=80" 
          alt="Heat pump background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 max-w-5xl text-center animate-slide-down">
        <div className="mx-auto mb-8 w-80 bg-white/80 p-4 rounded-lg">
          <img 
            src="/lovable-uploads/68ed5295-f319-4617-9268-139ff01c89b9.png" 
            alt="Radical-Zero Logo" 
            className="w-full"
          />
        </div>
        <div className="inline-block px-4 py-1 mb-6 rounded-full text-sm font-medium bg-radicalBlue-100 text-radicalBlue-700">
          Measure, Reduce, Monetize
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Transform Your Energy Savings into 
          <span className="text-radicalBlue-600"> Carbon Credits</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          Discover how your energy efficiency upgrades can reduce CO2 emissions and generate 
          financial returns through carbon credits.
        </p>
        
        <button
          onClick={onGetStarted}
          className="px-8 py-4 rounded-xl text-lg font-medium bg-radicalBlue-600 text-white 
                    hover:bg-radicalBlue-700 transition-all duration-300 shadow-md 
                    hover:shadow-xl transform hover:-translate-y-1"
        >
          Calculate Your Potential
        </button>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="mx-auto h-10 w-10 text-radicalBlue-500 opacity-70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
