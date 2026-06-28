import RuangTerbukaDanGazebo from '../../assets/images/articles/ruang-terbuka-dan-gazebo.jpg';
import TempatSampah from '../../assets/images/articles/tempat-sampah.jpg';
import PusatInformasiPariwisata from '../../assets/images/articles/pusat-informasi-pariwisata.jpg';
import Mushola from '../../assets/images/articles/mushola-dan-tempat-wudhu.jpg';
import Toilet from '../../assets/images/articles/toilet.jpg';
import TamanBermainDanOlahraga from '../../assets/images/articles/taman-bermain-dan-olahraga.jpg';
import KantorPolisi from '../../assets/images/articles/kantor-polisi.jpg';
import Puskesmas from '../../assets/images/articles/puskesmas.jpg';
import ATMDKI from '../../assets/images/articles/atm-dki.jpg';
import ATMBNI from '../../assets/images/articles/atm-bni.jpg';

export default function MasonryGridAmenities() {
  const images = [
    {
      image: RuangTerbukaDanGazebo,
      alt: 'Ruang Terbuka dan Gazebo',
    },
    {
      image: TempatSampah,
      alt: 'Tempat Sampah',
    },
    {
      image: PusatInformasiPariwisata,
      alt: 'Pusat Informasi Pariwisata',
    },
    {
      image: Mushola,
      alt: 'Mushola',
    },
    {
      image: Toilet,
      alt: 'Toilet',
    },
    {
      image: TamanBermainDanOlahraga,
      alt: 'Taman Bermain dan Olahraga',
    },
    {
      image: KantorPolisi,
      alt: 'Kantor Polisi',
    },
    {
      image: Puskesmas,
      alt: 'Puskesmas',
    },
    {
      image: ATMDKI,
      alt: 'ATM DKI',
    },
    {
      image: ATMBNI,
      alt: 'ATM BNI',
    },
  ];

  return (
    <div className="columns-1 gap-2 sm:columns-2 md:columns-2 lg:columns-3 [&>div:not(:first-child)]:mt-2 not-prose">
      {images.map((image, imgIndex) => (
        <div key={imgIndex} className="overflow-hidden rounded-sm">
          <img
            className="h-auto w-full"
            src={image.image.src}
            alt={`Amenitas ${imgIndex}`}
            loading="lazy"
          />
          <p className="text-center text-sm">{image.alt}</p>
        </div>
      ))}
    </div>
  );
}
