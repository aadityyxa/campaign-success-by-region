// Performance level descriptions
export const getCampaignPerformance = (score: number): string => {
  if (score >= 8.5) return "Exceptional";
  if (score >= 7.5) return "Excellent";
  if (score >= 6.5) return "Very Good";
  if (score >= 5.5) return "Good";
  if (score >= 4.5) return "Average";
  if (score >= 3.5) return "Below Average";
  if (score >= 2.5) return "Poor";
  return "Critical";
};

// Country code to full name mapping
const countryNames: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  IT: "Italy",
  JP: "Japan",
  AU: "Australia",
  BR: "Brazil",
  MX: "Mexico",
  IN: "India",
  CN: "China",
  RU: "Russia",
  ZA: "South Africa",
  AE: "United Arab Emirates",
  AR: "Argentina",
  KR: "South Korea",
  SG: "Singapore",
  SE: "Sweden",
  NO: "Norway",
  FI: "Finland",
  DK: "Denmark",
  NL: "Netherlands",
  BE: "Belgium",
  // Add more countries as needed
};

export const getCountryNameByCode = (code: string): string => {
  return countryNames[code] || code;
};