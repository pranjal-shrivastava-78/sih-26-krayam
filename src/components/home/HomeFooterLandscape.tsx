import React from 'react';
import { KrayamFooter } from '../common/KrayamFooter';

interface HomeFooterProps {
  onNavigateToAuth?: () => void;
}

export const HomeFooterLandscape: React.FC<HomeFooterProps> = () => {
  return <KrayamFooter />;
};

export default HomeFooterLandscape;
