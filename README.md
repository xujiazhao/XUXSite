# 许嘉昭 Portfolio / Blog

基于 Notion 作为 CMS 的个人作品集与博客网站。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **Notion 渲染**: react-notion-x
- **样式**: Tailwind CSS
- **部署**: Vercel

## 开始使用

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`，并填入你的 Notion 页面 ID：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：
```
NOTION_ROOT_PAGE_ID=你的Notion页面ID
```

### 3. 本地开发

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 添加环境变量 `NOTION_ROOT_PAGE_ID`
4. 绑定自定义域名

## Notion 页面设置

- 确保你的 Notion 页面已设置为 **公开分享 (Share to web)**
- 根页面 ID 可以从页面 URL 中获取（URL 最后的 32 位字符）

## 项目结构

```
src/
├── app/
│   ├── layout.tsx        # 全局布局（头部、底部）
│   ├── page.tsx           # 首页（渲染 Notion 根页面）
│   ├── [pageId]/page.tsx  # 动态子页面路由
│   ├── globals.css        # 全局样式 + Notion 样式覆盖
│   ├── not-found.tsx      # 404 页面
│   ├── loading.tsx        # 加载状态
│   ├── sitemap.ts         # 自动生成 sitemap
│   └── robots.ts          # robots.txt
├── components/
│   └── NotionPage.tsx     # Notion 页面渲染组件
└── lib/
    └── notion.ts          # Notion API 工具函数
```

## 许可证

MIT
