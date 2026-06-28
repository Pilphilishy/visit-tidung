import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import type { CollectionEntry } from 'astro:content';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import CulinaryMarker from '@/assets/images/map-icons/culinary-marker.png';
import LodgingMarker from '@/assets/images/map-icons/lodging-marker.png';
import ActiveMarker from '@/assets/images/map-icons/active-marker.png';
import 'react-leaflet-markercluster/styles';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import CulinaryDetail from './CulinaryDetail';
import LodgingDetail from './LodgingDetail';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';

type Props = {
  culinary: CollectionEntry<'culinary'>[];
  lodgings: CollectionEntry<'lodgings'>[];
};

function Map({ culinary, lodgings }: Props) {
  const CulinaryIcon = useMemo(
    () =>
      new Icon({
        iconUrl: CulinaryMarker.src,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
      }),
    []
  );

  const LodgingIcon = useMemo(
    () =>
      new Icon({
        iconUrl: LodgingMarker.src,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
      }),
    []
  );

  const ActiveIcon = useMemo(
    () =>
      new Icon({
        iconUrl: ActiveMarker.src,
        iconSize: [44, 48],
        iconAnchor: [22, 44],
      }),
    []
  );

  // State
  const [selectedPlace, setSelectedPlace] = useState<null | CollectionEntry<
    'culinary' | 'lodgings'
  >>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);

  // Auto-open drawer when place is selected on mobile
  useEffect(() => {
    if (selectedPlace && window.innerWidth < 768) {
      setDrawerOpen(true);
    }
  }, [selectedPlace]);

  // Create cluster icons
  const createCulinaryClusterIcon = (cluster: any) => {
    return L.divIcon({
      html: `<div style="background-color:rgba(255,140,0,0.8);border-radius:50%;color:black;display:flex;align-items:center;justify-content:center;width:38px;height:38px;"><span style="font-size:14px;">${cluster.getChildCount()}</span></div>`,
      className: 'culinary-cluster-icon',
      iconSize: L.point(44, 44, true),
    });
  };

  const createLodgingClusterIcon = (cluster: any) => {
    return L.divIcon({
      html: `<div style="background-color:rgba(0,123,255,0.8);border-radius:50%;color:black;display:flex;align-items:center;justify-content:center;width:38px;height:38px;"><span style="font-size:14px;">${cluster.getChildCount()}</span></div>`,
      className: 'lodging-cluster-icon',
      iconSize: L.point(44, 44, true),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Sidebar */}
      <div className="h-[600px] overflow-y-scroll bg-card shadow-md overflow-hidden py-3 px-6 rounded-xl md:col-span-4 hidden md:block">
        {selectedPlace !== null ? (
          selectedPlace.collection === 'culinary' ? (
            // Culinary
            <CulinaryDetail culinary={selectedPlace} />
          ) : (
            // Lodging
            <LodgingDetail lodging={selectedPlace} />
          )
        ) : (
          <div className="flex justify-center items-center h-full text-center text-gray-700">
            <p>Pilih tempat untuk melihat detailnya</p>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="hidden">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            {selectedPlace?.collection === 'culinary' ? (
              <CulinaryDetail culinary={selectedPlace} />
            ) : selectedPlace?.collection === 'lodgings' ? (
              <LodgingDetail lodging={selectedPlace} />
            ) : null}
          </div>
          <DrawerClose asChild>
            <Button variant="outline" className="m-4">
              Tutup
            </Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>

      {/* Map */}
      <div
        className={`h-[600px] w-full shadow-md rounded-xl overflow-hidden md:col-span-8`}
      >
        {mapLoading && (
          <div className="flex items-center justify-center h-[600px] w-full bg-white/80 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        <MapContainer className="h-full w-full z-10" scrollWheelZoom={true}>
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            eventHandlers={{
              load: () => setMapLoading(false), // all tiles loaded
            }}
          />

          {/* Automatically fit to bounds */}
          <FitBounds culinary={culinary} lodgings={lodgings} />

          {/* Center when marker clicked */}
          <MapController selectedPlace={selectedPlace} />

          <LayersControl position="topright">
            <LayersControl.Overlay name="UMKM Kuliner" checked>
              <LayerGroup>
                <MarkerClusterGroup
                  iconCreateFunction={createCulinaryClusterIcon}
                  disableClusteringAtZoom={18}
                  showCoverageOnHover={false}
                  spiderfyOnMaxZoom={false}
                >
                  {culinary.map((place) => (
                    <Marker
                      key={`${place.data.id}`}
                      position={[place.data.lat, place.data.lng]}
                      icon={
                        selectedPlace !== null &&
                        selectedPlace.data.lat === place.data.lat &&
                        selectedPlace.data.lng === place.data.lng
                          ? ActiveIcon
                          : CulinaryIcon
                      }
                      eventHandlers={{
                        click: () => {
                          setSelectedPlace(place);
                          if (window.innerWidth < 768) {
                            setDrawerOpen(true);
                          }
                        },
                      }}
                    ></Marker>
                  ))}
                </MarkerClusterGroup>
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Penginapan" checked>
              <LayerGroup>
                <MarkerClusterGroup
                  iconCreateFunction={createLodgingClusterIcon}
                  disableClusteringAtZoom={18}
                  showCoverageOnHover={false}
                  spiderfyOnMaxZoom={false}
                >
                  {lodgings.map((place) => (
                    <Marker
                      key={`${place.data.id}`}
                      position={[place.data.lat, place.data.lng]}
                      icon={
                        selectedPlace !== null &&
                        selectedPlace.data.lat === place.data.lat &&
                        selectedPlace.data.lng === place.data.lng
                          ? ActiveIcon
                          : LodgingIcon
                      }
                      eventHandlers={{
                        click: () => {
                          setSelectedPlace(place);
                          if (window.innerWidth < 768) {
                            setDrawerOpen(true);
                          }
                        },
                      }}
                    ></Marker>
                  ))}
                </MarkerClusterGroup>
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
}

function FitBounds({
  culinary,
  lodgings,
}: {
  culinary: CollectionEntry<'culinary'>[];
  lodgings: CollectionEntry<'lodgings'>[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!culinary.length && !lodgings.length) return;

    const bounds = L.latLngBounds([]);

    culinary.forEach((place) => {
      bounds.extend([place.data.lat, place.data.lng]);
    });

    lodgings.forEach((place) => {
      bounds.extend([place.data.lat, place.data.lng]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [0, 0] }); // optional padding
    }
  }, [culinary, lodgings, map]);

  return null; // This component doesn't render anything visible
}

function MapController({
  selectedPlace,
}: {
  selectedPlace: null | CollectionEntry<'culinary' | 'lodgings'>;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      map.setView([selectedPlace.data.lat, selectedPlace.data.lng], 18);
    }
  }, [selectedPlace, map]);

  return null;
}

export default Map;