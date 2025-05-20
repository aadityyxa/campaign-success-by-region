import React, { memo } from 'react';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import { Campaign } from '../types';
import { getCampaignPerformance, getCountryNameByCode } from '../utils/dataUtils';

interface WorldMapProps {
  data: Campaign[];
  selectedCountry: string | null;
  onSelectCountry: (countryCode: string | null) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ data, selectedCountry, onSelectCountry }) => {
  // Get the highest performance score and total unique users for each country
  const countryData = data.reduce<Record<string, { performance: number; uniqueUsers: number }>>((map, campaign) => {
    if (!map[campaign.country] || campaign.performance > map[campaign.country].performance) {
      map[campaign.country] = {
        performance: campaign.performance,
        uniqueUsers: campaign.uniqueUsers
      };
    }
    return map;
  }, {});

  const getColor = (performance: number): string => {
    if (performance >= 9) return '#1E40AF';
    if (performance >= 8) return '#2563EB';
    if (performance >= 7) return '#3B82F6';
    if (performance >= 6) return '#60A5FA';
    if (performance >= 5) return '#93C5FD';
    return '#BFDBFE';
  };

  const mapData: Record<string, number> = {};
  const mapColors: Record<string, string> = {};

  Object.entries(countryData).forEach(([country, data]) => {
    mapData[country] = data.performance;
    mapColors[country] = getColor(data.performance);
  });

  return (
    <div className="w-full h-full">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        zoomOnScroll={true}
        zoomStep={1.5}
        series={{
          regions: [{
            values: mapData,
            scale: ['#BFDBFE', '#1E40AF'],
            normalizeFunction: 'polynomial'
          }]
        }}
        onRegionTipShow={(e, el, code) => {
          const data = countryData[code];
          if (data) {
            const countryName = getCountryNameByCode(code as string);
            const performanceLabel = getCampaignPerformance(data.performance);
            el.html(`
              <div style="background: white; padding: 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); color: #1f2937; font-family: Inter, sans-serif;">
                <div style="font-weight: 600; margin-bottom: 4px;">${countryName}</div>
                <div style="font-size: 0.875rem;">
                  Performance: ${performanceLabel} (${data.performance.toFixed(1)})<br/>
                  Visitors: ${data.uniqueUsers.toLocaleString()}
                </div>
              </div>
            `);
          }
        }}
        onRegionClick={(e, code) => {
          if (countryData[code]) {
            onSelectCountry(code === selectedCountry ? null : code as string);
          }
        }}
        regionStyle={{
          initial: {
            fill: '#F1F5F9',
            stroke: '#FFFFFF',
            strokeWidth: 0.5,
          },
          hover: {
            fill: '#4F46E5',
            cursor: 'pointer'
          },
          selected: {
            fill: '#3730A3'
          }
        }}
        selectedRegions={selectedCountry ? [selectedCountry] : []}
      />
    </div>
  );
};

export default memo(WorldMap);