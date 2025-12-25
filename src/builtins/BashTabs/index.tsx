/**
 * bash 选项卡切换组件
 */
import { Tabs } from 'antd';
import SourceCode from 'dumi/theme-default/builtins/SourceCode';
import { type Language } from 'prism-react-renderer';
import { FC, useCallback, useMemo } from 'react';

export interface TabItemsType {
  key?: string;
  children?: string | undefined;
  label?: string;
  iconSrc?: string;
  iconRender?: FC;
  lang?: Language;
}

interface BashTabsProps {
  /** tab 配置项 */
  tabItems?: TabItemsType[];
  /** 默认 tab key */
  defaultActiveKey?: string;
}

const BashTabs: FC<BashTabsProps> = (props) => {
  const { tabItems, defaultActiveKey } = props;

  const renderLabel = useCallback((item: TabItemsType) => {
    const { label, iconRender, iconSrc } = item;
    return (
      <span className="snippet-label">
        {typeof iconRender === 'function' ? iconRender({}) : null}
        {iconSrc ? <img src={iconSrc} alt="iconSrc" /> : null}
        {label}
      </span>
    );
  }, []);

  const tabPanes = useMemo(() => {
    return tabItems
      ?.map((item) => {
        const { key = String(Date.now()), children, lang = 'bash' } = item;
        if (children) {
          return (
            <Tabs.TabPane key={key} tab={renderLabel(item)}>
              <SourceCode lang={lang}>{children}</SourceCode>
            </Tabs.TabPane>
          );
        }
        return null;
      })
      .filter((i) => i !== null);
  }, [tabItems, renderLabel]);

  return (
    <Tabs className="antd-site-snippet" defaultActiveKey={defaultActiveKey}>
      {tabPanes}
    </Tabs>
  );
};

export default BashTabs;
