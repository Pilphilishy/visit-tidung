import type { Booklet } from '@/data/booklets';
import { BookOpen, Download, FileText } from 'lucide-react';

type Props = {
  booklet: Booklet;
};

export default function BookletCardHomepage({ booklet }: Props) {
  return (
    <div className="bg-white my-4 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
      <div className="p-6 text-center">
        <div className="bg-blue-100 rounded-full p-3 inline-block mb-4">
          <FileText className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-2">
          {booklet.title}
        </h3>
        <p className="text-gray-600 mb-4">{booklet.description}</p>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex justify-between">
            <span>Penulis:</span>
            <span className="font-medium">{booklet.author}</span>
          </div>
          <div className="flex justify-between">
            <span>Halaman:</span>
            <span className="font-medium">{booklet.pages}</span>
          </div>
          <div className="flex justify-between">
            <span>Format:</span>
            <span className="font-medium">{booklet.format}</span>
          </div>
          <div className="flex justify-between">
            <span>Ukuran:</span>
            <span className="font-medium">{booklet.size}</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-gray-200 relative flex-grow h-[550px]">
        <div className="block w-full h-full">
          <img
            src={booklet.poster}
            alt={`Cover ${booklet.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
            <div className="w-full flex justify-center items-center">
              <h3 className="text-5xl font-[karimun] text-center text-white z-10">
                {booklet.title}
              </h3>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 flex gap-2">
        <a
          href={booklet.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Baca
        </a>
        <a
          href={booklet.url}
          download
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </a>
      </div>
    </div>
  );
}
