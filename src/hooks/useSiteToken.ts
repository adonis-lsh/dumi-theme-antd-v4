import { TinyColor } from '@ctrl/tinycolor';
import { ConfigContext } from 'antd/lib/config-provider';
import { useContext } from 'react';

interface IUseSiteToken {
  token: {
    // antd 4.x 默认值
    colorPrimary: string;
    colorBgContainer: string;
    colorText: string;
    colorTextSecondary: string;
    colorTextTertiary: string;
    colorSplit: string;
    colorFillTertiary: string;
    colorPrimaryBg: string;
    colorWarning: string;
    colorWarningBg: string;
    colorSuccess: string;
    colorSuccessBg: string;
    colorError: string;
    colorErrorBg: string;
    colorTextHeading: string;
    colorWhite: string;
    colorBorderSecondary: string;
    fontSize: number;
    fontSizeSM: number;
    fontSizeLG: number;
    fontSizeIcon: number;
    fontSizeHeading1: number;
    fontSizeHeading2: number;
    fontSizeHeading5: number;
    lineHeight: number;
    lineHeightHeading2: number;
    lineHeightHeading5: number;
    margin: number;
    marginSM: number;
    marginMD: number;
    marginXXS: number;
    marginXXL: number;
    borderRadius: number;
    borderRadiusLG: number;
    lineWidth: number;
    screenLG: number;
    fontFamily: string;
    purple5: string;
    purple6: string;
    padding: number;
    paddingSM: number;
    paddingXS: number;
    paddingXXS: number;
    paddingLG: number;
    // 自定义值
    headerHeight: number;
    menuItemBorder: number;
    controlHeight: number;
    motionDurationSlow: string;
    motionDurationMid: string;
    mobileMaxWidth: number;
    siteMarkdownCodeBg: string;
    antCls: string;
    iconCls: string;
    marginFarXS: number;
    marginFarSM: number;
    marginFar: number;
    codeFamily: string;
    contentMarginTop: number;
    anchorTop: number;
    boxShadowCard: string;
    boxShadowTertiary: string;
  };
  siteCls: string;
}

const headerHeight = 64;

const boxShadowCard = `
0 1px 2px -2px ${new TinyColor('rgba(0, 0, 0, 0.16)').toRgbString()},
0 3px 6px 0 ${new TinyColor('rgba(0, 0, 0, 0.12)').toRgbString()},
0 5px 12px 4px ${new TinyColor('rgba(0, 0, 0, 0.09)').toRgbString()}
`;

const boxShadowTertiary = `
0 1px 2px 0 ${new TinyColor('rgba(0, 0, 0, 0.03)').toRgbString()},
0 1px 6px -1px ${new TinyColor('rgba(0, 0, 0, 0.02)').toRgbString()},
0 2px 4px 0 ${new TinyColor('rgba(0, 0, 0, 0.02)').toRgbString()}
`;

const useSiteToken = (): IUseSiteToken => {
  const { getPrefixCls } = useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const iconPrefixCls = 'anticon'; // antd 4.x 默认图标类名前缀

  // antd 4.x 默认值
  const marginXXL = 48;
  const margin = 16;
  const token = {
    // antd 4.x 默认颜色值
    colorPrimary: '#1890ff',
    colorBgContainer: '#fff',
    colorText: 'rgba(0, 0, 0, 0.85)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.45)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.25)',
    colorSplit: '#f0f0f0',
    colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
    colorPrimaryBg: '#e6f7ff',
    colorWarning: '#faad14',
    colorWarningBg: '#fffbe6',
    colorSuccess: '#52c41a',
    colorSuccessBg: '#f6ffed',
    colorError: '#ff4d4f',
    colorErrorBg: '#fff2f0',
    colorTextHeading: 'rgba(0, 0, 0, 0.88)',
    colorWhite: '#fff',
    colorBorderSecondary: 'rgba(0, 0, 0, 0.06)',
    // antd 4.x 默认字体大小
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeIcon: 12,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading5: 16,
    lineHeight: 1.5715,
    lineHeightHeading2: 1.35,
    lineHeightHeading5: 1.5,
    // antd 4.x 默认间距（调整为接近 5.x 视觉效果）
    margin,
    marginSM: 8, // antd 默认小间距
    marginMD: 24, // antd 5.x 默认是 24
    marginXXS: 4, // antd 默认极小间距
    marginXXL,
    // antd 4.x 默认圆角（调整为接近 5.x 视觉效果）
    borderRadius: 6, // antd 5.x 默认是 6
    borderRadiusLG: 8, // antd 5.x 默认是 8
    lineWidth: 1, // antd 默认边框宽度
    // antd 4.x 默认断点
    screenLG: 992,
    // antd 4.x 默认字体
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    // antd 4.x 默认紫色（用于锚点等）
    purple5: '#722ed1',
    purple6: '#531dab',
    // antd 4.x 默认内边距
    padding: 16, // antd 默认内边距
    paddingSM: 8, // antd 小内边距
    paddingXS: 8,
    paddingXXS: 4,
    paddingLG: 24,
    // 自定义值
    headerHeight,
    menuItemBorder: 2,
    controlHeight: 32, // antd 默认控件高度
    motionDurationSlow: '0.3s', // antd 慢速动画时长
    motionDurationMid: '0.2s', // antd 中速动画时长
    mobileMaxWidth: 767.99,
    siteMarkdownCodeBg: 'rgba(0, 0, 0, 0.04)',
    antCls: `.${rootPrefixCls}`,
    iconCls: `.${iconPrefixCls}`,
    /** 56 */
    marginFarXS: (marginXXL / 6) * 7,
    /** 80 */
    marginFarSM: (marginXXL / 3) * 5,
    /** 96 */
    marginFar: marginXXL * 2,
    codeFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    contentMarginTop: 40,
    anchorTop: headerHeight + margin,
    boxShadowCard,
    boxShadowTertiary
  };

  return {
    token,
    /** dumi-theme-antd 站点 class 前缀 */
    siteCls: 'dumi-antd'
  };
};

export default useSiteToken;
