import React from 'react';

type Props = {
  className?: string;
}

function PageSubHeading({ children, className }: Props & { children: React.ReactNode }) {
  return (
    <p className={`text-xl max-w-3xl text-center mx-auto bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 bg-clip-text text-transparent mb-16 ${className}`}>{children}</p>
  );
}

export default PageSubHeading;
