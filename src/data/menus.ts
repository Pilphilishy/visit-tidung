export type Menu = {
  title: string;
  href?: string;
  scrollTarget?: string; // Tambahkan tanda tanya untuk optional property
  dropdownItems?: { title: string; href: string }[]; // Tambahkan dropdownItems untuk menu dengan dropdown
}

export const menus: Menu[] = [
  {
    title: 'Beranda',
    href: '/',
  },
  {
    title: "Tempat Wisata",
    href: "/places",
    scrollTarget: "places", // Menambahkan scrollTarget untuk section places
    dropdownItems: [
      { title: "Jembatan Cinta", href: "/places/jembatan-cinta" },
      { title: "Pulau Payung", href: "/places/pulau-payung" },
      { title: "Saung Sunset", href: "/places/saung-sunset" },
      { title: "Tempat Wisata Lainnya!", href: "/places" },
    ]
  },
  {
    title: 'Kuliner',
    href: '/culinary',
    scrollTarget: 'culinary-section'
  },
  {
    title: 'Sejarah',
    href: '/history',
    scrollTarget: 'history'
  },
  {
    title: 'Peta', 
    href: '/maps', 
    scrollTarget: 'maps' 
  },
  {
    title: "Artikel",
    href: '/articles',
    scrollTarget: "articles",
    dropdownItems: [
      { 
        title: "Analisis Komponen Dasar Pariwisata di Pulau Tidung dengan Daya Tarik Bahari", 
        href: "/articles/analisis-komponen-dasar-pariwisata-di-pulau-tidung-dengan-daya-tarik-bahari" 
      },
      { 
        title: "Studi Kelayakan Ekowisata Pulau Tidung", 
        href: "/articles/studi-kelayakan-ekowisata-pulau-tidung" 
      },
      { 
        title: "Jelajahi keindahan permata Laut Jawa, Pulau Payung!", 
        href: "/articles/jelajahi-keindahan-permata-laut-jawa-pulau-payung" 
      },
      { 
        title: "Artikel Menarik Lainnya!", 
        href: "/articles" 
      }
    ]
  },
  {
    title: 'Booklet',
    href: '/booklets',
    scrollTarget: 'booklets'
  },
];