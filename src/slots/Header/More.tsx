import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { FormattedMessage } from 'dumi';
import React from 'react';
import useLocaleValue from '../../hooks/useLocaleValue';
import { IMoreLink } from '../../types';

export const getMoreLinksGroup = (moreLinks: IMoreLink[]): React.ReactElement => {
  return (
    <Menu>
      {(moreLinks ?? []).map((item, index) => (
        <Menu.Item key={index}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.text}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );
};

const More: React.FC = () => {
  const moreLinks = useLocaleValue('moreLinks') || [];
  if (!Array.isArray(moreLinks) || moreLinks.length === 0) {
    return null;
  }

  const menu = getMoreLinksGroup(moreLinks);
  return (
    <Dropdown {...({ overlay: menu, placement: 'bottomRight' } as any)}>
      <Button size="small">
        <FormattedMessage id="app.header.menu.more" />
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default More;
