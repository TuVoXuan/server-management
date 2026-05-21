"use client";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import { LocationPopup, LocationPopupContent } from "./map-location-popup";
import { useIsMobile } from "@/hooks/use-mobile";

const serverLocations = [
  {
    ip: "192.168.10.14",
    serverName: "alpha-node-01",
    country: "USA",
    latitude: 37.7749,
    longitude: -122.4194, // San Francisco
  },
  {
    ip: "172.16.5.22",
    serverName: "berlin-core-02",
    country: "Germany",
    latitude: 52.52,
    longitude: 13.405, // Berlin
  },
  {
    ip: "10.0.8.45",
    serverName: "tokyo-edge-01",
    country: "Japan",
    latitude: 35.6762,
    longitude: 139.6503, // Tokyo
  },
  {
    ip: "203.0.113.18",
    serverName: "singapore-gateway",
    country: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198, // Singapore
  },
  {
    ip: "198.51.100.77",
    serverName: "london-proxy-03",
    country: "United Kingdom",
    latitude: 51.5072,
    longitude: -0.1276, // London
  },
  {
    ip: "45.76.12.90",
    serverName: "sydney-cloud-01",
    country: "Australia",
    latitude: -33.8688,
    longitude: 151.2093, // Sydney
  },
  {
    ip: "103.21.244.15",
    serverName: "mumbai-storage-02",
    country: "India",
    latitude: 19.076,
    longitude: 72.8777, // Mumbai
  },
  {
    ip: "185.34.22.101",
    serverName: "paris-db-01",
    country: "France",
    latitude: 48.8566,
    longitude: 2.3522, // Paris
  },
  {
    ip: "61.14.220.33",
    serverName: "seoul-app-04",
    country: "South Korea",
    latitude: 37.5665,
    longitude: 126.978, // Seoul
  },
  {
    ip: "154.72.19.88",
    serverName: "sao-paulo-node-01",
    country: "Brazil",
    latitude: -23.5505,
    longitude: -46.6333, // São Paulo
  },
];

export function GlobeMap() {
  const isMobile = useIsMobile();

  return (
    <div className="relative h-105 w-full">
      <Map center={[20, 20]} zoom={0.8}>
        {serverLocations.map((location) => (
          <MapMarker
            key={location.ip}
            longitude={location.longitude}
            latitude={location.latitude}
          >
            <MarkerContent>
              <div className="group relative">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                </span>
                <LocationPopup location={location} position="top" />
              </div>
            </MarkerContent>
            {isMobile && (
              <MarkerPopup>
                <LocationPopupContent location={location} />
              </MarkerPopup>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
