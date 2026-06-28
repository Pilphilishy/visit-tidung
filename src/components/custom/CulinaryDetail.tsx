import type { CollectionEntry } from 'astro:content';
import { Badge } from '../ui/badge';

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
    </>
  );
}

export default CulinaryDetail;
