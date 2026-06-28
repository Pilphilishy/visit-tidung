import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';

import { AlignJustify, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { menus } from '@/data/menus';

export default function MobileMenu() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = `/#${id}`;
      }
      // Tutup menu mobile setelah memilih
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const toggleDropdown = (title: string) => {
    if (openDropdown === title) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(title);
    }
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className={isScrolled ? 'text-primary' : 'text-primary-foreground'}
      >
        <AlignJustify className="block lg:hidden cursor-pointer" size={32} />
      </SheetTrigger>
      <SheetContent side="top" className="max-h-screen overflow-y-auto gap-0">
        <div className="flex flex-col gap-2 p-4">
          <div className="text-5xl font-[Karimun]">Menu</div>
          {menus.map((menu) => {
            if (menu.dropdownItems) {
              return (
                <div key={menu.title} className="flex flex-col">
                  <div 
                    className="flex items-center justify-between font-[Karimun] text-2xl py-2 hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => toggleDropdown(menu.title)}
                  >
                    <span>{menu.title}</span>
                    {openDropdown === menu.title ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                  
                  {openDropdown === menu.title && (
                    <div className="pl-6 mt-2 flex flex-col gap-4 border-l-2 border-blue-200">
                      {menu.dropdownItems.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          className="text-sm py-1 hover:text-blue-600 transition-colors"
                          onClick={() => {
                            // Tutup menu mobile setelah memilih
                            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                          }}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            } 
            // else if (menu.scrollTarget) {
            //   return (
            //     <a
            //       key={menu.title}
            //       href={`#${menu.scrollTarget}`}
            //       onClick={(e) => {
            //         e.preventDefault();
            //         scrollToSection(menu.scrollTarget!);
            //       }}
            //       className="font-[Karimun] text-2xl py-2 hover:text-blue-600 transition-colors"
            //     >
            //       {menu.title}
            //     </a>
            //   );
            // } 
            else {
              return (
                <a
                  key={menu.title}
                  href={menu.href}
                  className="font-[Karimun] text-2xl py-2 hover:text-blue-600 transition-colors"
                >
                  {menu.title}
                </a>
              );
            }
          })}
        </div>
        <SheetFooter className='py-2'>
          <SheetClose asChild>
            <Button variant="outline" className="w-full py-6">
              Tutup Menu
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}