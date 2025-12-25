import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ClassNames, css } from '@emotion/react';
import type { ReactElement } from 'react';
import React, { useMemo, useContext } from 'react';
import useMenu from '../hooks/useMenu';
import useSiteToken from '../hooks/useSiteToken';
import type { MenuItemType } from '../utils';
import SiteContext from '../slots/SiteContext';
import type { SiteContextProps } from '../slots/SiteContext';

const useStyle = () => {
  const { token } = useSiteToken();

  const { colorSplit, iconCls, fontSizeIcon } = token;

  return {
    prevNextNav: css`
      width: calc(100% - 234px);
      margin-inline-end: 170px;
      margin-inline-start: 64px;
      overflow: hidden;
      font-size: 14px;
      border-top: 1px solid ${colorSplit};
      display: flex;
    `,
    pageNav: `
      flex: 1;
      height: 72px;
      line-height: 72px;
      text-decoration: none;
      color: #1677ff;

      ${iconCls} {
        color: #1677ff;
        font-size: ${fontSizeIcon}px;
        transition: all 0.3s;
      }

      .chinese {
        margin-inline-start: 4px;
      }
    `,
    prevNav: `
      text-align: start;
      display: flex;
      justify-content: flex-start;
      align-item: center;

      .footer-nav-icon-after {
        display: none;
      }

      .footer-nav-icon-before {
        position: relative;
        line-height: 0;
        vertical-align: middle;
        transition: inset-inline-end 0.3s;
        margin-inline-end: 1em;
        inset-inline-end: 0;
        color: #1677ff;
      }

      &:hover .footer-nav-icon-before {
        inset-inline-end: 0.2em;
      }
    `,
    nextNav: `
      text-align: end;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .footer-nav-icon-before {
        display: none;
      }

      .footer-nav-icon-after {
        position: relative;
        margin-inline-start: 1em;
        margin-bottom: 1px;
        vertical-align: middle;
        line-height: 0;
        left: 0;
        transition: left 0.3s;
        color: #1677ff;
      }

      &:hover .footer-nav-icon-after {
        inset-inline-start: 0.2em;
      }
    `
  };
};

const flattenMenu = (menuItems: MenuItemType[] | undefined): MenuItemType[] | null => {
  if (Array.isArray(menuItems)) {
    return menuItems.reduce<MenuItemType[]>((acc, item) => {
      if (!item) {
        return acc;
      }
      if (item.children && item.children.length > 0) {
        return acc.concat(flattenMenu(item.children) ?? []);
      }
      return acc.concat(item);
    }, []);
  }
  return null;
};

const PrevAndNext: React.FC<{ rtl: boolean }> = ({ rtl }) => {
  const styles = useStyle();

  const beforeProps = { className: 'footer-nav-icon-before' };
  const afterProps = { className: 'footer-nav-icon-after' };

  const before = rtl ? <RightOutlined {...beforeProps} /> : <LeftOutlined {...beforeProps} />;
  const after = rtl ? <LeftOutlined {...afterProps} /> : <RightOutlined {...afterProps} />;

  const [menuItems, selectedKey] = useMenu({ before, after });

  const { isMobile } = useContext<SiteContextProps>(SiteContext);

  const [prev, next] = useMemo(() => {
    const flatMenu = flattenMenu(menuItems);
    if (!flatMenu) {
      return [null, null];
    }
    let activeMenuItemIndex = -1;
    flatMenu.forEach((menuItem, i) => {
      if (menuItem && menuItem.key === selectedKey) {
        activeMenuItemIndex = i;
      }
    });
    return [
      flatMenu[activeMenuItemIndex - 1] as MenuItemType,
      flatMenu[activeMenuItemIndex + 1] as MenuItemType
    ];
  }, [menuItems, selectedKey]);

  if (isMobile) {
    return null;
  }

  return (
    <section css={styles.prevNextNav}>
      <ClassNames>
        {({ css: classCss, cx }) => (
          <>
            {prev &&
              React.cloneElement(prev.label as ReactElement, {
                className: cx(classCss(styles.pageNav), classCss(styles.prevNav))
              })}
            {next &&
              React.cloneElement(next.label as ReactElement, {
                className: cx(classCss(styles.pageNav), classCss(styles.nextNav))
              })}
          </>
        )}
      </ClassNames>
    </section>
  );
};

export default PrevAndNext;
