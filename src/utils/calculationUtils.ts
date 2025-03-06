
// Energy consumption factors based on heating system type
export const emissionFactors = {
  gas: 0.202, // kg CO2 per kWh
  oil: 0.266, // kg CO2 per kWh
  pellet: 0.023, // kg CO2 per kWh
  other: 0.15, // kg CO2 per kWh (average)
};

// Carbon credit value in EUR per ton of CO2
export const carbonCreditValue = 50;

// Calculate CO2 savings based on input data
export const calculateCO2Savings = (
  oldSystem: keyof typeof emissionFactors,
  oldConsumption: number,
  newConsumption: number
): number => {
  const emissionFactor = emissionFactors[oldSystem];
  
  // Calculate CO2 emissions in tons (converting from kg)
  const oldEmissions = (oldConsumption * emissionFactor) / 1000;
  const newEmissions = (newConsumption * emissionFactor) / 1000;
  
  // Calculate savings (tons of CO2)
  return Math.max(0, oldEmissions - newEmissions);
};

// Calculate carbon credits (1:1 with CO2 savings)
export const calculateCarbonCredits = (co2Savings: number): number => {
  return co2Savings;
};

// Calculate financial value in EUR
export const calculateFinancialValue = (carbonCredits: number): number => {
  return carbonCredits * carbonCreditValue;
};

// Format numbers to have 2 decimal places
export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US", { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  });
};

// Format currency values
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("en-US", { 
    style: "currency", 
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};
