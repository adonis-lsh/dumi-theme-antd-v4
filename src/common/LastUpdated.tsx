// 最后更新时间
import { ClockCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { FormattedMessage } from 'dumi';
import React, { useEffect, useState } from 'react';
import useAdditionalThemeConfig from '../hooks/useAdditionalThemeConfig';
import useSiteToken from '../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();

  const { colorTextSecondary, marginXXS } = token;

  return {
    lastUpdatedWrap: css`
      color: ${colorTextSecondary};
      display: flex;
      align-items: center;
      font-size: ${token.fontSize}px;
      line-height: ${token.lineHeight};
    `,
    lastUpdatedLabel: css`
      margin-inline-start: ${marginXXS}px;
      margin-inline-end: ${marginXXS}px;
    `,
    lastUpdatedIcon: css`
      font-size: ${token.fontSize}px;
      color: ${colorTextSecondary};
    `
  };
};

const LastUpdated: React.FC<{ time?: number }> = ({ time }) => {
  const styles = useStyle();
  const { lastUpdated } = useAdditionalThemeConfig();
  const [isoLastUpdated, setIsoLastUpdated] = useState('');
  const [lastUpdatedTime, setLastUpdatedTime] = useState('');
  const showLastUpdated = lastUpdated && time;

  useEffect(() => {
    if (showLastUpdated) {
      setIsoLastUpdated(new Date(time!).toISOString());
      setLastUpdatedTime(
        new Intl.DateTimeFormat(undefined, {
          dateStyle: 'short',
          timeStyle: 'short'
        }).format(time)
      );
    }
  }, [showLastUpdated, time]);

  return lastUpdated && time ? (
    <div css={styles.lastUpdatedWrap}>
      <ClockCircleOutlined css={styles.lastUpdatedIcon} />
      <span css={styles.lastUpdatedLabel}>
        <FormattedMessage id="content.footer.last.updated" />
      </span>
      <time dateTime={isoLastUpdated}>{lastUpdatedTime}</time>
    </div>
  ) : null;
};

export default LastUpdated;
