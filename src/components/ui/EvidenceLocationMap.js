import React from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

const TASHKENT = [41.2995, 69.2401];

const markerIcon = L.divIcon({
  className: 'evidence-map-marker',
  html: '<span></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const LocationClickHandler = ({ interactive, onChange }) => {
  useMapEvents({
    click(event) {
      if (interactive) {
        onChange([event.latlng.lat, event.latlng.lng]);
      }
    },
  });

  return null;
};

export const EvidenceLocationMap = ({
  position,
  onChange = () => {},
  interactive = true,
}) => {
  const center = position || TASHKENT;

  return (
    <div>
      <MapContainer
        center={center}
        zoom={position ? 15 : 11}
        scrollWheelZoom={false}
        className={`evidence-location-map${interactive ? ' is-interactive' : ''}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationClickHandler interactive={interactive} onChange={onChange} />
        {position && <Marker position={position} icon={markerIcon} />}
      </MapContainer>
      {interactive && (
        <p className="mt-2 text-xs text-gray-500">
          Xarita ustiga bosib, dalil joylashgan nuqtani belgilang.
        </p>
      )}
    </div>
  );
};
