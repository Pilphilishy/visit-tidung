import type { CollectionEntry } from 'astro:content';
import { Badge } from '../ui/badge';
import { MapPin, Navigation, Compass, Info } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

type Props = {
  tourism: CollectionEntry<'tourism'>;
};

function TourismDetail({ tourism }: Props) {
  return (
    <>
      <div className="text-center mb-1">
        <Badge variant="lightGreen">Lokasi Wisata</Badge>
      </div>
      <h3 className="text-lg font-semibold text-center mb-2">
        {tourism.data.name}
      </h3>

      {tourism.data.images && tourism.data.images.length > 0 && (
        <div className="mb-4">
          <Carousel>
            <CarouselContent>
              {tourism.data.images.map((image, index) => (
                <CarouselItem key={index} className="max-h-64">
                  <img
                    src={image.src}
                    alt={`${tourism.data.name} ${index + 1}`}
                    className="object-cover rounded-lg w-full h-48 md:h-52"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {tourism.data.images.length > 1 && (
              <>
                <CarouselPrevious className="left-1" />
                <CarouselNext className="right-1" />
              </>
            )}
          </Carousel>
        </div>
      )}

      {tourism.data.category && (
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-full">
            <Compass size={14} />
            {tourism.data.category}
          </span>
        </div>
      )}

      {tourism.data.description && (
        <div className="mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p className="text-xs text-slate-500 font-semibold mb-1 flex items-center gap-1">
            <Info size={14} /> Deskripsi
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {tourism.data.description}
          </p>
        </div>
      )}

      {/* Google Maps & Routing Section */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${tourism.data.lat},${tourism.data.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-sm"
        >
          <MapPin size={16} />
          Buka di Google Maps
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${tourism.data.lat},${tourism.data.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
        >
          <Navigation size={16} />
          Petunjuk Rute (Navigasi)
        </a>
      </div>
    </>
  );
}

export default TourismDetail;
