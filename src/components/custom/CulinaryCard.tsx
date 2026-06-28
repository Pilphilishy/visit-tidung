import React from 'react';

function CulinaryCard({ 
  title, 
  description,
  image,
  rating
}: {
  title: string;
  description: string;
  image: string;
  rating?: number;
}) {
  // Fungsi untuk menampilkan bintang rating
  const renderRating = () => {
    // Jika rating tidak ada, jangan render apa-apa
    if (rating === undefined || rating === null) return null;
    
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="block group h-full">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden group-hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="h-48 relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <div className="w-12 h-1 bg-blue-500 rounded-full my-2"></div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
            {description}
          </p>
          
          {/* Hanya tampilkan rating jika rating tidak undefined */}
          {rating !== undefined && rating !== null && (
            <div className="flex justify-between items-center mt-2">
              <div className="flex">
                {renderRating()}
              </div>
              
              <div className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                {rating}/5
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CulinaryCard;