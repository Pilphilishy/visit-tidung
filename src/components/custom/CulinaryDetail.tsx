import type { CollectionEntry } from 'astro:content';
import { Badge } from '../ui/badge';
import { MapPin, Navigation } from 'lucide-react';

type Props = {
  culinary: CollectionEntry<'culinary'>;
};

function CulinaryDetail({ culinary }: Props) {
  return (
    <>
      <div className="text-center mb-1">
        <Badge variant="lightOrange">Kuliner UMKM</Badge>
      </div>
      <h3 className="text-lg font-semibold text-center">
        {culinary.data.name}
      </h3>
      <div className="mt-3">
        <h4 className="text-md font-semibold mb-3">Daftar Menu</h4>
        {culinary.data.products && culinary.data.products.length > 0 ? (
          <ul className="space-y-2">
            {culinary.data.products.map((product) => (
              <li key={product.id} className="flex justify-between">
                <span className="text-gray-600">{product.name}</span>
                <span className="text-gray-600">
                  {product.price
                    ? `Rp${product.price}`
                    : 'Harga tidak diketahui'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Tidak ada produk tersedia</p>
        )}
      </div>

      {/* Google Maps & Routing Section */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${culinary.data.lat},${culinary.data.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-sm"
        >
          <MapPin size={16} />
          Buka di Google Maps
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${culinary.data.lat},${culinary.data.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
        >
          <Navigation size={16} />
          Petunjuk Rute (Navigasi)
        </a>
      </div>
    </>
  );
}

export default CulinaryDetail;

