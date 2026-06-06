# 食品机械工厂 GEO 官网

这是一个中英文双语食品机械工厂官网，使用 Next.js、TypeScript、Tailwind CSS、本地 Markdown/JSON 内容和静态导出模式构建，适合部署到 GitHub Pages，后期也可迁移到腾讯云静态托管或对象存储。

完整开发需求与当前交付范围见：[`PROJECT_REQUIREMENTS.md`](./PROJECT_REQUIREMENTS.md)。

## 安装依赖

```bash
npm install
```

## 本地运行

```bash
npm run dev
```

访问 `http://localhost:3000/zh/` 或 `http://localhost:3000/en/`。

## 构建静态文件

```bash
npm run build
```

构建产物会输出到 `out/`。构建前会自动生成 `public/sitemap.xml`、`public/robots.txt` 和 `public/llms.txt`。

## 新增产品

在 `content/zh/products` 和 `content/en/products` 分别新增同 slug 的 Markdown 文件。可参考 `templates/product-template.md`。常用字段包括 `title`、`slug`、`category`、`description`、`geoSummary`、`features`、`specs`、`faqs`、`relatedProducts` 和 `relatedArticles`。

## 新增文章

在 `content/zh/articles` 和 `content/en/articles` 分别新增 Markdown 文件。可参考 `templates/article-template.md`。文章支持 `date`、`updated`、`relatedProducts`、`relatedFaqs` 和独立 SEO 配置。

## 新增 FAQ

在 `content/zh/faqs` 和 `content/en/faqs` 分别新增 Markdown 文件。可参考 `templates/faq-template.md`。FAQ 详情页会自动生成 FAQPage Schema。

## 新增解决方案

在 `content/zh/solutions` 和 `content/en/solutions` 分别新增 Markdown 文件。可参考 `templates/solution-template.md`。解决方案适合沉淀客户痛点、推荐设备、工艺流程、配置建议和适合产能。

## 修改公司信息

公司名称、电话、微信、邮箱、地址、服务范围和导航文案位于：

- `data/site.zh.json`
- `data/site.en.json`

产品分类位于：

- `data/categories.zh.json`
- `data/categories.en.json`

## 修改中英文内容

中英文内容完全分离，分别维护在 `content/zh` 和 `content/en`。建议同一内容的中英文版本使用相同 slug，这样语言切换、sitemap 和内链更稳定。

## 部署到 GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`。推送到 `main` 分支后，GitHub Actions 会执行：

```bash
npm install
npm run build
```

然后将 `out/` 部署到 GitHub Pages。

如果部署到 `https://username.github.io/repository-name/` 这类二级路径，请在 `next.config.js` 中增加：

```js
basePath: '/repository-name',
assetPrefix: '/repository-name/'
```

使用自定义域名时不需要 `basePath`。

## 迁移到腾讯云

后期可将 `out/` 目录上传到腾讯云 COS、EdgeOne Pages 或静态网站托管服务。由于第一期不依赖数据库、登录、后台和服务端接口，迁移时主要调整域名、CDN、HTTPS 和 `data/site.*.json` 中的 `baseUrl`。

## GEO 说明

项目通过以下方式增强生成式引擎优化：

- 中英文静态页面可直接抓取。
- 每个页面有独立 title、description、keywords、canonical 和 hreflang。
- 产品页生成 Product Schema。
- FAQ 页生成 FAQPage Schema。
- 文章页生成 Article Schema。
- 关于页生成 Organization Schema。
- 全站生成 Breadcrumb Schema。
- 自动生成 sitemap、robots 和 llms.txt。
