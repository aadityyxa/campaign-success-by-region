import React, { useState, useMemo } from 'react';
import { Campaign } from '../types';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { getCampaignPerformance, getCountryNameByCode } from '../utils/dataUtils';

interface CampaignTableProps {
  campaigns: Campaign[];
  selectedCountry: string | null;
  onSelectCountry: (countryCode: string | null) => void;
}

type SortField = 'name' | 'performance' | 'uniqueUsers';
type SortDirection = 'asc' | 'desc';

const CampaignTable: React.FC<CampaignTableProps> = ({ 
  campaigns, 
  selectedCountry,
  onSelectCountry
}) => {
  const [sortField, setSortField] = useState<SortField>('performance');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedCampaigns = useMemo(() => {
    return [...campaigns].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'performance':
          comparison = a.performance - b.performance;
          break;
        case 'uniqueUsers':
          comparison = a.uniqueUsers - b.uniqueUsers;
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [campaigns, sortField, sortDirection]);

  const getPerformanceClass = (performance: number) => {
    if (performance >= 8) return 'bg-green-100 text-green-800';
    if (performance >= 6) return 'bg-blue-100 text-blue-800';
    if (performance >= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 h-4 w-4 inline" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="ml-1 h-4 w-4 inline" />
      : <ChevronDown className="ml-1 h-4 w-4 inline" />;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {selectedCountry
            ? `Campaign Details for ${getCountryNameByCode(selectedCountry)}`
            : 'Top Performing Campaigns'
          }
        </h3>
        {selectedCountry && (
          <button
            onClick={() => onSelectCountry(null)}
            className="text-sm text-indigo-600 hover:text-indigo-800 mt-1"
          >
            View all countries
          </button>
        )}
      </div>
      
      <div className="overflow-auto flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Campaign {renderSortIcon('name')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('performance')}
              >
                Performance {renderSortIcon('performance')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('uniqueUsers')}
              >
                Unique Users {renderSortIcon('uniqueUsers')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCampaigns.length > 0 ? (
              sortedCampaigns.map((campaign) => (
                <tr key={`${campaign.name}-${campaign.country}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-xs text-gray-500">{getCountryNameByCode(campaign.country)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPerformanceClass(campaign.performance)}`}>
                      {getCampaignPerformance(campaign.performance)}
                      <span className="ml-1">({campaign.performance.toFixed(1)})</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.uniqueUsers.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No campaigns data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="pt-4 text-xs text-gray-500 border-t border-gray-200 mt-auto">
        <p>Showing {sortedCampaigns.length} campaigns {selectedCountry ? `for ${getCountryNameByCode(selectedCountry)}` : 'across all countries'}</p>
      </div>
    </div>
  );
};

export default CampaignTable;