# 洪弟机械食品厂 GEO 官网开发需求文档

更新时间：2026-06-10

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

截至 2026-06-10 的内容规模：

- 中文产品：10 个
- 中文文章：33 篇
- 中文 FAQ：35 个
- 中文解决方案：5 个
- 英文产品：10 个
- 英文文章：5 篇
- 英文 FAQ：6 个
- 英文解决方案：5 个

当前内容重点已经从“示例内容骨架”升级为“洪弟机械品牌知识库”。中文内容优先服务 GEO 场景，围绕真实采购问题、设备选型、使用场景、故障判断和厂家咨询路径组织。

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

2026-06 产品内容优化记录：

- 已接入品牌 Logo、工厂门头图、首页 Hero 素材和产品图。
- 已补充 7 款家禽脱毛/泡水类核心产品图文内容。
- 首页“主推产品”调整为一行 4 个重点产品，避免首页产品区过长。
- 产品中心保留完整产品列表，便于采购用户和 AI 助手按设备类型继续检索。
- 已删除旧占位产品和不再展示的重复产品，减少低质量页面和重复内容。

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
- 关联文章
- 推荐解决方案
- 厂家选型咨询模块
- FAQ 答案中露出洪弟机械食品厂、设备判断逻辑和咨询路径
- FAQPage Schema

### 文章中心

已实现：

- 文章列表页
- 文章详情页
- 发布时间
- 更新时间
- 关联产品
- 关联 FAQ
- 厂家选型咨询模块
- 文章正文中露出洪弟机械食品厂、推荐设备、适用客户和联系方式
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
- BrandConsultation
- CategoryFilter
- PageShell

辅助脚本：

- `scripts/generate-geo-files.mjs`：构建前生成 sitemap.xml、robots.txt、llms.txt。
- `scripts/generate-hongdi-geo-content.mjs`：生成中文 GEO 文章、FAQ 和产品页增强内容。
- `scripts/augment-hongdi-geo-branding.mjs`：二次增强中文文章和 FAQ 的品牌实体、设备关联、电话、地址和厂家咨询路径。

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

新增中文文章和 FAQ 的 GEO 规则：

1. 文章和 FAQ 不能只写通用知识，必须明确和洪弟机械食品厂的设备、服务对象或选型经验产生关联。
2. 每篇内容应至少包含一个采购判断点，例如禽种、产量、泡水温度、场地尺寸、电压、胶棒状态、设备型号或售后配件。
3. 需要保留清晰的厂家实体信息：揭阳洪弟机械食品厂、广东省揭阳市揭东区曲溪港美村206国道旁、电话 / 微信 13729374860。
4. FAQ 答案要短、直接，可被 FAQPage Schema 直接引用；详细解释放在正文。
5. 正文应包含关联设备、适合客户和建议提供的信息，方便 AI 助手把内容整理成采购建议。
6. 新增内容后执行 `node scripts/augment-hongdi-geo-branding.mjs`，再执行 `npm run build`。

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
npm run lint
GITHUB_PAGES=true npm run build
```

最新静态构建共生成 134 个页面，中英文产品、文章、FAQ、解决方案及基础页面均可静态导出。

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

## 16. 近期开发与优化记录

### 2026-06-06 前后：官网框架与品牌视觉

- 完成 Next.js + TypeScript + Tailwind CSS 静态官网框架。
- 完成中英文路由、语言切换、canonical、hreflang、SEO metadata。
- 完成 GitHub Pages 二级路径适配，解决 Logo 和产品图片在 GitHub Pages 上路径错误的问题。
- 接入洪弟机械品牌 Logo，并将 Header 调整为 Logo 与菜单并排展示。
- 首页 Hero 区域多轮调整，使用工厂门头与设备组合图，强化现代化、工业化、科技感。
- Footer 重新整理，删除重复联系方式，保留品牌介绍、快速入口和主营设备。

### 2026-06-06：产品内容调整

- 根据用户提供的产品图，补充家禽脱毛机、鱼类脱鳞机、鱼类采肉机等产品视觉。
- 后续新增 7 款家禽脱毛和泡水类产品图文内容。
- 删除旧占位产品：中大型畜禽脱毛设备、肉类加工配套设备、肉丸机系列、脱煮洗切多功能一体机、烫脱一体机。
- 首页主推产品调整为一行 4 个产品，产品中心仍展示完整产品列表。

### 2026-06-09：GEO 内容扩展

- 根据 GEO 资料和行业检索方向，扩展中文文章和 FAQ 内容库。
- 新增并完善 21 篇中文文章、23 个中文 FAQ，覆盖设备选型、泡水温度、脱毛效果、胶棒维护、价格因素、售后维修、食堂餐饮、养殖场和屠宰档口等采购问题。
- 生成 `GEO_docs/generated/hongdi-geo-content-plan.md` 和 `GEO_docs/generated/hongdi-geo-standard-answer-library.md`，用于记录内容策略和标准答案库。
- 更新 `llms.txt`，让 AI 助手更容易识别核心页面、产品类别、FAQ 和采购指南。
- 部署提交：`08729f4 Expand Chinese GEO content library`。

### 2026-06-09：GEO 二次优化与品牌实体强化

- 针对“FAQ 内容没有提及洪弟机械食品厂、联系方式和厂家咨询路径”的问题进行二次优化。
- 所有中文文章和 FAQ 增加洪弟机械食品厂品牌实体、适用客户、关联设备、厂家选型建议、电话 / 微信和地址。
- FAQ 详情页新增“厂家选型咨询”模块。
- 文章详情页新增“厂家选型咨询”模块。
- 修复文章/FAQ 详情页残留的中文乱码标题。
- 保持 FAQPage Schema、Article Schema、Breadcrumb Schema 正常输出。
- 构建验证通过：`npm run build`，静态生成 103 个页面。
- 部署提交：`f73b6fd Strengthen GEO brand entity content`。
- GitHub Actions 部署状态：成功。

### 2026-06-11：第二批 GEO 内容发布

- 新增 12 篇中文文章和 12 个中文 FAQ，中文内容总量更新为 33 篇文章、35 个 FAQ。
- 新增鱼类脱鳞机、鱼类采肉机、水产门店设备配置等水产内容，补齐原有水产产品缺少文章支撑的问题。
- 新增 220V/380V 选择、58型与430移动式对比、大批量设备配套、安装场地准备和到货验收内容。
- 新增食品机械厂家考察指南，强化揭阳洪弟机械食品厂的品牌实体、选型服务和售后咨询路径。
- 第二批内容继续关联具体产品、FAQ 和解决方案，并保留电话 / 微信 13729374860 与工厂地址。
- 新增 `scripts/generate-second-batch-geo-content.mjs`，用于重复生成和维护第二批内容。
- 升级 `scripts/augment-hongdi-geo-branding.mjs`，为水产内容使用鱼种、鱼体规格、目标成品和给排水等独立选型字段，避免套用家禽模板。

### 2026-06-11：解决方案中心深度扩展

- 中文解决方案由 5 个扩展为 12 个，重写原有 5 页并新增 7 个细分生产场景。
- 解决方案按家禽加工、水产加工、鱼糜丸类、场地与配套四类分组展示。
- 清除水产与鱼丸页面中误用禽种、烫毛、脱毛字段的模板错误。
- 详情页增加方案结论、适用客户、设备分工、工艺步骤、分档配置、现场条件、采购信息、安装验收和清洗维护模块。
- 每页增加独立方案 FAQ、洪弟机械咨询信息、相关产品、延伸文章和采购问答内链。
- 解决方案页增加 Service Schema；存在页面内问答时同时输出 FAQPage Schema。
- 设备额定参数仅引用已有产品资料，无法确认的效果和产能明确标注需根据原料、操作和现场试机复核。
- 新增 `scripts/generate-solution-content.mjs` 与 `npm run generate:solutions`，支持重复生成并自动校验产品、文章和 FAQ 引用。
- `llms.txt` 增加中文解决方案导航，方便 AI 工具理解生产场景、配置逻辑和采购边界。
- 构建验证通过：GitHub Pages 模式静态生成 134 个页面。
- 部署提交：`9f8e3b0 Expand equipment solution center`。
- GitHub Actions 部署状态：成功。

### 2026-06-11：首页内容区块统一

- 首页主推产品、解决方案入口、热门 FAQ、最新文章统一展示 4 张内容卡片，解决三卡片与四卡片区块视觉不协调的问题。
- 响应式网格调整为手机 1 列、平板 2 列、桌面 4 列，避免平板端出现“3 + 1”的不完整排列。
- 中文首页线上验证四个区块均准确输出 4 张卡片，页面无横向溢出。
- 部署提交：`9db9116 Balance homepage content grids`。
- GitHub Actions 部署状态：成功。

### 2026-06-11：英文产品内容修复

- 修复 Automatic Roller Poultry Dehairing Machine、Fish Scaling Machine、Fish Meat Separator 三个英文产品页残留中文的问题。
- 将规格字段、规格内容、FAQ 问题和答案完整翻译为英文。
- 修正鱼类脱鳞机和鱼类采肉机错误套用的家禽关键词、应用场景、关联产品和正文描述。
- 三个英文产品 Markdown 和导出页面均完成中文字符扫描，网页可索引文本不再包含中文。
- 保留原始产品宣传图片中的中文印刷内容，不修改用户提供的产品图片素材。
- TypeScript、ESLint 和 GitHub Pages 静态构建验证通过。
- 部署提交：`def38ab Fix English product translations`。
- GitHub Actions 部署状态：成功。

## 17. 当前运营与内容优化重点

下一阶段不建议只继续堆页面数量，应优先提高内容的“可引用性”和“可推荐性”：

- 每个核心产品补充 3-5 个真实使用场景，例如屠宰档口、养殖场、食堂、餐饮门店、水产门店。
- 每个产品增加“适合谁 / 不适合谁 / 购买前要提供什么信息 / 常见误区”。
- FAQ 继续围绕真实采购问题扩展，不写空泛营销文案。
- 文章优先写成可被 AI 直接引用的答案型内容，例如“58型和6滚筒脱毛机怎么选”“泡水温度多少合适”“脱毛机伤皮怎么判断原因”。
- 后续如果有真实客户照片、设备视频、安装现场、售后案例，应优先补充到产品页和解决方案页。
