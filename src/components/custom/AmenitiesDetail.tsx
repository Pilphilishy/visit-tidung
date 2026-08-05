import type { CollectionEntry } from 'astro:content';
import { Badge } from '../ui/badge';
import { MapPin, Navigation } from 'lucide-react';

type Props = {
  amenities: CollectionEntry<'amenities'>;
};

function AmenitiesDetail({ amenities }: Props) {
  return (
    <>
      <div className="text-center mb-1">
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-transparent">
          Amenitas
        </Badge>
      </div>
      <h3 className="text-lg font-semibold text-center mb-4">
        {amenities.data.name}
      </h3>

      {/* Google Maps & Routing Section */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${amenities.data.lat},${amenities.data.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-sm"
        >
          <MapPin size={16} />
          Buka di Google Maps
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${amenities.data.lat},${amenities.data.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm"
        >
          <Navigation size={16} />
          Petunjuk Rute (Navigasi)
        </a>
      </div>
    </>
  );
}

export default AmenitiesDetail;
