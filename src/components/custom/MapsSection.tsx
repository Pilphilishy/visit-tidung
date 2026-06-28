import React, { useRef, useEffect } from 'react';
import { MapPin, Clock, Calendar, Map } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SectionSubHeading from './SectionSubHeading';
import MapThumbnail from '@/assets/images/map-thumbnail.png';

function MapsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapThumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animasikan section
          if (entry.target === sectionRef.current) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
          // Animasikan container teks
          if (entry.target === containerRef.current) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
          // Animasikan card kiri
          if (entry.target === mapThumbnailRef.current) {
            entry.target.classList.remove('opacity-0', '-translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (containerRef.current) observer.observe(containerRef.current);
    if (mapThumbnailRef.current) observer.observe(mapThumbnailRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (containerRef.current) observer.unobserve(containerRef.current);
      if (mapThumbnailRef.current) observer.unobserve(mapThumbnailRef.current);
    };
  }, []);

  return (
    <section
      id="maps"
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 transform translate-y-10 transition-all duration-500"
    >
      <div className="container mx-auto px-4">
        <div
          ref={containerRef}
          className="text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-500"
        >
          <SectionHeading>Peta dan Lokasi Pulau Tidung</SectionHeading>
          <SectionSubHeading>
            Temukan cara terbaik untuk menjelajahi keindahan Pulau Tidung dengan
            peta interaktif dan informasi lokasi penting
          </SectionSubHeading>
        </div>

        <div
          ref={mapThumbnailRef}
          className="flex justify-center opacity-0 transform transition-all duration-500"
        >
          <a href="/maps">
            <div className="overflow-hidden bg-white rounded-xl shadow-lg max-w-lg group relative">
              <img
                src={MapThumbnail.src}
                alt="Map Thumbnail"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center 
                    text-white text-lg font-semibold opacity-0 transition-all duration-300
                    group-hover:bg-opacity-50 group-hover:opacity-60"
              >
                Lihat Peta
              </div>
            </div>
          </a>
        </div>

        <div className="flex justify-center mt-6">
          <a
            href="/maps"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 hover:from-blue-600 hover:via-cyan-500 hover:to-green-500 text-white font-semibold rounded-lg transition-all duration-200 group shadow-lg"
          >
            Lihat Peta
          </a>
        </div>
      </div>
    </section>
  );
}

export default MapsSection;
