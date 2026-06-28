import React from 'react';

type Props = {
  className?: string;
}

function SectionHeading({ children, className }: Props & { children: React.ReactNode }) {
  return (
    <h2 className={`text-6xl font-[Karimun] text-primary text-center ${className}`}>
      {children}
    </h2>
  );
}

export default SectionHeading;
