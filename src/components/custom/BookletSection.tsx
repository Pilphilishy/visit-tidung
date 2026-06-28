import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SectionHeading from './SectionHeading';
import SectionSubHeading from './SectionSubHeading';
import { booklets } from '@/data/booklets';
import BookletCardHomepage from './BookletCardHomepage';

function BookletSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  
  // State untuk menentukan jumlah slide yang ditampilkan berdasarkan lebar layar
  const [slidesPerView, setSlidesPerView] = useState(3);
  
  // Mengatur jumlah slide per view dan tinggi preview berdasarkan lebar layar
  useEffect(() => {
    const updateSlidesSettings = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3); // ✅ jadi 4 booklet per slide
      }
    };

    updateSlidesSettings();
    window.addEventListener('resize', updateSlidesSettings);

    return () => {
      window.removeEventListener('resize', updateSlidesSettings);
    };
  }, []);

  // Animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
          if (entry.target === containerRef.current) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const featuredBooklets = booklets.slice(0, 5);

  return (
    <section 
      id="booklets"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50 transform translate-y-10 transition-all duration-500"
    >
      <div className="container mx-auto px-4">
        <div ref={containerRef} className="text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-500">
          <SectionHeading>
            Booklet
          </SectionHeading>
          <SectionSubHeading>
            Baca dan unduh booklet lengkap untuk petualangan Pulau Tidung Anda
          </SectionSubHeading>
        </div>

        <div className="relative pb-6 mx-4 lg:mx-0">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={slidesPerView}
            navigation={{
              nextEl: '.booklets-next',
              prevEl: '.booklets-prev',
              disabledClass: 'swiper-button-disabled',
            }}
            watchSlidesProgress={true}
            watchOverflow={true}
            onSlideChange={(swiper) => {
              // Disable prev button di awal
              if (swiper.isBeginning) {
                document
                  .querySelector('.booklets-prev')
                  ?.classList.add('pointer-events-none', 'opacity-50');
              } else {
                document
                  .querySelector('.booklets-prev')
                  ?.classList.remove('pointer-events-none', 'opacity-50');
              }

              // Disable next button di akhir
              if (swiper.isEnd) {
                document
                  .querySelector('.booklets-next')
                  ?.classList.add('pointer-events-none', 'opacity-50');
              } else {
                document
                  .querySelector('.booklets-next')
                  ?.classList.remove('pointer-events-none', 'opacity-50');
              }
            }}
            onInit={(swiper) => {
              // Cek kondisi awal
              if (swiper.isBeginning) {
                document
                  .querySelector('.booklets-prev')
                  ?.classList.add('pointer-events-none', 'opacity-50');
              }
              if (swiper.isEnd) {
                document
                  .querySelector('.booklets-next')
                  ?.classList.add('pointer-events-none', 'opacity-50');
              }
            }}
            pagination={{
              clickable: true,
              el: '.booklets-pagination',
              type: 'bullets',
            }}
            className="mySwiper pb-12"
          >
            {featuredBooklets.map((booklet, index) => (
              <SwiperSlide key={index}>
                <BookletCardHomepage booklet={booklet} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="booklets-prev absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="booklets-next absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-100 transition-colors flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Pagination untuk mobile */}
          <div className="booklets-pagination flex justify-center mt-6 space-x-2 md:hidden" />
        </div>
        
        {/* Tombol untuk menuju halaman booklet lengkap */}
        <div className="text-center mt-16">
          <a 
            href="/booklets" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Lihat Semua Booklet
          </a>
        </div>
      </div>
    </section>
  );
}

export default BookletSection;