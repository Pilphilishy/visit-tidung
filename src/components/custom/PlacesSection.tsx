import type { CollectionEntry } from 'astro:content';
import SectionHeading from './SectionHeading';
import SectionSubHeading from './SectionSubHeading';
import {
  ArrowRight,
  Mountain,
  Sunset,
  Umbrella,
} from 'lucide-react';

type Props = {
  places: CollectionEntry<'places'>[];
};

function PlacesSection({ places }: Props) {
  return (
    <section
      id="places"
      className="py-4 px-4 bg-gradient-to-r from-slate-50 to-blue-50 opacity-0 transform transition-all duration-500"
    >
      <div className="py-12 max-w-6xl mx-auto">
        {/* <!-- Section Header --> */}
        <SectionHeading>Tempat yang Wajib Dikunjungi</SectionHeading>
        <SectionSubHeading>
          Jelajahi keindahan alam yang memukau
        </SectionSubHeading>

        {/* <!-- Places Grid --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {places.map((place, index) => (
            <a href={`/places/${place.id}`} key={index}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={place.data.featuredImage.src}
                    alt={place.data.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    {place.data.title === 'Jembatan Cinta' ? (
                      <Mountain className="w-5 h-5 text-blue-600 mr-2" />
                    ) : place.data.title === 'Pulau Payung' ? (
                      <Umbrella className="w-5 h-5 text-blue-600 mr-2" />
                    ) : place.data.title === 'Saung Sunset' ? (
                      <Sunset className="w-5 h-5 text-blue-600 mr-2" />
                    ) : (
                      <Mountain className="w-5 h-5 text-blue-600 mr-2" />
                    )}
                    <h3 className="text-xl font-bold text-gray-900">
                      {place.data.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {place.data.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/places"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 hover:from-blue-600 hover:via-cyan-500 hover:to-green-500 text-white font-semibold rounded-lg transition-all duration-200 group shadow-lg"
          >
            Kunjungi Wisata Ikonik Lainnya!
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default PlacesSection;
