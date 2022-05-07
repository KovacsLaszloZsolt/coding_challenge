import React from 'react';
import Image from 'next/image';
import logo from '../public/food-logo.png';

const Logo = (): JSX.Element => {
  return <Image src={logo} alt="Food logo" width={140} height={70} />;
};

export default Logo;
