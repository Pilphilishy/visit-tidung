import React from 'react';

type Props = {
  className?: string;
}

function SectionSubHeading({ children, className }: Props & { children: React.ReactNode }) {
  return (
    <p className={`text-lg text-foreground text-center mb-16 ${className}`}>{children}</p>
  );
}

export default SectionSubHeading;
