import React from 'react';

interface MainTitleProps {
    message?:string
}

const MainTitle = (props:MainTitleProps) => {

  return (
    <h1 className="text-2xl font-bold text-custom-purple">{props.message}</h1>
  );
};

export default MainTitle;
