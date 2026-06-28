import React, { useRef, useEffect } from 'react';
import { MapPin , Calendar, Utensils } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SectionSubHeading from './SectionSubHeading';
import Makam from "@/assets/images/history/makam-pulau-tidung.jpeg";

function HistorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="history"
      ref={sectionRef}
      className="py-10 px-4 bg-white opacity-0 transform translate-y-10 transition-all duration-500"
    >
      <div className="container mx-auto max-w-6xl">
        <SectionHeading>Sejarah dan Budaya Pulau Tidung</SectionHeading>
        <SectionSubHeading>
          Temukan kekayaan sejarah maritim dan warisan budaya yang membentuk
          identitas Pulau Tidung
        </SectionSubHeading>

        <div className="grid lg:grid-cols-2 gap-6 items-left">
          <div className="relative">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
              <span className="text-gray-500">Sejarah Image</span>
              <img src={Makam.src} alt="Sejarah" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-xl" />
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                  Makam Raja Tidung XIII
                </h3>
                <p className="text-lg">
                Pada masa kolonial, Pulau Tidung sebagai salah satu tempat pengasingan. Konon, seorang bangsawan dari Kerajaan Tidung, Kalimantan, 
                diasingkan ke pulau ini oleh penjajah Belanda. Dari nama inilah, Pulau Tidung mendapatkan identitasnya. 
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                  Sedekah Muharam Bubur Merah Putih
                </h3>
                <p className="text-lg">
                  Tradisi tahunan dalam kalender Islam dimana setiap Bulan Muharam, warga Pulau Tidung mengadakan
                  perayaan berupa membuat dan mengaduk Bubur Merah Putih bersama-sama dalam wajan yang besar. Hasil pembuatan bubur kemudian akan
                  dibagikan ke warga sekitar. Tradisi ini dilakukan selama Bulan Muharam untuk tiap RT di Pulau Tidung
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                  Tradisi dan Kearifkan Lokal Pulau Tidung
                </h3>
                <p className="text-lg ">
                  Salah satu tradisi yang masih dilestarikan adalah "Selametan Laut", 
                  sebuah ritual doa bersama untuk memohon perlindungan dari laut dan keberkahan hasil tangkapan ikan. 
                  Selain itu, seni kerajinan tangan seperti anyaman bambu dan daun kelapa menjadi bagian penting dari kehidupan mereka.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol untuk menuju halaman sejarah lengkap */}
        <div className="text-center mt-16">
          <a
            href="/history"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-teal-600 transition-colors duration-300"
          >
            Jelajahi Sejarah Lengkap
          </a>
        </div>
      </div>
    </section>
  );
}

export default HistorySection;
