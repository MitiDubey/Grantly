import React from 'react';
import { LandingPage } from '../components/landing/LandingPage';

interface LandingProps {
  onEnterApp: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnterApp }) => {
  return <LandingPage onEnterApp={onEnterApp} />;
};
