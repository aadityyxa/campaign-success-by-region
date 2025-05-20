import React, { useState, useCallback } from 'react';
import WorldMap from './WorldMap';
import CampaignTable from './CampaignTable';
import PerformanceScale from './PerformanceScale';
import { Campaign } from '../types';

interface AnalyticsWidgetProps {
  data: Campaign[];
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  const handleCountrySelect = useCallback((countryCode: string | null) => {
    setSelectedCountry(countryCode);
  }, []);

  // Filter campaigns for selected country or show all if none selected
  const filteredCampaigns = selectedCountry
    ? data.filter(campaign => campaign.country === selectedCountry)
    : data;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-indigo-50 border-b border-indigo-100">
        <h2 className="text-xl font-semibold text-indigo-900">Most Successful Campaigns by Region</h2>
        <p className="text-sm text-indigo-700">Interactive visualization of campaign performance across countries</p>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4 border-r border-gray-100">
          <div className="mb-4 flex justify-end">
            <PerformanceScale />
          </div>
          <div className="h-[500px]">
            <WorldMap 
              data={data} 
              selectedCountry={selectedCountry}
              onSelectCountry={handleCountrySelect}
            />
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            Click on a country to view detailed campaign metrics
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 p-4">
          <CampaignTable 
            campaigns={filteredCampaigns} 
            selectedCountry={selectedCountry}
            onSelectCountry={handleCountrySelect}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;