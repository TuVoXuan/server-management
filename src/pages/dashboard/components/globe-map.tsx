"use client";

import {
  Map,
  MapMarker,
  MapPopup,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { useIsMobile } from "@/hooks/use-mobile";
import { groupServerByLocation } from "@/mock-data";
import type { IServer } from "@/types";
import { useState } from "react";
import { LocationPopupContent } from "./map-server-popup";

type SelectedLocation = {
  popupLngLat: { latitude: number; longitude: number };
  server: IServer;
  canViewOthers: boolean;
};

export function GlobeMap() {
  const isMobile = useIsMobile();
  const locationWithServers = groupServerByLocation();
  const [selected, setSelected] = useState<SelectedLocation | null>(null);

  return (
    <div className="relative h-105 w-full">
      <Map center={[20, 20]} zoom={0.8}>
        {locationWithServers.map((location) => (
          <MapMarker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            onMouseEnter={() =>
              setSelected({
                canViewOthers: location.servers.length > 1,
                popupLngLat: {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
                server: location.servers[0],
              })
            }
          >
            <MarkerContent>
              <span className="relative flex size-3 z-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
              </span>
              <MarkerLabel position="bottom">
                {location.servers.length}
              </MarkerLabel>
            </MarkerContent>

            {!isMobile && selected && (
              <MapPopup
                longitude={selected.popupLngLat.longitude}
                latitude={selected.popupLngLat.latitude}
                offset={12}
                onClose={() => setSelected(null)}
                className="shadow-xs"
              >
                <LocationPopupContent
                  server={selected.server}
                  canViewOthers={selected.canViewOthers}
                />
              </MapPopup>
            )}

            {isMobile && (
              <MarkerPopup>
                <LocationPopupContent
                  server={location.servers[0]}
                  canViewOthers={location.servers.length > 1}
                />
              </MarkerPopup>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
