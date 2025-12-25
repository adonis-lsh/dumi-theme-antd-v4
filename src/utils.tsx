import React from 'react';
import { Menu } from 'antd';
import { history, useSiteData } from 'dumi';
import type { ISidebarGroup } from 'dumi/dist/client/theme-api/types';

type ILocaleItem = ReturnType<typeof useSiteData>['locales'][0];

export function getTargetLocalePath({
  pathname = history.location.pathname,
  current,
  target
}: {
  pathname?: string;
  current: ILocaleItem;
  target: ILocaleItem;
}) {
  const clearPath =
    'base' in current
      ? pathname.replace(current.base.replace(/\/$/, ''), '')
      : pathname.replace(new RegExp(`${current.suffix}$`), '');

  return 'base' in target
    ? `${target.base}${clearPath}`.replace(/^\/\//, '/')
    : `${clearPath}${target.suffix}`;
}

// 删除标题中的 HTML 标签
export const removeTitleCode = (title = '') => {
  return title.replace(/<\w+>.*<\/\w+>/g, '');
};

export const isExternalLinks = (link?: string): boolean => {
  return /^(\w+:)\/\/|^(mailto|tel):/.test(link ?? '');
};

export const handleFullSidebarData = (
  fullSidebarData: Record<string, ISidebarGroup[]>
): Record<string, ISidebarGroup[]> => {
  const nextFullSidebarData: Record<string, ISidebarGroup[]> = {};
  Object.entries(fullSidebarData).forEach(([key, value]) => {
    const existedLevelOneNavList = Object.keys(nextFullSidebarData);
    if (key.split('/').length === 3) {
      // 二级目录
      const levelOneNavKey = `/${key.split('/')[1]}`;
      let _levelTwoNav = value[0]?.children?.find((item) => {
        const _frontmatterInfo = item.frontmatter?.nav;
        return typeof _frontmatterInfo === 'object' && typeof _frontmatterInfo?.second === 'object';
      });
      // 如果是 second 配置不为对象，直接获取其值即可
      if (!_levelTwoNav) {
        _levelTwoNav = value[0]?.children[0];
      }
      // 找找二级菜单名称以及顺序
      const _levelTwoNavInfo = _levelTwoNav?.frontmatter?.nav;
      const frontmatterNavSecond: { order: number; title?: string } = {
        order: 0,
        title: undefined
      };
      if (typeof _levelTwoNavInfo !== 'string') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        frontmatterNavSecond.order = _levelTwoNavInfo?.second?.order ?? 0;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        frontmatterNavSecond.title = _levelTwoNavInfo?.second?.title ?? _levelTwoNavInfo?.second;
      }

      if (existedLevelOneNavList.includes(levelOneNavKey)) {
        // 已存在，直接 push 为 children
        nextFullSidebarData[levelOneNavKey].push({
          title: frontmatterNavSecond.title,
          order: frontmatterNavSecond.order,
          children: value[0]?.children
        });
      } else {
        nextFullSidebarData[levelOneNavKey] = value.map((item) => ({
          ...item,
          title: frontmatterNavSecond.title,
          order: frontmatterNavSecond.order
        }));
      }
    } else if (existedLevelOneNavList.includes(key)) {
      nextFullSidebarData[key] = nextFullSidebarData[key].concat(value);
    } else {
      nextFullSidebarData[key] = value;
    }
  });
  return nextFullSidebarData;
};

// Menu item 类型定义（用于转换）
export interface MenuItemType {
  key: string;
  label: React.ReactNode;
  children?: MenuItemType[];
  type?: 'group';
  order?: number;
}

/**
 * 将 Menu items 数组转换为 JSX 结构（antd 4.x 使用 children）
 */
export function convertMenuItemsToJSX(items: MenuItemType[] | undefined): React.ReactNode {
  if (!items || items.length === 0) {
    return null;
  }

  return items.map((item) => {
    if (item.type === 'group') {
      return (
        <Menu.ItemGroup key={item.key} title={item.label}>
          {item.children ? convertMenuItemsToJSX(item.children) : null}
        </Menu.ItemGroup>
      );
    }

    if (item.children && item.children.length > 0) {
      return (
        <Menu.SubMenu key={item.key} title={item.label}>
          {convertMenuItemsToJSX(item.children)}
        </Menu.SubMenu>
      );
    }

    return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
  });
}
