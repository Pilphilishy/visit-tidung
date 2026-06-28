import { useRef, useState, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import SectionSubHeading from './SectionSubHeading';

export default function VideoTidungKecilSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.setAttribute('controls', 'true');
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section fade in
          if (entry.target === sectionRef.current) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
          // Video container slide in from left
          if (entry.target === videoContainerRef.current) {
            entry.target.classList.remove('opacity-0', '-translate-x-10');
            entry.target.classList.add('opacity-100', 'translate-x-0');
          }
          // Text container slide in from right
          if (entry.target === textContainerRef.current) {
            entry.target.classList.remove('opacity-0', 'translate-x-10');
            entry.target.classList.add('opacity-100', 'translate-x-0');
          }
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (videoContainerRef.current) observer.observe(videoContainerRef.current);
    if (textContainerRef.current) observer.observe(textContainerRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (videoContainerRef.current)
        observer.unobserve(videoContainerRef.current);
      if (textContainerRef.current)
        observer.unobserve(textContainerRef.current);
    };
  }, []);

  return (
    <section
      id="video-section"
      ref={sectionRef}
      className="py-20 px-4 bg-white transform translate-y-10 opacity-0 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto relative grid md:grid-cols-2 md:gap-8">
        <div
          ref={videoContainerRef}
          className="relative opacity-0 transform transition-all duration-500"
        >
          <div className="relative w-full max-w-xs aspect-[9/16] mx-auto">
            <video
              ref={videoRef}
              playsInline
              className="w-full h-full rounded-sm"
              poster="/images/poster-video-promosi-pulau-tidung-kecil.png"
            >
              <source
                src="/videos/promosi-pulau-tidung-kecil.mp4"
                type="video/mp4"
              />
            </video>

            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition rounded-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div
          ref={textContainerRef}
          className="h-full flex justify-center md:justify-start items-center order-first md:order-last opacity-0 transform transition-all duration-500"
        >
          <div className="text-start">
            <SectionHeading className="md:text-start">
              Menyapa Tidung Kecil
            </SectionHeading>
            <SectionSubHeading className="md:text-start">
              Jejak Sunyi di Ujung Jembatan Cinta
            </SectionSubHeading>
          </div>
        </div>
      </div>
    </section>
  );
}
