import type { Booklet } from '@/data/booklets';
import { FileText } from 'lucide-react';

type Props = {
  booklet: Booklet;
};

export default function BookletCard({ booklet }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Poster PDF sebagai halaman pertama */}
      <div className="relative md:h-125 overflow-hidden group pointer flex items-start">
        <img
          src={booklet.poster}
          alt={`Cover ${booklet.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
          <div className="w-full flex justify-center items-center">
            <h3 className="text-5xl font-[karimun] text-center text-white">
              {booklet.title}
            </h3>
          </div>
        </div>

        {/* Overlay ikon PDF */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      <div className="p-6">
        {/* Tambahkan informasi author di sini */}
        <div className="flex items-center mb-3 justify-center">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800 text-center">
              {booklet.author}
            </span>
            <span className="text-xs text-gray-500 text-center">
              {booklet.authorRole}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-center">{booklet.description}</p>

        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <div className="flex justify-between">
            <span>Halaman:</span>
            <span>{booklet.pages}</span>
          </div>
          <div className="flex justify-between">
            <span>Format:</span>
            <span>{booklet.format}</span>
          </div>
          <div className="flex justify-between">
            <span>Ukuran:</span>
            <span>{booklet.size}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={booklet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Baca
          </a>
          <a
            href={booklet.url}
            download
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
