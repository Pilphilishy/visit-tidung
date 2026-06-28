import type { ImageMetadata } from 'astro';

type MasonryGridProps = {
  images: ImageMetadata[];
  title: string;
};

export default function MasonryGrid({ images, title }: MasonryGridProps) {
  return (
    <div className="columns-1 gap-2 sm:columns-2 md:columns-2 lg:columns-3 [&>div:not(:first-child)]:mt-2">
      {images.map((image, imgIndex) => (
        <div key={imgIndex} className="overflow-hidden rounded-sm">
          <img
            className="h-auto w-full transform transition-transform duration-400 ease-in-out hover:scale-110"
            src={image.src}
            alt={`${title} ${imgIndex}`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
