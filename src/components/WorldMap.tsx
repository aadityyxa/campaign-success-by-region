import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Campaign } from '../types';
import { getCampaignPerformance, getCountryNameByCode } from '../utils/dataUtils';

interface WorldMapProps {
  data: Campaign[];
  selectedCountry: string | null;
  onSelectCountry: (countryCode: string | null) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ data, selectedCountry, onSelectCountry }) => {
  const [selectedMarker, setSelectedMarker] = useState<Campaign | null>(null);
  const [zoom, setZoom] = useState(2);
  const mapRef = useRef<google.maps.Map | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: 20,
    lng: 0,
  };

  const options = {
    minZoom: 2,
    maxZoom: 12,
    styles: [
      {
        featureType: 'administrative.country',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'administrative.province',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'administrative.locality',
        elementType: 'geometry',
        stylers: [{ visibility: 'on' }],
      },
    ],
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const getMarkerColor = (performance: number): string => {
    if (performance >= 9) return 'red';
    if (performance >= 7) return 'orange';
    if (performance >= 5) return 'yellow';
    return 'green';
  };

  const handleZoomChanged = () => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom() || 2);
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={options}
        onLoad={onLoad}
        onZoomChanged={handleZoomChanged}
      >
        {data.map((campaign) => (
          <Marker
            key={`${campaign.name}-${campaign.country}`}
            position={{
              lat: campaign.latitude || 0,
              lng: campaign.longitude || 0,
            }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: getMarkerColor(campaign.performance),
              fillOpacity: 0.8,
              strokeWeight: 1,
              strokeColor: '#FFFFFF',
            }}
            onClick={() => {
              setSelectedMarker(campaign);
              onSelectCountry(campaign.country);
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.latitude || 0,
              lng: selectedMarker.longitude || 0,
            }}
            onCloseClick={() => {
              setSelectedMarker(null);
              onSelectCountry(null);
            }}
          >
            <div className="p-2">
              <h3 className="font-semibold text-gray-900">{selectedMarker.name}</h3>
              <p className="text-sm text-gray-600">
                {getCountryNameByCode(selectedMarker.country)}
              </p>
              <p className="text-sm mt-1">
                Performance: {getCampaignPerformance(selectedMarker.performance)}
                <br />
                Users: {selectedMarker.uniqueUsers.toLocaleString()}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(WorldMap);