import { ConfigProvider } from 'antd';
import { Outlet } from 'dumi';
import type { FC } from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useAdditionalThemeConfig from '../hooks/useAdditionalThemeConfig';
import type { SiteContextProps } from '../slots/SiteContext';
import SiteContext from '../slots/SiteContext';

type SiteState = Partial<Omit<SiteContextProps, 'updateSiteContext'>>;
const RESPONSIVE_MOBILE = 768;
const SITE_STATE_LOCALSTORAGE_KEY = 'dumi-theme-antd-site-state';

const defaultSiteState: SiteState = {
  isMobile: false,
  direction: 'ltr'
};

const GlobalLayout: FC = () => {
  const { theme: configTheme, ssr } = useAdditionalThemeConfig();
  const [{ isMobile, direction }, setSiteState] = useState<SiteState>(defaultSiteState);

  // 基于 localStorage 实现
  const updateSiteConfig = useCallback((props: SiteState) => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const localSiteState = JSON.parse(
        window.localStorage.getItem(SITE_STATE_LOCALSTORAGE_KEY) || '{}'
      );
      const nextLocalSiteState = Object.assign(localSiteState, props);
      window.localStorage.setItem(SITE_STATE_LOCALSTORAGE_KEY, JSON.stringify(nextLocalSiteState));
      setSiteState((prev) => ({
        ...prev,
        ...props
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  const updateMobileMode = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    updateSiteConfig({
      isMobile: window.innerWidth < RESPONSIVE_MOBILE
    });
  }, [updateSiteConfig]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const localSiteState = JSON.parse(
        window.localStorage?.getItem(SITE_STATE_LOCALSTORAGE_KEY) || '{}'
      );
      const siteConfig = Object.assign(defaultSiteState, localSiteState);
      updateSiteConfig(siteConfig);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [updateSiteConfig]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return () => {};
    }
    updateMobileMode();
    window.addEventListener('resize', updateMobileMode);
    return () => {
      window.removeEventListener('resize', updateMobileMode);
    };
  }, [updateMobileMode]);

  const siteContextValue = useMemo(
    () => ({
      direction,
      isMobile: isMobile!,
      updateSiteConfig
    }),
    [isMobile, direction, updateSiteConfig]
  );

  return (
    <SiteContext.Provider value={siteContextValue}>
      <ConfigProvider {...(configTheme ? { theme: configTheme } : {})}>
        <Outlet />
      </ConfigProvider>
    </SiteContext.Provider>
  );
};

export default GlobalLayout;
