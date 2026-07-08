# 给新电脑 Codex 的接续提示词（2026-07-08）

把下面这段话复制给新电脑上的 Codex，即可接上当前项目继续开发。

```text
你现在接手的是洪弟食品机械官网项目，项目根目录是当前仓库。

第一步必须先完整读取 ./AGENTS.md 和 ./MEMORY.md，再处理任何开发任务。默认中文回复。技术决策要说明“为什么”和“对用户的影响”。不要把内部 GEO/AI/搜索优化话术写到客户可见页面。

项目基本信息：
- 项目名：food-machinery-geo-site
- 技术栈：Next.js 14 + TypeScript + Tailwind CSS + Markdown/MDX + JSON 数据 + 静态导出
- GitHub 仓库：https://github.com/wulh8410/hongdi-food-machinery
- Vercel 线上地址：https://hongdi-food-machinery.vercel.app/
- GitHub Pages 暂时保留：https://wulh8410.github.io/hongdi-food-machinery/
- 当前品牌统一为：洪弟食品机械

当前核心目标：
这是食品机械工厂官网，不是食品厂官网。页面要服务真实采购客户，同时兼顾 GEO。客户可见文案要讲设备用途、适用场景、配置建议、安装维护、售后咨询和厂家确认方式，不要写“GEO、AI 助手、搜索引擎、页面入口、内容沉淀”等内部运营表达。

关键内容结构：
- 产品：content/zh/products、content/en/products
- 文章：content/zh/articles、content/en/articles
- FAQ：content/zh/faqs、content/en/faqs
- 解决方案：content/zh/solutions、content/en/solutions
- 产品图片线上资源：public/images/products/new-2026/
- 本地原始产品图工作区：produce/，如用户提供新图，先同步覆盖到 public/images/products/new-2026/，不要直接提交 produce/，除非用户明确要求。

固定分类规则：
- Solutions 固定 3 类：家禽加工 / Poultry Processing，水产加工 / Aquatic Processing，场地与配套 / Site and Support。
- FAQ 固定 7 类：采购报价、型号选型、适用场景、加工效果、场地水电、清洗维护、安全卫生。
- Articles 固定 6 类：采购选型、产品知识、使用维护、场景方案、安装验收、厂家与服务。

产品展示规则：
- 首页核心设备只展示 3 款高价值烫脱/泡水相关设备：新一代气动翻出泡水脱毛一体机、双面翻盖不锈钢鸡鹅鸭搅拌机、胶棒搅拌不锈钢鸡鹅鸭泡水机。
- 产品中心排序：烫脱一体设备优先，其次家禽脱毛设备。
- 产品图片要完整展示，不要裁切掉设备主体、参数和详情图信息。
- 产品详情页首屏右侧要紧凑展示标题、简介、摘要、设备特点、适用场景和技术参数，不要恢复“咨询前建议提供”和“厂家支持”两个首屏清单。

抖音评论抓取与内容扩展：
- 项目有一条重要内容来源是抖音评论洞察，用于发现真实客户问题，再转化为官网文章、FAQ 和解决方案。
- 抓取方式是隔离 Chrome + CDP，通常需要用户手动完成一次抖音验证码，然后脚本复用验证状态。
- 相关脚本在 scripts/ 下，重点包括 scrape_douyin_account_comments.py、scrape_douyin_search_top_comments.py、analyze_douyin_comments.py、analyze_douyin_search_comments.py、summarize_douyin_batches.py、generate-four-douyin-search-content.py、generate-poultry-slaughter-line-content.py。
- 原始抖音 CSV/JSON 数据默认不提交 Git；如果新电脑需要继续分析，要从旧电脑项目根目录单独复制 douyin-* 文件。
- 评论洞察重点：价格咨询、适用品类边界、水温浸烫、脱毛效果、破皮伤肉、细毛残留、胶棒耗材、场地水电排水、卫生异味、食品加工合规流程。涉及活禽争议时统一使用“规范宰杀、放血、沥血后进入浸烫脱毛环节”的客户可读表述。

部署与验证：
- 本地运行：npm run dev
- 构建验证：npm run build
- 推送 main 后 Vercel 自动部署。
- 如果 localhost 报 Cannot find module './vendor-chunks/esprima.js'，停止 Node 进程，删除 .next，再重新 npm run dev。

提交边界：
- 画册相关文件默认不提交。
- 抖音原始 CSV/JSON 默认不提交。
- produce/ 和 produce_backup_* 默认不提交。
- 代码、内容 Markdown、网站正式图片资源、交接文档和必要脚本可以提交。

正式开始任何任务前，先读 docs/handoff/20260708-project-dialogue-record.md，了解项目阶段、对话进度、抖音评论资料和迁移说明。
```
