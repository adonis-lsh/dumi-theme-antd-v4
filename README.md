<h1 align="center">dumi-theme-antd</h1>

<div align="center">

基于 [dumi-theme-antd](https://github.com/KuangPF/dumi-theme-antd) 适配的 Ant Design 4.x 版本主题

[![NPM version](https://img.shields.io/npm/v/dumi-theme-antd.svg?style=flat)](https://npmjs.org/package/dumi-theme-antd) [![NPM downloads](http://img.shields.io/npm/dm/dumi-theme-antd.svg?style=flat)](https://npmjs.org/package/dumi-theme-antd) [![Github Actions](https://github.com/KuangPF/dumi-theme-antd/workflows/Deploy/badge.svg)](https://github.com/KuangPF/dumi-theme-antd/actions)

</div>

<p align="center">
  <a href="https://kuangpf.com/dumi-theme-antd">
    <img  src="https://github.com/KuangPF/dumi-theme-antd/assets/20694238/3c0d3907-a524-4ab1-b140-5fc31524f670">
  </a>
</p>

## 简介

本项目是基于 [dumi-theme-antd](https://github.com/KuangPF/dumi-theme-antd) 适配的 **Ant Design 4.x** 版本主题插件。

原版 `dumi-theme-antd` 基于 Ant Design 5.x 开发，而本版本专门为 **Ant Design 4.9.4** 及以上的 4.x 版本进行了适配，提供了与 Ant Design 官网风格类似的文档站点样式，同时保持与 Ant Design 4.x 版本的完全兼容。

## 特性

- 🎨 **Ant Design 官网风格**：提供与 Ant Design 官方文档站点类似的视觉风格
- 📦 **Ant Design 4.x 兼容**：基于 Ant Design 4.9.4 适配，完全兼容 4.x 版本
- 🚀 **开箱即用**：安装即可使用，无需复杂配置
- 🔍 **内置全文搜索**：支持标题、正文、demo 等内容的多关键词搜索
- ⚡ **更好的编译性能**：结合 Umi 4 MFSU、esbuild、SWC 等方案，带来更快的编译速度
- 📱 **响应式设计**：完美支持移动端和桌面端

## 环境要求

- **Ant Design**: 4.9.4 或以上（4.x 版本）
- **React**: 16.9.0 或以上
- **dumi**: 2.x

## 安装

将主题安装到 `devDependencies`：

```bash
$ pnpm i dumi-theme-antd -D
```

或使用 npm：

```bash
$ npm i dumi-theme-antd -D
```

或使用 yarn：

```bash
$ yarn add dumi-theme-antd -D
```

## 使用

在 `.dumirc.ts` 或 `.umirc.ts` 中配置主题：

```typescript
import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: '你的项目名称',
    // 其他配置...
  },
});
```

更多配置选项请参考 [官方文档](https://kuangpf.com/dumi-theme-antd)。

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run docs

# 构建文档
pnpm run build:docs
```

## 致谢

感谢所有为 `dumi-theme-antd` 做出贡献的开发者！

<a href="https://github.com/KuangPF/dumi-theme-antd/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=KuangPF/dumi-theme-antd" />
</a>

## 相关链接

- [原版 dumi-theme-antd](https://github.com/KuangPF/dumi-theme-antd) - 基于 Ant Design 5.x 的版本
- [dumi 官方文档](https://d.umijs.org)
- [Ant Design 4.x 文档](https://4x.ant.design)

## 许可证

MIT
