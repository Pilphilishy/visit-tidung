import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { CollectionEntry } from 'astro:content';
import { ChevronDown } from 'lucide-react';

type Props = {
  traditionalFoods: CollectionEntry<'traditionalFoods'>[];
};

export default function TraditionalFoodCollapsible({
  traditionalFoods,
}: Props) {
  return (
    <div className="w-full grid gap-4">
      {traditionalFoods.map((food) => (
        <Collapsible
          key={food.id}
          className="border rounded-lg bg-card shadow-sm overflow-hidden"
        >
          <CollapsibleTrigger className="flex flex-col sm:gap-4 sm:flex-row w-full items-center text-left p-4 hover:bg-muted transition-colors group">
            {/* Image */}
            <div className="w-full md:w-2/3 h-48 overflow-hidden rounded-md">
              <img
                src={food.data.featuredImage.src}
                alt={food.data.name}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Title */}
            <div className="w-full flex mt-3 justify-between items-center">
              <h2 className="text-5xl font-[Karimun] text-primary">
                {food.data.name}
              </h2>
              <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="p-4 prose max-w-none">
              {food.data.definition && (
                <>
                  <h3>Definisi</h3>
                  <p>{food.data.definition}</p>
                </>
              )}
              {food.data.productName && (
                <>
                  <h3>Nama Produk</h3>
                  <p>{food.data.productName}</p>
                </>
              )}
              <h3>Bahan</h3>
              <p>{food.data.ingredients}</p>
              {food.data.philosophy && (
                <>
                  <h3>Filosofi</h3>
                  <p>{food.data.philosophy}</p>
                </>
              )}
              {food.data.creation && (
                <>
                  <h3>Pembuatan</h3>
                  <p>{food.data.creation}</p>
                </>
              )}
              {food.data.images && food.data.images.length > 0 && (
                <>
                  <h3>Foto {food.data.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 not-prose">
                    {food.data.images.map((image) => (
                      <img
                        key={image.src}
                        src={image.src}
                        alt={food.data.name}
                        className="object-cover w-full h-48 rounded-md"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
