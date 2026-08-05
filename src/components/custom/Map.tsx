import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import type { CollectionEntry } from 'astro:content';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import CulinaryMarker from '@/assets/images/map-icons/culinary-marker.png';
import LodgingMarker from '@/assets/images/map-icons/lodging-marker.png';
import ActiveMarker from '@/assets/images/map-icons/active-marker.png';
import TourismMarker from '@/assets/images/map-icons/tourism-marker.svg';
import AmenitiesMarker from '@/assets/images/map-icons/amenities-marker.svg';
import 'react-leaflet-markercluster/styles';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import CulinaryDetail from './CulinaryDetail';
import LodgingDetail from './LodgingDetail';
import TourismDetail from './TourismDetail';
import AmenitiesDetail from './AmenitiesDetail';
import { ChevronLeft, ChevronRight, Search, MapPin } from 'lucide-react';
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
  tourism?: CollectionEntry<'tourism'>[];
  amenities?: CollectionEntry<'amenities'>[];
};

function getIconDimensions(zoom: number, isSelected: boolean) {
  let size = 44;
  if (zoom >= 18) {
    size = 44;
  } else if (zoom >= 16) {
    size = 32;
  } else if (zoom >= 14) {
    size = 24;
  } else {
    size = 18;
  }

  if (isSelected) {
    const activeWidth = Math.round(size * 1.15);
    const activeHeight = Math.round(size * 1.25);
    return {
      size: [activeWidth, activeHeight] as [number, number],
      anchor: [Math.round(activeWidth / 2), activeHeight] as [number, number],
    };
  }

  return {
    size: [size, size] as [number, number],
    anchor: [Math.round(size / 2), size] as [number, number],
  };
}

function Map({ culinary, lodgings, tourism = [], amenities = [] }: Props) {
  const [currentZoom, setCurrentZoom] = useState(16);

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

  const TourismIcon = useMemo(
    () =>
      new Icon({
        iconUrl: TourismMarker.src,
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

  const AmenitiesIcon = useMemo(() => {
    const dim = getIconDimensions(currentZoom, false);
    return new Icon({
      iconUrl: AmenitiesMarker.src,
      iconSize: dim.size,
      iconAnchor: dim.anchor,
    });
  }, [currentZoom]);

  // State
  const [selectedPlace, setSelectedPlace] = useState<null | CollectionEntry<
    'culinary' | 'lodgings' | 'tourism' | 'amenities'
  >>(null);
  const [activeCategory, setActiveCategory] = useState<
    'tourism' | 'culinary' | 'lodgings' | 'amenities'
  >('tourism');
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);

  // Auto-open drawer when place is selected on mobile & sync active category tab
  useEffect(() => {
    if (selectedPlace) {
      setActiveCategory(selectedPlace.collection as any);
      if (window.innerWidth < 768) {
        setDrawerOpen(true);
      }
    }
  }, [selectedPlace]);

  const handleSelectPlace = (
    place: CollectionEntry<'culinary' | 'lodgings' | 'tourism' | 'amenities'>
  ) => {
    setSelectedPlace(place);
    setActiveCategory(place.collection as any);
  };

  const sortGeographically = (
    items: CollectionEntry<'culinary' | 'lodgings' | 'tourism' | 'amenities'>[]
  ) => {
    if (items.length <= 1) return items;

    const unvisited = [...items];
    // Start with the westernmost point (smallest longitude)
    unvisited.sort((a, b) => a.data.lng - b.data.lng || a.data.lat - b.data.lat);

    const result = [unvisited.shift()!];

    while (unvisited.length > 0) {
      const current = result[result.length - 1];
      let nearestIdx = 0;
      let minDist = Infinity;

      for (let i = 0; i < unvisited.length; i++) {
        const d = Math.hypot(
          unvisited[i].data.lat - current.data.lat,
          unvisited[i].data.lng - current.data.lng
        );
        if (d < minDist) {
          minDist = d;
          nearestIdx = i;
        }
      }

      result.push(unvisited.splice(nearestIdx, 1)[0]);
    }

    return result;
  };

  const currentCategoryItems = useMemo(() => {
    let raw: CollectionEntry<'culinary' | 'lodgings' | 'tourism' | 'amenities'>[] = [];
    switch (activeCategory) {
      case 'tourism':
        raw = tourism;
        break;
      case 'culinary':
        raw = culinary;
        break;
      case 'lodgings':
        raw = lodgings;
        break;
      case 'amenities':
        raw = amenities;
        break;
    }
    return sortGeographically(raw);
  }, [activeCategory, tourism, culinary, lodgings, amenities]);

  const currentIndex =
    selectedPlace && selectedPlace.collection === activeCategory
      ? currentCategoryItems.findIndex((item) => item.data.id === selectedPlace.data.id)
      : -1;

  const handlePrev = () => {
    if (currentCategoryItems.length === 0) return;
    const prevIdx =
      currentIndex <= 0
        ? currentCategoryItems.length - 1
        : currentIndex - 1;
    setSelectedPlace(currentCategoryItems[prevIdx]);
  };

  const handleNext = () => {
    if (currentCategoryItems.length === 0) return;
    const nextIdx =
      currentIndex < 0 ? 0 : (currentIndex + 1) % currentCategoryItems.length;
    setSelectedPlace(currentCategoryItems[nextIdx]);
  };

  const filteredItems = currentCategoryItems.filter((item) =>
    item.data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const createTourismClusterIcon = (cluster: any) => {
    return L.divIcon({
      html: `<div style="background-color:rgba(16,185,129,0.85);border-radius:50%;color:white;display:flex;align-items:center;justify-content:center;width:38px;height:38px;"><span style="font-size:14px;font-weight:bold;">${cluster.getChildCount()}</span></div>`,
      className: 'tourism-cluster-icon',
      iconSize: L.point(44, 44, true),
    });
  };

  const createAmenitiesClusterIcon = useMemo(
    () => (cluster: any) => {
      let size = currentZoom < 15 ? 26 : currentZoom < 17 ? 32 : 38;
      let fontSize = currentZoom < 15 ? 11 : currentZoom < 17 ? 13 : 14;
      return L.divIcon({
        html: `<div style="background-color:rgba(147,51,234,0.85);border-radius:50%;color:white;display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;font-weight:bold;box-shadow:0 2px 4px rgba(0,0,0,0.25);"><span style="font-size:${fontSize}px;">${cluster.getChildCount()}</span></div>`,
        className: 'amenities-cluster-icon',
        iconSize: L.point(size, size, true),
      });
    },
    [currentZoom]
  );

  const renderSidebarPanel = () => (
    <div className="flex flex-col h-full gap-2">
      {/* Category Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
        <button
          type="button"
          onClick={() => {
            setActiveCategory('tourism');
            if (tourism.length > 0) setSelectedPlace(tourism[0]);
          }}
          className={`py-1.5 px-1 text-[11px] font-semibold rounded-md transition-all text-center truncate cursor-pointer ${
            activeCategory === 'tourism'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          Wisata ({tourism.length})
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('culinary');
            if (culinary.length > 0) setSelectedPlace(culinary[0]);
          }}
          className={`py-1.5 px-1 text-[11px] font-semibold rounded-md transition-all text-center truncate cursor-pointer ${
            activeCategory === 'culinary'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          Kuliner ({culinary.length})
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('lodgings');
            if (lodgings.length > 0) setSelectedPlace(lodgings[0]);
          }}
          className={`py-1.5 px-1 text-[11px] font-semibold rounded-md transition-all text-center truncate cursor-pointer ${
            activeCategory === 'lodgings'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          Penginapan ({lodgings.length})
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('amenities');
            if (amenities.length > 0) setSelectedPlace(amenities[0]);
          }}
          className={`py-1.5 px-1 text-[11px] font-semibold rounded-md transition-all text-center truncate cursor-pointer ${
            activeCategory === 'amenities'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          Amenitas ({amenities.length})
        </button>
      </div>

      {/* Search Input */}
      <div className="relative shrink-0">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder={`Cari titik ${
            activeCategory === 'tourism'
              ? 'wisata'
              : activeCategory === 'culinary'
              ? 'kuliner'
              : activeCategory === 'lodgings'
              ? 'penginapan'
              : 'amenitas'
          }...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-slate-50/70"
        />
      </div>

      {/* Prev / Next Navigation Controls */}
      {selectedPlace && (
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-lg p-1.5 shrink-0 shadow-2xs">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs cursor-pointer"
            title="Ke titik sebelumnya"
          >
            <ChevronLeft size={14} />
            <span>Sebelumnya</span>
          </button>

          <span className="text-[11px] font-bold text-slate-600 px-1 truncate">
            {currentIndex >= 0 ? `${currentIndex + 1} dari ${currentCategoryItems.length}` : ''}
          </span>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs cursor-pointer"
            title="Ke titik selanjutnya"
          >
            <span>Selanjutnya</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Detail Section */}
      <div className="flex-1 bg-white rounded-lg p-2 border border-slate-100 min-h-[220px] overflow-y-auto shadow-2xs">
        {selectedPlace !== null ? (
          selectedPlace.collection === 'culinary' ? (
            <CulinaryDetail culinary={selectedPlace} />
          ) : selectedPlace.collection === 'lodgings' ? (
            <LodgingDetail lodging={selectedPlace} />
          ) : selectedPlace.collection === 'tourism' ? (
            <TourismDetail tourism={selectedPlace} />
          ) : selectedPlace.collection === 'amenities' ? (
            <AmenitiesDetail amenities={selectedPlace} />
          ) : null
        ) : (
          <div className="flex justify-center items-center py-6 text-center text-slate-500 text-xs">
            <p>Pilih titik dari daftar di bawah atau dari peta</p>
          </div>
        )}
      </div>

      {/* Compact Scrollable List View of Titik */}
      <div className="shrink-0 flex flex-col border-t border-slate-100 pt-1.5">
        <div className="flex items-center justify-between mb-1 px-1 shrink-0">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Daftar Titik ({filteredItems.length})
          </h4>
        </div>

        <div className="overflow-y-auto max-h-[85px] pr-1 space-y-0.5">
          {filteredItems.map((item, idx) => {
            const isSelected =
              selectedPlace?.data.id === item.data.id &&
              selectedPlace?.collection === activeCategory;
            return (
              <button
                key={`${activeCategory}-${item.data.id}-${idx}`}
                type="button"
                onClick={() => handleSelectPlace(item)}
                className={`w-full text-left px-2 py-1 text-[11px] rounded transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-purple-100 text-purple-900 font-semibold border border-purple-200'
                    : 'hover:bg-slate-100 text-slate-600 bg-slate-50/50 border border-transparent'
                }`}
              >
                <span className="truncate pr-1">{item.data.name}</span>
                {isSelected && <MapPin size={10} className="shrink-0 text-purple-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Sidebar */}
      <div className="h-[600px] bg-card shadow-md overflow-hidden p-4 rounded-xl md:col-span-4 hidden md:block">
        {renderSidebarPanel()}
      </div>

      {/* Mobile Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="hidden">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="p-4 h-[500px] overflow-y-auto">
            {renderSidebarPanel()}
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
          <ZoomListener onZoomChange={setCurrentZoom} />

          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            eventHandlers={{
              load: () => setMapLoading(false), // all tiles loaded
            }}
          />

          {/* Automatically fit to bounds */}
          <FitBounds culinary={culinary} lodgings={lodgings} tourism={tourism} amenities={amenities} />

          {/* Center when marker clicked */}
          <MapController selectedPlace={selectedPlace} />

          <LayersControl position="topright">
            <LayersControl.Overlay name="Lokasi Wisata" checked>
              <LayerGroup>
                <MarkerClusterGroup
                  iconCreateFunction={createTourismClusterIcon}
                  disableClusteringAtZoom={18}
                  showCoverageOnHover={false}
                  spiderfyOnMaxZoom={false}
                >
                  {tourism.map((place) => (
                    <Marker
                      key={`${place.data.id}`}
                      position={[place.data.lat, place.data.lng]}
                      icon={
                        selectedPlace !== null &&
                        selectedPlace.data.lat === place.data.lat &&
                        selectedPlace.data.lng === place.data.lng
                          ? ActiveIcon
                          : TourismIcon
                      }
                      eventHandlers={{
                        click: () => {
                          handleSelectPlace(place);
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
                          handleSelectPlace(place);
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
                          handleSelectPlace(place);
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

            <LayersControl.Overlay name="Amenitas" checked>
              <LayerGroup>
                <MarkerClusterGroup
                  iconCreateFunction={createAmenitiesClusterIcon}
                  disableClusteringAtZoom={18}
                  showCoverageOnHover={false}
                  spiderfyOnMaxZoom={false}
                >
                  {amenities.map((place) => (
                    <Marker
                      key={`${place.data.id}`}
                      position={[place.data.lat, place.data.lng]}
                      icon={
                        selectedPlace !== null &&
                        selectedPlace.data.lat === place.data.lat &&
                        selectedPlace.data.lng === place.data.lng
                          ? ActiveIcon
                          : AmenitiesIcon
                      }
                      eventHandlers={{
                        click: () => {
                          handleSelectPlace(place);
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

function ZoomListener({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  const map = useMapEvents({
    zoomend() {
      onZoomChange(map.getZoom());
    },
    zoom() {
      onZoomChange(map.getZoom());
    },
  });

  useEffect(() => {
    if (map) {
      onZoomChange(map.getZoom());
    }
  }, [map, onZoomChange]);

  return null;
}

function FitBounds({
  culinary,
  lodgings,
  tourism = [],
  amenities = [],
}: {
  culinary: CollectionEntry<'culinary'>[];
  lodgings: CollectionEntry<'lodgings'>[];
  tourism?: CollectionEntry<'tourism'>[];
  amenities?: CollectionEntry<'amenities'>[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!culinary.length && !lodgings.length && !tourism.length && !amenities.length) return;

    const bounds = L.latLngBounds([]);

    culinary.forEach((place) => {
      bounds.extend([place.data.lat, place.data.lng]);
    });

    lodgings.forEach((place) => {
      bounds.extend([place.data.lat, place.data.lng]);
    });

    tourism.forEach((place) => {
      bounds.extend([place.data.lat, place.data.lng]);
    });

    amenities.forEach((place) => {
      bounds.extend([place.data.lat, place.data.lng]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [0, 0] }); // optional padding
    }
  }, [culinary, lodgings, tourism, amenities, map]);

  return null; // This component doesn't render anything visible
}

function MapController({
  selectedPlace,
}: {
  selectedPlace: null | CollectionEntry<'culinary' | 'lodgings' | 'tourism' | 'amenities'>;
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

