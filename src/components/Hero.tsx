
import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-10 z-0"></div>
      <div className="relative z-10 max-w-5xl text-center animate-slide-down">
        <div className="inline-block px-4 py-1 mb-6 rounded-full text-sm font-medium bg-radicalGreen-100 text-radicalGreen-700">
          Measure, Reduce, Monetize
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Transform Your Energy Savings into 
          <span className="text-radicalGreen-600"> Carbon Credits</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
          Discover how your energy efficiency upgrades can reduce CO2 emissions and generate 
          financial returns through carbon credits.
        </p>
        
        <button
          onClick={onGetStarted}
          className="px-8 py-4 rounded-xl text-lg font-medium bg-radicalGreen-600 text-white 
                    hover:bg-radicalGreen-700 transition-all duration-300 shadow-md 
                    hover:shadow-xl transform hover:-translate-y-1"
        >
          Calculate Your Potential
        </button>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="mx-auto h-10 w-10 text-radicalGreen-500 opacity-70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
