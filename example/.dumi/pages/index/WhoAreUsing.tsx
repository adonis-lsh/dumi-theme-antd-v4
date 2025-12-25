import { useCallback, type FC } from 'react';
import { Typography, Row, Col } from 'antd';
import { useLocale } from 'dumi';
import { css } from '@emotion/react';
import { defaultImage, addImage } from '../../constants/images';
import useSiteToken from '../../../../src/hooks/useSiteToken';

const userList = [
  {
    name: 'Ant Design Web3',
    site: 'https://web3.ant.design/',
    logoUrl:
      'https://mdn.alipayobjects.com/huamei_mutawc/afts/img/A*MgfMRpa9Df8AAAAAAAAAAAAADlrGAQ/original'
  },
  {
    name: 'CANDY-HOUSE',
    site: 'https://document.candyhouse.co/demo/hello',
    logoUrl: 'https://avatars.githubusercontent.com/u/16471477?s=200&v=4'
  },
  {
    name: '增加更多',
    site: 'https://github.com/KuangPF/dumi-theme-antd/issues/23',
    logoUrl: addImage
  }
];

const localesConfig = {
  'zh-CN': {
    'page.home.who-are-using': '谁在使用'
  },
  'en-US': {
    'page.home.who-are-using': 'Who are using'
  }
};
const useStyle = () => {
  const { token } = useSiteToken();
  return {
    containerWrap: css`
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(25px);
    `,
    container: css`
      max-width: 1208px;
      margin-inline: auto;
      padding-top: ${token.marginFarSM}px;
      padding-bottom: ${token.marginFarSM}px;
      box-sizing: border-box;
      padding-inline: ${token.marginXXL}px;
    `,
    title: css`
      width: 100%;
      text-align: center;
      margin-bottom: ${token.marginXXL}px;
    `,
    userItem: css`
      height: 64px;
      text-align: center;
      cursor: pointer;
      padding: ${token.padding}px ${token.paddingLG}px;
      border: 1px solid ${token.colorBorderSecondary};
      font-size: ${token.fontSize}px;
      border-radius: ${token.borderRadius}px;
      background: ${token.colorBgContainer};
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all ${token.motionDurationMid};
      a {
        color: ${token.colorText};
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
      }
      &:hover {
        box-shadow: ${token.boxShadowTertiary};
        transform: translateY(-1px);
      }
    `,
    userLogo: css`
      width: 32px;
      height: 32px;
      margin-right: ${token.marginSM}px;
      object-fit: contain;
    `
  };
};

const WhoAreUsing: FC = () => {
  const style = useStyle();
  const { id } = useLocale();
  const {
    token: {}
  } = useSiteToken();

  const handleError = useCallback((e) => {
    e.target.src = defaultImage;
  }, []);

  return (
    <div css={style.containerWrap}>
      <div css={style.container}>
        <div css={style.title}>
          <Typography.Title level={3}>
            {localesConfig[id]?.['page.home.who-are-using']}
          </Typography.Title>
        </div>
        <Row gutter={[16, 16]} justify="center">
          {userList.map((item, index) => (
            <Col key={index}>
              <div css={style.userItem}>
                <a href={item.site} target="_blank" rel="noreferrer">
                  <img
                    css={style.userLogo}
                    src={item.logoUrl}
                    alt={item.name}
                    onError={handleError}
                  />
                  <span>{item.name}</span>
                </a>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default WhoAreUsing;
