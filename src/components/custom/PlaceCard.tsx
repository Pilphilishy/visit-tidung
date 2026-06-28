import React from 'react';

function PlaceCard({ 
  slug,
  label,
  labelColor,
  title,
  description,
  info,
  image
}: {
  slug: string;
  label: string;
  labelColor: string;
  title: string;
  description: string;
  info: string;
  image: string;
}) {
  return (
    <a 
      href={`/places/${slug}`}
      className="block group h-full"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden group-hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="h-64 relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 text-white rounded-full text-xs font-medium ${labelColor}`}>
              {label}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-3">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center text-blue-600 text-sm">
            {info}
          </div>
        </div>
      </div>
    </a>
  );
}

export default PlaceCard;