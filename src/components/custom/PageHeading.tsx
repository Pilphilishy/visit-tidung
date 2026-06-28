import React from 'react';

type Props = {
  className?: string;
};

function PageHeading({
  children,
  className,
}: Props & { children: React.ReactNode }) {
  return (
    <h1
      className={`text-6xl font-[Karimun] text-primary text-center ${className}`}
    >
      {children}
    </h1>
  );
}

export default PageHeading;
