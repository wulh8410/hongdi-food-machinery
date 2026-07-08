# 洪弟食品机械官网项目对话与进度记录（2026-07-08）

> 用途：迁移到新电脑后，给开发者或 Codex 快速了解项目背景、当前进度、关键约束和本地资料位置。本文是项目对话的结构化记录，不是逐字聊天转录。

## 1. 项目当前状态

- 项目名称：`food-machinery-geo-site`
- 本地路径：`D:\CodxWork\网站1`
- GitHub 仓库：`https://github.com/wulh8410/hongdi-food-machinery`
- 线上 Vercel 地址：`https://hongdi-food-machinery.vercel.app/`
- 备用 GitHub Pages 地址：`https://wulh8410.github.io/hongdi-food-machinery/`
- 技术栈：Next.js 14、TypeScript、Tailwind CSS、Markdown 内容、JSON 数据、静态导出。
- 部署方式：当前以 Vercel 为主，推送 `main` 后自动部署；GitHub Pages 暂时保留。

## 2. 官网定位与品牌口径

- 官网品牌统一为：`洪弟食品机械`。
- 对外定位：食品机械设备源头厂家，重点围绕家禽脱毛机、泡水浸烫机、烫脱一体机、鸡鸭鹅处理设备和配套设备。
- 客户可见文案必须面向真实采购客户：说明设备用途、适用场景、配置建议、安装维护、售后咨询和厂家确认方式。
- 客户可见正文不要出现内部运营表达，例如：`GEO`、`AI 助手`、`搜索引擎`、`内容沉淀`、`可被引用`、`页面入口` 等。
- 内容策略可以服务 GEO，但页面上的话要像正常官网，而不是内部优化备注。

## 3. 主要页面与内容结构

- 中文路由：`/zh/`、`/zh/products/`、`/zh/solutions/`、`/zh/faqs/`、`/zh/articles/`、`/zh/about/`、`/zh/contact/`
- 英文路由：`/en/`、`/en/products/`、`/en/solutions/`、`/en/faqs/`、`/en/articles/`、`/en/about/`、`/en/contact/`
- 内容目录：
  - `content/zh/products`
  - `content/zh/articles`
  - `content/zh/faqs`
  - `content/zh/solutions`
  - `content/en/products`
  - `content/en/articles`
  - `content/en/faqs`
  - `content/en/solutions`
- 产品图片线上资源：`public/images/products/new-2026/`
- 本地原始产品图工作目录：`produce/`，用户会不定期更新该目录下产品图，再同步覆盖到 `public/images/products/new-2026/`。

## 4. 产品与展示规则

- 当前产品中心以 11 款新产品为主，旧产品已移入 archive，不作为主线展示。
- 首页核心设备只展示 3 款高价值烫脱/泡水相关设备：
  - 新一代气动翻出泡水脱毛一体机
  - 双面翻盖不锈钢鸡鹅鸭搅拌机
  - 胶棒搅拌不锈钢鸡鹅鸭泡水机
- 产品中心排序：烫脱一体设备优先，其次家禽脱毛设备。
- 产品卡片和详情页图片要完整展示设备图，不要裁切掉参数、设备主体或详情图信息。
- 产品详情页首屏右侧应紧凑展示标题、简介、摘要、设备特点、适用场景和技术参数；不要恢复“咨询前建议提供”“厂家支持”两块首屏清单。

## 5. 内容中心分类约束

以下分类数量必须稳定，不要因为某类暂时内容少就隐藏入口：

- Solutions 固定 3 类：
  - 家禽加工 / Poultry Processing
  - 水产加工 / Aquatic Processing
  - 场地与配套 / Site and Support
- FAQ 固定 7 类：
  - 采购报价 / Buying and Pricing
  - 型号选型 / Model Selection
  - 适用场景 / Applications
  - 加工效果 / Processing Results
  - 场地水电 / Site and Utilities
  - 清洗维护 / Cleaning and Maintenance
  - 安全卫生 / Safety and Sanitation
- Articles 固定 6 类：
  - 采购选型 / Buying Guides
  - 产品知识 / Product Knowledge
  - 使用维护 / Use and Maintenance
  - 场景方案 / Scenario Solutions
  - 安装验收 / Installation and Acceptance
  - 厂家与服务 / Factory and Service

## 6. 已完成的重要阶段

1. 建立中英文双语静态官网框架，支持产品、文章、FAQ、解决方案、关于、联系等页面。
2. 接入 SEO/GEO 基础设施：`sitemap.xml`、`robots.txt`、`llms.txt`、JSON-LD Schema。
3. 品牌从“洪弟机械食品厂”纠正为“洪弟食品机械”。
4. 更新新 Logo、门头图、产品图和产品详情图。
5. 产品中心切换为新一批食品机械设备，移除鱼糜丸类、旧鱼类和旧肉类加工方向作为主线展示。
6. 多批次扩展中文文章、FAQ 和解决方案，用真实采购问题补充内容。
7. 补齐英文版内容中心，避免英文版只保留少量样例。
8. 优化首页、产品中心、详情页、底部、列表页分类导航。
9. 当前最新一次提交前的关键提交包括：
   - `35787ef 修复内容中心分类数量`
   - `5153f05 补齐英文版内容中心`
   - `11c8a34 扩充文章与FAQ分类内容`
   - `0702e94 Add Douyin-driven poultry content expansion`

## 7. 抖音评论抓取与内容洞察

抖音评论数据是后续 GEO 内容扩展的重要资料来源，但原始 CSV/JSON 数据默认不提交 Git。迁移新电脑时，如果后续还要继续做评论分析，需要从旧电脑单独复制这些文件。

### 7.1 已有抓取脚本

这些脚本应纳入 Git，方便新电脑继续使用：

- `scripts/scrape_douyin_account_comments.py`
- `scripts/scrape_douyin_search_top_comments.py`
- `scripts/analyze_douyin_comments.py`
- `scripts/analyze_douyin_search_comments.py`
- `scripts/summarize_douyin_batches.py`
- `scripts/generate-four-douyin-search-content.py`
- `scripts/generate-poultry-slaughter-line-content.py`

### 7.2 抓取方式

- 使用隔离 Chrome + CDP 复用验证状态。
- 抖音页面通常需要人工完成一次验证码。
- 验证完成后用脚本复用 CDP 会话抓取视频、搜索结果或账号评论。
- 本机代理环境变量可能干扰 Python 请求，脚本运行前要注意清理包含 `proxy` 的环境变量。

### 7.3 已抓取的数据类型

根目录下存在多类未跟踪数据文件，迁移时按需复制：

- 单视频评论：
  - `douyin-comments-*.csv`
  - `douyin-comments-*.json`
  - `douyin-comments-*.dedup.json`
  - `douyin-comments-*.raw-pages.json`
- 账号级评论：
  - `douyin-user-*-videos.csv`
  - `douyin-user-*-videos.json`
  - `douyin-user-*-all-comments.csv`
  - `douyin-user-*-all-comments.json`
  - `douyin-user-*-comment-failures.json`
- 搜索关键词评论：
  - `douyin-search-*-top50-videos.csv/json`
  - `douyin-search-*-top50-comments.csv/json`
  - `douyin-search-*-top50-comment-analysis.csv`
  - `douyin-search-*-top50-factory-analysis.md`
  - `douyin-search-*-top50-failures.json`

### 7.4 已沉淀的评论洞察方向

- 客户最常问的不是单纯价格，而是：
  - 不同鸡、鸭、鹅、鸽、羊、猪等品类是否适用
  - 水温、浸烫时间、泡水条件对脱毛效果的影响
  - 是否破皮、伤肉、断骨、影响口感
  - 细毛残留、胶棒耗材、维护清洗
  - 220V/380V、功率、场地、排水、蒸汽/锅炉条件
  - 小型档口、养殖场、食堂、餐饮店、集中加工点如何配置
  - 活禽误解、食品加工合规流程和卫生安全
- 官网内容应把这些问题写成客户可读的采购选型、安装维护、现场管理文章，而不是写成内部评论分析报告。
- 涉及争议画面或活禽误解时，统一用“规范宰杀、放血、沥血后进入浸烫脱毛环节”的合规食品加工口径表达。

## 8. 新电脑迁移步骤

1. 安装 Node.js，建议使用当前 LTS 版本。
2. 克隆仓库：

```powershell
git clone https://github.com/wulh8410/hongdi-food-machinery.git
cd hongdi-food-machinery
```

3. 安装依赖：

```powershell
npm install
```

4. 本地开发：

```powershell
npm run dev
```

5. 构建验证：

```powershell
npm run build
```

6. 如果需要继续做抖音评论分析，把旧电脑根目录下的 `douyin-*` 数据文件、`produce/` 和 `produce_backup_*` 按需复制到新电脑项目根目录。
7. 如果本地预览报 `Cannot find module './vendor-chunks/esprima.js'`，停止 Node 进程，删除 `.next`，再重新执行 `npm run dev`。

## 9. 不要误提交的内容

- 画册相关文件默认不提交，除非用户特别说明。
- 抖音原始 CSV/JSON 评论数据默认不提交，除非用户明确要求。
- `produce/` 和 `produce_backup_*` 默认作为本地素材工作区，不直接提交；网站实际使用图片应同步到 `public/images/products/new-2026/` 后再提交。

## 10. 继续开发时优先检查

- 每次进入项目先读 `AGENTS.md` 和 `MEMORY.md`。
- 修改客户可见文案时，先判断是否像正常官网给采购客户看的内容。
- 修改列表页时，检查 Solutions / FAQ / Articles 固定分类数量。
- 修改图片时，检查首页、产品中心、产品详情页是否同步。
- 修改内容后运行 `npm run build`，确认 sitemap、robots、llms 自动生成正常。
