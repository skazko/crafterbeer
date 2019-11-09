import React from 'react';
import { CRAFTER_LOGO } from '../../constants';

const Logo = ({size}) => {
  return <img height={size} width={size} src={CRAFTER_LOGO} alt="Логотип Крафтер"/>
}

export default Logo;