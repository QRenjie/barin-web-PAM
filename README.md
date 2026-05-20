# barin-web-PAM

公司项目资产展示平台 Monorepo（Project Asset Management）。

## 技术选型

| 层级 | 选择 | 说明 |
|------|------|------|
| 包管理 | **pnpm** workspaces | 依赖去重、安装快，适合 monorepo |
| 任务编排 | **Turborepo** | 并行 dev/build、远程/本地缓存 |
| Web | Vite + React + TypeScript + Tailwind CSS v4 | 轻量、符合 PRD 响应式需求 |

### 为什么选 Turbo 而不是 Nx？

| | Turborepo | Nx |
|---|-----------|-----|
| 定位 | 专注 **任务调度与缓存** | 全功能 **monorepo 平台**（生成器、依赖图、插件生态） |
| 学习成本 | 低，`turbo.json` 即可 | 较高，概念多（project graph、executors 等） |
| 适合场景 | 少量 app + 少量共享包，团队偏前端 | 大型多团队、多框架、强约束模块边界 |
| 本仓库 | ✅ 当前仅 web + 未来 browser-plugin，体量小 | 现阶段偏重，可以后再迁 |

若未来出现大量共享库、需要代码生成器或严格 affected 分析，再评估迁移 Nx 也不迟；两者都支持 pnpm workspace。

## 目录结构

```
barin-web-PAM/
├── apps/
│   ├── web/                 # 项目资产展示网站
│   └── browser-plugin/      # 预留：浏览器扩展
├── packages/
│   ├── typescript-config/   # 共享 TS 配置
│   └── shared/              # 预留：共享类型、工具、UI
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 环境要求

- Node.js >= 20
- pnpm 10（见根目录 `packageManager` 字段）

## 常用命令

在**仓库根目录**执行：

```bash
# 安装依赖
pnpm install

# 启动所有 app 的 dev（当前仅 web）
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm typecheck
```

仅操作某个 app：

```bash
pnpm --filter @barin-web-pam/web dev
pnpm --filter @barin-web-pam/web build
```

## 新增应用示例

**浏览器扩展**（目录已预留 `apps/browser-plugin`）：

```bash
# 示例：使用 Plasmo 脚手架（可按团队习惯换 WXT / 原生 MV3）
pnpm create plasmo apps/browser-plugin
```

然后在根 `pnpm-workspace.yaml` 已包含 `apps/*`，安装依赖后即可在 `turbo.json` 中为该包配置 `dev` / `build` 任务。

## 文档

- Web 产品需求：[apps/web/docs/prd.md](apps/web/docs/prd.md)
