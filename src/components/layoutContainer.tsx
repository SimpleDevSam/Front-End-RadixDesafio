import React from 'react';

interface LayoutContainerProps {
  children: React.ReactNode;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div className="p-8 min-h-screen space flex flex-col space-y-16 mx-48">
      {children}
    </div>
  );
};

export default LayoutContainer;