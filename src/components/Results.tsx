
import React from 'react';
import { type CalculationResults } from './CarbonCalculator';
import { formatNumber, formatCurrency } from '../utils/calculationUtils';
import { Check, ChevronRight } from 'lucide-react';

interface ResultsProps {
  results: CalculationResults;
  onNext: () => void;
}

const Results = ({ results, onNext }: ResultsProps) => {
  return (
    <div className="form-container animate-slide-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Your Carbon Savings Results</h2>
        <p className="text-lg text-muted-foreground">
          Here's the potential impact of your energy efficiency improvements
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="results-card flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-radicalBlue-100 flex items-center justify-center mb-4">
            <div className="h-10 w-10 rounded-full bg-radicalBlue-500 flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">CO₂ Savings</h3>
          <div className="text-4xl font-bold text-radicalBlue-700 mb-2">
            {formatNumber(results.co2Savings)}
          </div>
          <p className="text-muted-foreground">Tons of CO₂ per year</p>
        </div>
        
        <div className="results-card flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-radicalBlue-100 flex items-center justify-center mb-4">
            <div className="h-10 w-10 rounded-full bg-radicalBlue-500 flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Carbon Credits</h3>
          <div className="text-4xl font-bold text-radicalBlue-700 mb-2">
            {formatNumber(results.carbonCredits)}
          </div>
          <p className="text-muted-foreground">Credits (1:1 with CO₂)</p>
        </div>
        
        <div className="results-card flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-radicalBlue-100 flex items-center justify-center mb-4">
            <div className="h-10 w-10 rounded-full bg-radicalBlue-500 flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Financial Value</h3>
          <div className="text-4xl font-bold text-radicalBlue-700 mb-2">
            {formatCurrency(results.financialValue)}
          </div>
          <p className="text-muted-foreground">Potential market value</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
        <h3 className="text-xl font-medium mb-4">Building Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Ownership Type</p>
            <p className="font-medium capitalize">{results.ownershipType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Building Size</p>
            <p className="font-medium">{results.buildingSize} m²</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Heating System</p>
            <p className="font-medium capitalize">{results.heatingSystem}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Energy Consumption Reduction</p>
            <p className="font-medium">
              {formatNumber(results.currentConsumption - results.projectedConsumption)} {results.consumptionUnit}/year ({
                Math.round((1 - results.projectedConsumption / results.currentConsumption) * 100)
              }%)
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="mb-6 text-muted-foreground">
          Thank you for using our carbon savings calculator.
        </p>
        <button
          onClick={onNext}
          className="px-8 py-4 rounded-xl font-medium bg-radicalBlue-600 text-white 
                    hover:bg-radicalBlue-700 transition-colors shadow-md flex items-center 
                    gap-2 mx-auto"
        >
          Continue <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Results;
