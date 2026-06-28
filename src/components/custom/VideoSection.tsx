import { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import SectionSubHeading from './SectionSubHeading';

export default function VideoSection() {
  const videoRef = useRef<HTMLIFrameElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

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
          className="relative opacity-0 transform transition-all duration-500 rounded-sm overflow-hidden"
        >
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/uPcuEAdI-qw?si=PaxPTwByrJQ_n2Gq"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="aspect-video"
          ></iframe>
        </div>

        <div
          ref={textContainerRef}
          className="h-full flex justify-center items-center order-first opacity-0 transform transition-all duration-500"
        >
          <div className="text-start">
            <SectionHeading className="md:text-start">
              Intip Keindahan <br /> Pulau Tidung
            </SectionHeading>
            <SectionSubHeading className="md:text-start">
              Biarkan pesonanya berbicara lewat video singkat ini
            </SectionSubHeading>
          </div>
        </div>
      </div>
    </section>
  );
}
