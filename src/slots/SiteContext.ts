import { createContext } from 'react';
import type { DirectionType } from 'antd/lib/config-provider';

export interface SiteContextProps {
  isMobile: boolean;
  direction: DirectionType;
  updateSiteConfig: (props: Partial<SiteContextProps>) => void;
}

const SiteContext = createContext<SiteContextProps>({
  isMobile: false,
  direction: 'ltr',
  updateSiteConfig: () => {}
});

export default SiteContext;
