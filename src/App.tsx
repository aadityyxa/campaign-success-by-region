import React, { useState, useEffect } from 'react';
import AnalyticsWidget from './components/AnalyticsWidget';
import { Campaign } from './types';
import { campaignData } from './data/mock-data'; // Remove this when connecting to real API

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call with mock data
    // Replace this with your actual API call
    const fetchData = async () => {
      try {
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // setCampaigns(data);
        setCampaigns(campaignData); // Remove this when using real API
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch campaign data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-gray-600">Loading campaign data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Campaign Analytics</h1>
        <p className="text-gray-600">Visualizing campaign performance by country</p>
      </header>
      <main className="max-w-7xl mx-auto">
        <AnalyticsWidget data={campaigns} />
      </main>
    </div>
  );
}

export default App;