import { MenuFoldOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Menu } from 'antd';
import { Link, useLocale, useLocation, useNavData, useSiteData } from 'dumi';
import { INavItem } from 'dumi/dist/client/theme-api/types';
import React, { useCallback } from 'react';
import useAdditionalThemeConfig from '../../hooks/useAdditionalThemeConfig';
import useLocaleValue from '../../hooks/useLocaleValue';
import useSiteToken from '../../hooks/useSiteToken';
import { getTargetLocalePath, isExternalLinks } from '../../utils';
import { type IResponsive } from './index';

export interface NavigationProps {
  isMobile: boolean;
  responsive: IResponsive;
}

const useStyle = () => {
  const { token } = useSiteToken();

  const { antCls, iconCls, fontFamily, headerHeight, menuItemBorder, colorPrimary } = token;

  return {
    nav: css`
      height: 100%;
      font-size: 14px;
      font-family: Avenir, ${fontFamily}, sans-serif;
      border: 0;

      &${antCls}-menu-horizontal {
        border-bottom: none;

        & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
          min-width: auto;
          height: ${headerHeight}px;
          padding: 0 12px;
          margin: 0;
          line-height: ${headerHeight}px;

          &::after {
            top: 0;
            right: 12px;
            bottom: auto;
            left: 12px;
            border-width: ${menuItemBorder}px;
          }
        }

        & ${antCls}-menu-submenu-title ${iconCls} {
          margin: 0;
        }

        & > ${antCls}-menu-item-selected {
          a {
            color: ${colorPrimary};
          }
        }
      }

      & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
        text-align: center;
      }
    `,
    popoverMenuNav: css`
      ${antCls}-menu-item,
      ${antCls}-menu-submenu {
        text-align: left;
      }

      ${antCls}-menu-item-group-title {
        padding-left: 24px;
      }

      ${antCls}-menu-item-group-list {
        padding: 0 16px;
      }

      ${antCls}-menu-item,
      a {
        color: #333;
      }
    `
  };
};

export default function Navigation({ isMobile, responsive }: NavigationProps) {
  const { pathname, search } = useLocation();
  const { locales } = useSiteData();
  const { github, socialLinks } = useAdditionalThemeConfig();

  // 统一使用 themeConfig.nav，使用 useNavData，当存在自定义 pages 时，会导致 nav 混乱
  const navList = useNavData();
  const locale = useLocale();
  const moreLinks = useLocaleValue('moreLinks');
  const activeMenuItem = pathname.split('/').slice(0, 2).join('/');

  const createMenuItems = (navs: INavItem[]): React.ReactNode => {
    return navs.map((navItem: INavItem) => {
      const linkKeyValue = (navItem.link ?? '').split('/').slice(0, 2).join('/');
      const key = isExternalLinks(navItem.link) ? navItem.link : linkKeyValue;

      // eslint-disable-next-line no-nested-ternary
      const label = navItem.children ? (
        navItem.title
      ) : isExternalLinks(navItem.link) ? (
        <a href={`${navItem.link}${search}`} target="_blank" rel="noreferrer">
          {navItem.title}
        </a>
      ) : (
        <Link to={`${navItem.link}${search}`}>{navItem.title}</Link>
      );

      if (navItem.children) {
        return (
          <Menu.SubMenu key={key} title={label} {...({} as any)}>
            {createMenuItems(navItem.children)}
          </Menu.SubMenu>
        );
      }

      return <Menu.Item key={key}>{label}</Menu.Item>;
    });
  };
  const menuItems = createMenuItems(navList);

  // 获取小屏幕下多语言导航栏节点
  const getLangNode = useCallback((): React.ReactNode => {
    if (locales.length < 2) {
      return null;
    }
    if (locales.length === 2) {
      const nextLang = locales.filter((item) => item.id !== locale.id)[0];
      const nextPath = getTargetLocalePath({
        current: locale,
        target: nextLang
      });
      return (
        <Menu.Item key={nextLang.id}>
          <a rel="noopener noreferrer" href={nextPath}>
            {nextLang.name}
          </a>
        </Menu.Item>
      );
    }
    return (
      <Menu.SubMenu key="multi-lang" title={<span>{locale.name}</span>} {...({} as any)}>
        {locales
          .filter((item) => item.id !== locale.id)
          .map((item) => {
            const nextPath = getTargetLocalePath({
              current: locale,
              target: item
            });
            return (
              <Menu.Item key={item.id}>
                <a rel="noopener noreferrer" href={nextPath}>
                  {item.name}
                </a>
              </Menu.Item>
            );
          })}
      </Menu.SubMenu>
    );
  }, [locale, locales]);

  // 从 moreLinks 创建菜单项
  const moreLinksItems: React.ReactNode[] =
    moreLinks && Array.isArray(moreLinks) && moreLinks.length > 0
      ? moreLinks.map((item, index) => (
          <Menu.Item key={`more-${index}`}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.text}
            </a>
          </Menu.Item>
        ))
      : [];
  const additionalItems: React.ReactNode[] = [
    github || socialLinks?.github ? (
      <Menu.Item key="github">
        <a rel="noopener noreferrer" href={github || socialLinks?.github} target="_blank">
          GitHub
        </a>
      </Menu.Item>
    ) : null,
    getLangNode(),
    ...moreLinksItems
  ].filter(Boolean) as React.ReactNode[];

  let additional: React.ReactNode[] = [];
  if (isMobile) {
    additional = additionalItems;
  } else if (responsive === 'crowded') {
    additional = [
      <Menu.SubMenu key="additional" title={<MenuFoldOutlined />} {...({} as any)}>
        {additionalItems}
      </Menu.SubMenu>
    ];
  }

  const menuMode = isMobile ? 'inline' : 'horizontal';
  const style = useStyle();
  return (
    <Menu mode={menuMode} css={style.nav} selectedKeys={[activeMenuItem]}>
      {menuItems}
      {additional}
    </Menu>
  );
}
