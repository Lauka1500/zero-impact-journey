import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { 
  calculateCO2Savings, 
  calculateCarbonCredits, 
  calculateFinancialValue,
  convertToKWh
} from '../utils/calculationUtils';

interface CarbonCalculatorProps {
  onComplete: (results: CalculationResults) => void;
}

export interface CalculationResults {
  ownershipType: 'owner' | 'tenant';
  buildingSize: number;
  heatingSystem: 'gas' | 'oil' | 'pellet' | 'other';
  currentConsumption: number;
  projectedConsumption: number;
  co2Savings: number;
  carbonCredits: number;
  financialValue: number;
  consumptionUnit: string;
  newEnergySystem: string;
}

interface ConsumptionUnits {
  [key: string]: string;
}

const CarbonCalculator = ({ onComplete }: CarbonCalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Omit<CalculationResults, 'co2Savings' | 'carbonCredits' | 'financialValue'>>({
    ownershipType: 'owner',
    buildingSize: 0,
    heatingSystem: 'gas',
    currentConsumption: 0,
    projectedConsumption: 0,
    consumptionUnit: 'm³',
    newEnergySystem: 'electricity',
  });
  
  const consumptionUnits: ConsumptionUnits = {
    'gas': 'm³',
    'oil': 'liters',
    'pellet': 'kg',
    'other': 'kWh',
  };
  
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      consumptionUnit: consumptionUnits[prev.heatingSystem]
    }));
  }, [formData.heatingSystem]);
  
  const formRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);
  
  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.ownershipType;
      case 2:
        return !!formData.buildingSize && formData.buildingSize > 0;
      case 3:
        return !!formData.heatingSystem;
      case 4:
        return !!formData.currentConsumption && formData.currentConsumption > 0;
      case 5:
        return !!formData.projectedConsumption && formData.projectedConsumption >= 0;
      default:
        return true;
    }
  };
  
  const handleSubmit = () => {
    if (validateCurrentStep()) {
      const co2Savings = calculateCO2Savings(
        formData.heatingSystem,
        formData.currentConsumption,
        formData.projectedConsumption
      );
      
      const carbonCredits = calculateCarbonCredits(co2Savings);
      const financialValue = calculateFinancialValue(carbonCredits);
      
      onComplete({
        ...formData,
        co2Savings,
        carbonCredits,
        financialValue,
      });
    }
  };
  
  return (
    <div ref={formRef} className="form-container">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step}
              className={`h-2 rounded-full transition-all duration-500 flex-1 mx-1 ${
                step === currentStep
                  ? 'bg-radicalBlue-500'
                  : step < currentStep
                  ? 'bg-radicalBlue-300'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground text-right">
          Step {currentStep} of 5
        </div>
      </div>
      
      {/* Step 1: Ownership Type */}
      <div className={`form-step ${currentStep === 1 ? 'active' : 'inactive'}`}>
        <h2 className="form-title">Building Ownership</h2>
        <p className="form-subtitle">Do you own the building or are you a tenant?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className={`input-container cursor-pointer flex items-center p-6 ${
              formData.ownershipType === 'owner'
                ? 'ring-2 ring-radicalBlue-500 border-radicalBlue-200'
                : ''
            }`}
            onClick={() => handleInputChange('ownershipType', 'owner')}
          >
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Building Owner</h3>
                {formData.ownershipType === 'owner' && (
                  <div className="h-6 w-6 rounded-full bg-radicalBlue-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-muted-foreground mt-2">
                I own the building and can implement energy efficiency measures.
              </p>
            </div>
          </div>
          
          <div
            className={`input-container cursor-pointer flex items-center p-6 ${
              formData.ownershipType === 'tenant'
                ? 'ring-2 ring-radicalBlue-500 border-radicalBlue-200'
                : ''
            }`}
            onClick={() => handleInputChange('ownershipType', 'tenant')}
          >
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Tenant</h3>
                {formData.ownershipType === 'tenant' && (
                  <div className="h-6 w-6 rounded-full bg-radicalBlue-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-muted-foreground mt-2">
                I rent the building and want to explore energy efficiency options.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-8">
          <button
            onClick={handleNext}
            disabled={!validateCurrentStep()}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
              validateCurrentStep()
                ? 'bg-radicalBlue-600 text-white hover:bg-radicalBlue-700 transition-colors'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Step 2: Building Size */}
      <div className={`form-step ${currentStep === 2 ? 'active' : 'inactive'}`}>
        <h2 className="form-title">Building Size</h2>
        <p className="form-subtitle">What is the size of your building in square meters?</p>
        
        <div className="input-container p-6">
          <label htmlFor="buildingSize" className="block text-sm font-medium text-muted-foreground mb-2">
            Building Size (m²)
          </label>
          <input
            type="number"
            id="buildingSize"
            min="1"
            value={formData.buildingSize || ''}
            onChange={(e) => handleInputChange('buildingSize', Number(e.target.value))}
            className="w-full text-2xl font-medium focus:outline-none bg-transparent"
            placeholder="Enter building size"
          />
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 rounded-xl font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!validateCurrentStep()}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
              validateCurrentStep()
                ? 'bg-radicalBlue-600 text-white hover:bg-radicalBlue-700 transition-colors'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Step 3: Heating System */}
      <div className={`form-step ${currentStep === 3 ? 'active' : 'inactive'}`}>
        <h2 className="form-title">Current Heating System</h2>
        <p className="form-subtitle">What is your current heating system?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {['gas', 'oil', 'pellet', 'other'].map((type) => (
            <div
              key={type}
              className={`input-container cursor-pointer flex items-center p-6 ${
                formData.heatingSystem === type
                  ? 'ring-2 ring-radicalBlue-500 border-radicalBlue-200'
                  : ''
              }`}
              onClick={() => handleInputChange('heatingSystem', type)}
            >
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium capitalize">{type}</h3>
                  {formData.heatingSystem === type && (
                    <div className="h-6 w-6 rounded-full bg-radicalBlue-500 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 rounded-xl font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!validateCurrentStep()}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
              validateCurrentStep()
                ? 'bg-radicalBlue-600 text-white hover:bg-radicalBlue-700 transition-colors'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Step 4: Current Energy Consumption */}
      <div className={`form-step ${currentStep === 4 ? 'active' : 'inactive'}`}>
        <h2 className="form-title">Current Energy Consumption</h2>
        <p className="form-subtitle">
          What is your current annual energy consumption for {formData.heatingSystem}?
        </p>
        
        <div className="input-container p-6">
          <label htmlFor="currentConsumption" className="block text-sm font-medium text-muted-foreground mb-2">
            Current Consumption ({formData.consumptionUnit}/year)
          </label>
          <input
            type="number"
            id="currentConsumption"
            min="1"
            value={formData.currentConsumption || ''}
            onChange={(e) => handleInputChange('currentConsumption', Number(e.target.value))}
            className="w-full text-2xl font-medium focus:outline-none bg-transparent"
            placeholder={`Enter current consumption in ${formData.consumptionUnit}`}
          />
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 rounded-xl font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!validateCurrentStep()}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
              validateCurrentStep()
                ? 'bg-radicalBlue-600 text-white hover:bg-radicalBlue-700 transition-colors'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Step 5: Projected Energy Consumption after switching to electricity */}
      <div className={`form-step ${currentStep === 5 ? 'active' : 'inactive'}`}>
        <h2 className="form-title">Projected Energy Consumption</h2>
        <p className="form-subtitle">
          What is your projected annual electricity consumption after switching to an electric heat pump?
        </p>
        
        <div className="input-container p-6">
          <label htmlFor="projectedConsumption" className="block text-sm font-medium text-muted-foreground mb-2">
            Projected Electricity Consumption (kWh/year)
          </label>
          <input
            type="number"
            id="projectedConsumption"
            min="0"
            value={formData.projectedConsumption || ''}
            onChange={(e) => handleInputChange('projectedConsumption', Number(e.target.value))}
            className="w-full text-2xl font-medium focus:outline-none bg-transparent"
            placeholder="Enter projected electricity consumption in kWh"
          />
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 rounded-xl font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!validateCurrentStep()}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
              validateCurrentStep()
                ? 'bg-radicalBlue-600 text-white hover:bg-radicalBlue-700 transition-colors'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            See Results <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
