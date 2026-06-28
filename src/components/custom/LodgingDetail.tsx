import type { CollectionEntry } from 'astro:content';
import { Badge } from '../ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import {
  Armchair,
  Banknote,
  Bath,
  House,
  MapPin,
  Phone,
  ScrollText,
  Users,
} from 'lucide-react';

type Props = {
  lodging: CollectionEntry<'lodgings'>;
};

export default function LodgingDetail({ lodging }: Props) {
  return (
    <>
      <div className="text-center mb-1">
        <Badge variant="lightBlue">Penginapan</Badge>
      </div>
      <h3 className="text-lg font-semibold text-center mb-3">
        {lodging.data.name}
      </h3>
      {lodging.data.images && lodging.data.images.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {lodging.data.images.map((image, index) => (
              <CarouselItem key={index} className="max-h-64">
                <img
                  src={image.src}
                  alt={`${lodging.data.name} ${index + 1}`}
                  className="object-cover rounded-lg w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      ) : (
        <div className="bg-gray-200 p-4 rounded-sm text-center">
          <p className="text-gray-700">Tidak ada gambar</p>
        </div>
      )}
      <div className="mt-3 grid gap-4">
        {/* Address */}
        <div>
          <p className="text-sm text-gray-600 font-semibold flex gap-2 items-center">
            <MapPin size={18} /> Alamat
          </p>
          <p className="text-sm text-gray-600">{lodging.data.address ?? '-'}</p>
        </div>

        {/* Type */}
        <div>
          <p className="text-sm text-gray-600 font-semibold flex gap-2 items-center">
            <House size={18} /> Tipe
          </p>
          <p className="text-sm text-gray-600">{lodging.data.type ?? '-'}</p>
        </div>

        {/* Capacity */}
        <div>
          <p className="text-sm text-gray-600 font-semibold flex gap-2 items-center">
            <Users size={18} /> Kapasitas
          </p>
          <p className="text-sm text-gray-600">
            {lodging.data.capacity ? lodging.data.capacity + ' orang' : '-'}
          </p>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm text-gray-600 font-semibold flex gap-2 items-center">
            <Banknote size={18} /> Harga
          </p>
          {lodging.data.lowerPrice && lodging.data.upperPrice ? (
            <p className="text-sm text-gray-600">
              {lodging.data.lowerPrice === lodging.data.upperPrice
                ? 'Rp' + lodging.data.lowerPrice.toLocaleString('id')
                : 'Rp' +
                  lodging.data.lowerPrice.toLocaleString('id') +
                  '—' +
                  'Rp' +
                  lodging.data.upperPrice.toLocaleString('id')}
            </p>
          ) : (
            <p className="text-sm text-gray-600">Tidak diketahui</p>
          )}
        </div>

        {/* Bathroom Type */}
        <div>
          <p className="text-sm text-gray-600 font-semibold flex gap-2 items-center">
            <Bath size={18} /> Tipe Kamar Mandi
          </p>
          <p className="text-sm text-gray-600">
            {lodging.data.bathroomType ?? '-'}
          </p>
        </div>

        {/* Facilities */}
        <div>
          <p className="text-sm text-gray-600 font-semibold flex gap-2 items-center">
            <Armchair size={18} /> Fasilitas
          </p>
          <div className="text-sm text-gray-600">
            <ul className="grid grid-cols-2 gap-1">
              {lodging.data.facilities && lodging.data.facilities.length > 0 ? (
                lodging.data.facilities.map((facility, index) => (
                  <li key={index} className="list-disc list-inside">
                    {facility}
                  </li>
                ))
              ) : (
                <li className="list-disc list-inside">-</li>
              )}
            </ul>
          </div>
        </div>

        {/* Note */}
        <div>
          <p className="text-sm text-gray-600 font-semibold flex gap-2 items-center">
            <ScrollText size={18} /> Catatan
          </p>
          <p className="text-sm text-gray-600">{lodging.data.note ?? '-'}</p>
        </div>

        {/* Phone */}
        <div>
          <p className="text-sm text-gray-600 font-semibold flex gap-2 items-center">
            <Phone size={18} /> Telepon/WA
          </p>
          <p className="text-sm text-gray-600">{lodging.data.phone ?? '-'}</p>
        </div>
      </div>
    </>
  );
}
