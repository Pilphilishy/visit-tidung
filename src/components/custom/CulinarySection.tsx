import { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import SectionSubHeading from './SectionSubHeading';
import type { CollectionEntry } from 'astro:content';
import TraditionalFoodCollapsible from './TraditionalFoodCollapsible';

type Props = {
  traditionalFoods: CollectionEntry<'traditionalFoods'>[];
};

function CulinarySection({ traditionalFoods }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && sectionRef.current) {
          sectionRef.current.classList.remove('opacity-0', 'translate-y-10');
          sectionRef.current.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="culinary-section"
      ref={sectionRef}
      className="py-10 px-4 bg-gradient-to-r from-slate-50 to-blue-50 transform opacity-0 translate-y-10 transition-all duration-500"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading>Kuliner Khas</SectionHeading>

        <SectionSubHeading>
          Rasakan cita rasa otentik hidangan lokal Pulau Tidung
        </SectionSubHeading>

        <TraditionalFoodCollapsible traditionalFoods={traditionalFoods} />

        <div className="text-center mt-8">
          <a
            href="/culinary"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 hover:from-blue-600 hover:via-cyan-500 hover:to-green-500 text-white font-semibold rounded-lg transition-all duration-200 group shadow-lg"
          >
            Ketahui Kuliner Khas Tidung Lainnya!
          </a>
        </div>
      </div>
    </section>
  );
}

export default CulinarySection;
