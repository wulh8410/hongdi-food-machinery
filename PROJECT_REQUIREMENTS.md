# 洪弟机械食品厂 GEO 官网开发需求文档

更新时间：2026-06-06

## 1. 项目目标

本项目为揭阳洪弟机械食品厂开发中英文双语 GEO 官网，核心目标是让传统搜索引擎、AI 搜索工具和 AI 助手更容易抓取、理解、引用和推荐网站内容。

第一期采用静态化架构，内容通过本地 Markdown 和 JSON 文件维护，部署在 GitHub Pages，后期可平滑迁移到腾讯云静态托管、COS 或 EdgeOne Pages。

线上地址：

- 中文首页：https://wulh8410.github.io/hongdi-food-machinery/zh/
- 英文首页：https://wulh8410.github.io/hongdi-food-machinery/en/
- GitHub 仓库：https://github.com/wulh8410/hongdi-food-machinery

## 2. 技术栈

已采用：

- Next.js
- TypeScript
- Tailwind CSS
- Markdown 内容文件
- JSON 数据文件
- GitHub Actions 自动部署
- Next.js 静态导出模式

第一期不包含：

- 数据库
- 登录系统
- 后台管理系统
- 在线询盘表单
- 企微通知
- 复杂权限系统

## 3. 路由结构

网站支持中文和英文，当前路由结构如下：

```txt
/zh
/en

/zh/products
/en/products

/zh/products/[slug]
/en/products/[slug]

/zh/articles
/en/articles

/zh/articles/[slug]
/en/articles/[slug]

/zh/faqs
/en/faqs

/zh/faqs/[slug]
/en/faqs/[slug]

/zh/solutions
/en/solutions

/zh/solutions/[slug]
/en/solutions/[slug]

/zh/about
/en/about

/zh/contact
/en/contact
```

已实现：

- 中英文页面独立内容
- 页面语言切换
- canonical
- hreflang
- 页面 title、description、keywords
- 静态导出

## 4. 内容目录结构

当前内容结构：

```txt
content/
  zh/
    products/
    articles/
    faqs/
    solutions/
  en/
    products/
    articles/
    faqs/
    solutions/

data/
  site.zh.json
  site.en.json
  categories.zh.json
  categories.en.json

public/
  images/
    products/
    factory/
    hero/
    articles/
    solutions/
```

## 5. 当前产品清单

当前保留并展示的产品如下，中英文均已建立详情页。

### 家禽脱毛与泡水烫毛设备

- 58型涡轮不锈钢脱毛机
- 双面翻盖不锈钢鸡鹅鸭搅拌机
- 气动翻出泡水脱毛一体机
- 胶棒搅拌不锈钢鸡鹅鸭泡水机
- 9滚筒不锈钢脱毛机
- 6滚筒不锈钢脱毛机
- 430不锈钢移动式脱毛机
- 滚筒式全自动家禽脱毛机

### 水产加工设备

- 鱼类脱鳞机
- 鱼类采肉机

已删除的旧占位产品：

- 中大型畜禽脱毛设备
- 肉类加工配套设备
- 肉丸机系列
- 脱煮洗切多功能一体机
- 烫脱一体机

删除后已同步清理文章、FAQ、解决方案中的相关产品引用，避免产生失效内链。

## 6. 首页要求与当前状态

首页当前包含：

- Header 与语言切换
- 现代化工厂设备 Hero 横幅
- 公司一句话定位
- 核心分类标签
- 主推产品
- 解决方案入口
- 热门 FAQ
- 最新文章
- 工厂实力
- 设备选型咨询
- Footer

当前首页“主推产品”仅展示一行 4 个产品：

- 58型涡轮不锈钢脱毛机
- 双面翻盖不锈钢鸡鹅鸭搅拌机
- 气动翻出泡水脱毛一体机
- 胶棒搅拌不锈钢鸡鹅鸭泡水机

产品中心仍展示全部保留产品。

## 7. 页面功能要求

### 产品中心

已实现：

- 分类标签展示
- 产品卡片
- 产品图片
- 产品名称
- 简短介绍
- 适用场景
- 查看详情入口

### 产品详情页

已实现：

- 产品标题
- 产品图片
- 产品简介
- GEO 摘要
- 核心卖点
- 适用场景
- 技术参数
- 解决的问题
- 产品 FAQ
- 相关产品
- 相关文章
- Product Schema

### FAQ 页面

已实现：

- FAQ 列表页
- FAQ 详情页
- 关联产品
- FAQPage Schema

### 文章中心

已实现：

- 文章列表页
- 文章详情页
- 发布时间
- 更新时间
- 关联产品
- 关联 FAQ
- Article Schema

### 解决方案

已实现：

- 客户痛点
- 推荐设备
- 工艺流程
- 配置建议
- 适合产能
- 常见问题关联
- 相关产品

### 关于我们

已实现：

- 公司简介
- 主营设备
- 生产能力
- 选型经验
- 服务流程
- 售后与配件
- 合作优势
- Organization Schema

### 联系我们

第一期不做表单，仅展示：

- 公司名称
- 电话：13729374860
- 微信：请添加手机号咨询
- 邮箱：117667985@qq.com
- 地址
- 服务范围

## 8. GEO 文件

已实现：

```txt
/sitemap.xml
/robots.txt
/llms.txt
```

构建前会通过 `scripts/generate-geo-files.mjs` 自动生成上述文件。

当前可访问：

- https://wulh8410.github.io/hongdi-food-machinery/sitemap.xml
- https://wulh8410.github.io/hongdi-food-machinery/robots.txt
- https://wulh8410.github.io/hongdi-food-machinery/llms.txt

## 9. Schema 结构化数据

已封装：

- OrganizationSchema
- ProductSchema
- FAQPageSchema
- BreadcrumbSchema
- ArticleSchema
- SchemaJsonLd

各页面会按页面类型自动插入 JSON-LD。

## 10. GitHub Pages 部署

仓库：

```txt
https://github.com/wulh8410/hongdi-food-machinery
```

部署方式：

- push 到 `main` 分支
- GitHub Actions 自动执行 `npm install`
- 执行 `npm run build`
- 将 `out/` 部署到 GitHub Pages

由于部署在 GitHub Pages 二级路径：

```txt
https://wulh8410.github.io/hongdi-food-machinery/
```

项目已配置：

- `basePath: '/hongdi-food-machinery'`
- `assetPrefix: '/hongdi-food-machinery/'`
- 图片路径适配 GitHub Pages 二级路径

## 11. UI 风格

当前风格定位：

- 工业感
- 专业
- 干净
- B2B 官网风格
- 信息密度较高
- 移动端友好
- 深蓝、工业蓝、橙色、浅灰配色

已使用真实/生成产品图和工厂视觉素材，避免纯文字或过度模板化页面。

## 12. 组件清单

已实现主要组件：

- Header
- Footer
- LanguageSwitcher
- HeroSection
- ProductCard
- ArticleCard
- FAQCard
- SolutionCard
- Breadcrumb
- SchemaJsonLd
- ProductGallery
- SpecTable
- RelatedLinks
- FAQBlock
- ContactBlock
- CategoryFilter
- PageShell

## 13. 内容维护规范

新增产品：

1. 在 `content/zh/products/` 添加中文 Markdown。
2. 在 `content/en/products/` 添加英文 Markdown。
3. 两个文件使用相同 `slug`。
4. 图片放在 `public/images/products/`。
5. `images` 字段使用 `/images/products/xxx.png`。
6. 执行 `npm run build` 自动更新 sitemap、robots、llms。

删除产品：

1. 删除中英文产品 Markdown。
2. 使用 `rg "产品slug" content` 查找相关引用。
3. 替换或删除文章、FAQ、解决方案中的 relatedProducts / recommendedProducts。
4. 执行 `npm run build` 重新生成 GEO 文件。

## 14. 验收状态

当前已满足：

- 首页可访问
- 中英文页面可访问
- 产品列表正常
- 产品详情正常
- FAQ 列表正常
- FAQ 详情正常
- 文章列表正常
- 文章详情正常
- 解决方案列表正常
- 解决方案详情正常
- sitemap.xml 可访问
- robots.txt 可访问
- llms.txt 可访问
- 页面有基础 SEO 信息
- 页面有 JSON-LD 结构化数据
- GitHub Pages 可部署
- 图片路径适配 GitHub Pages
- 最新 GitHub Actions 部署成功

最近验证：

```txt
npx tsc --noEmit
GITHUB_PAGES=true npm run build
```

## 15. 后续建议

后续可继续补充：

- 真实工厂照片
- 真实设备短视频
- 每款产品更多实拍图
- 真实客户应用场景
- 设备选型对照表
- 常见故障与维护文章
- 自定义域名
- 腾讯云迁移配置
