import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SectionHeading from './SectionHeading';
import SectionSubHeading from './SectionSubHeading';
import type { CollectionEntry } from 'astro:content';
import { generateExcerpt } from '@/utils';

type Props = {
  articles: CollectionEntry<'articles'>[];
};

function ArticleSection({ articles }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('opacity-100', 'translate-y-0');
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

  return (
    <section
      id="articles"
      ref={sectionRef}
      className="py-20 bg-white opacity-0 transform translate-y-10 transition-all duration-500"
    >
      <div className="container mx-auto px-4">
        <div
          ref={containerRef}
          className="text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-500"
        >
          <SectionHeading>Artikel Terkait</SectionHeading>
          <SectionSubHeading>
            Jelajahi artikel menarik tentang Pulau Tidung
          </SectionSubHeading>
        </div>

        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.articles-next',
              prevEl: '.articles-prev',
              disabledClass: 'swiper-button-disabled',
            }}
            watchSlidesProgress={true}
            watchOverflow={true}
            onSlideChange={(swiper) => {
              // Disable prev button di awal
              if (swiper.isBeginning) {
                document
                  .querySelector('.articles-prev')
                  ?.classList.add('pointer-events-none', 'opacity-50');
              } else {
                document
                  .querySelector('.articles-prev')
                  ?.classList.remove('pointer-events-none', 'opacity-50');
              }

              // Disable next button di akhir
              if (swiper.isEnd) {
                document
                  .querySelector('.articles-next')
                  ?.classList.add('pointer-events-none', 'opacity-50');
              } else {
                document
                  .querySelector('.articles-next')
                  ?.classList.remove('pointer-events-none', 'opacity-50');
              }
            }}
            onInit={(swiper) => {
              // Cek kondisi awal
              if (swiper.isBeginning) {
                document
                  .querySelector('.articles-prev')
                  ?.classList.add('pointer-events-none', 'opacity-50');
              }
              if (swiper.isEnd) {
                document
                  .querySelector('.articles-next')
                  ?.classList.add('pointer-events-none', 'opacity-50');
              }
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper pb-12"
          >
            {articles.map((article, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white mb-4 mt-4 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.data.featuredImage.src}
                      alt={article.data.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2">
                      {article.data.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                      {generateExcerpt(article.body || article.data.title)}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{article.data.author}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(
                          article.data.publishedDate
                        ).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <a
                        href={`/articles/${article.id}`}
                        className="text-blue-50 font-medium px-4 py-2 rounded-full transition-colors duration-200 shadow-sm bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:shadow-md"
                      >
                        Baca Selengkapnya
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="articles-prev absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button className="articles-next absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Tombol untuk menuju halaman artikel lengkap */}
        <div className="text-center mt-16">
          <a
            href="/articles"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg transition-all duration-300"
          >
            Lihat Semua Artikel
          </a>
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;
