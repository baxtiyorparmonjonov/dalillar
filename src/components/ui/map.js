import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet ikonkalarini to'g'rilash
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export const Map = ({ evidences = [], singleEvidence = null, className = "h-72 w-full rounded-xl" }) => {
  const items = singleEvidence ? [singleEvidence] : evidences;
  
  const centerLat = items.length > 0 && items[0].lat ? items[0].lat : 41.2995;
  const centerLng = items.length > 0 && items[0].lng ? items[0].lng : 69.2401;

  return (
    <div className={`relative z-0 overflow-hidden border border-gray-200 shadow-sm ${className}`}>
      <MapContainer 
        center={[centerLat, centerLng]} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items.map((item, index) => {
          if (!item.lat || !item.lng) return null;
          return (
            <React.Fragment key={item._id || item.id || index}>
              <Marker position={[item.lat, item.lng]}>
                <Popup>
                  <div className="p-1">
                    <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm text-gray-900 mt-0.5">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-1"><strong>Ish raqami:</strong> {item.caseNumber}</p>
                    <p className="text-xs text-gray-600"><strong>Manzil:</strong> {item.location}</p>
                  </div>
                </Popup>
              </Marker>

              <Circle
                center={[item.lat, item.lng]}
                radius={200}
                pathOptions={{
                  color: '#2563eb',
                  fillColor: '#3b82f6',
                  fillOpacity: 0.15,
                  weight: 1
                }}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};