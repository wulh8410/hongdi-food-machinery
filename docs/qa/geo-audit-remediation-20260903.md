# GEO/SEO 审查修复记录（2026-09-03）

审查对象：`https://hd.hong1234.com/zh/`

## 已修复

| 审查问题 | 修复动作 | 对用户和搜索系统的影响 |
| --- | --- | --- |
| 正式域名信号仍指向 Vercel | 全站 `baseUrl` 改为 `https://hd.hong1234.com`；canonical、Open Graph、Schema、robots、sitemap、llms.txt 随配置统一生成 | 自定义域成为唯一权威地址，减少重复站点身份冲突 |
| 旧 Vercel 域仍可访问相同内容 | `vercel.json` 增加按 Host 匹配的永久重定向 | 部署后旧域访问会转到正式域，权重更集中 |
| hreflang 域名错误、无 x-default、英文 HTML 仍为中文语言 | 双语页面输出 `zh-CN`、`en` 和 `x-default`；根布局按语言输出正确 `<html lang>` | AI 和搜索引擎更容易匹配中英文页面 |
| 首页只有 Organization Schema | 新增 WebSite Schema；Organization 增加稳定 `@id`、logo、结构化地址和 contactPoint | 品牌实体、网站实体和联系方式更清晰 |
| 文章作者和更新时间信号不足 | 文章页显示发布机构、发布日期、更新日期；BlogPosting Schema 增加 author.url、publisher logo、image、dateModified、mainEntityOfPage | 提升内容来源与更新状态的可验证性 |
| 缺少隐私政策和使用条款 | 新增中英文隐私政策、使用条款，加入页脚；根路径 `/privacy`、`/terms` 跳转中文版本 | 补齐基础信任页面，客户也能理解信息和产品资料如何使用 |
| 首页 H1 过宽、H2 缺少核心词 | H1 明确“家禽脱毛机与泡水浸烫设备厂家”；核心设备 H2 明确覆盖家禽脱毛机 | 首页主营业务更直观，核心主题更集中 |
| 多张内容图片使用空 alt | 为设备细节、方案流程、优势和知识区图片补充描述；仅装饰背景保留空 alt | 图片内容对无障碍工具和抓取系统更可理解 |
| 移动端没有完整导航 | 增加移动导航菜单、语言入口和电话咨询入口 | 手机用户可以访问全部栏目并直接联系厂家 |
| 详情页咨询信息不可点击 | 电话和邮箱改成 `tel:`、`mailto:` 链接 | 移动端可直接拨号或发邮件 |
| 确定重复内容参与索引 | 新增自动内容质量映射；标题和正文相同或仅后缀不同的重复页保留访问但输出 `noindex, follow` 与权威 canonical，并从列表、sitemap、llms.txt 排除 | 旧链接不失效，同时减少关键词内耗和低质量索引 |
| llms.txt 过度枚举页面 | 改成 Markdown 标准链接和精选入口；完整索引交由 sitemap | AI 抓取入口更简洁，避免把重复内容作为重点材料 |

## 去重结果

- 中文文章：306 个历史 URL，214 个权威索引页，92 个确定重复页退出索引。
- 中文 FAQ：451 个历史 URL，333 个权威索引页，118 个确定重复页退出索引。
- 产品和解决方案未发现“标题与内容均相同”的确定重复项。
- 英文内容中存在较强的模板相似性，但标题对应的问题不同。本轮没有粗暴合并，避免破坏既有 3/7/6 分类结构；后续应按真实资料分批重写，而不是继续批量扩页。

## 未伪造的项目

- `sameAs`：目前只有抖音和视频号账号名称，没有可核验的公开主页 URL，因此暂不写入 Schema。取得准确主页链接后再补。
- 外部引用：没有为通过评分而添加与页面无关的引用。产品参数、案例、证书和行业标准引用应基于可核验资料逐页补充。
- “AI 采用与推荐”无法由代码保证；本轮目标是提高内容可发现性、实体一致性、来源透明度与引用稳定性。

## 验证

- `npx tsc --noEmit`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，1854 个静态页面全部生成。
- 导出首页：中文 `<html lang="zh-CN">`，英文 `<html lang="en">`。
- 中文首页 canonical：`https://hd.hong1234.com/zh/`。
- 首页 JSON-LD：包含 Organization 与 WebSite。
- sitemap：只使用正式域名，包含 1640 个可索引 URL，排除 210 个确定重复页。
- llms.txt：216 个精选链接，不包含旧 Vercel 域和确定重复页。
- 全站扫描：1850 个双语页面的 canonical、hreflang 和语言声明全部通过；3698 段 JSON-LD 均可解析；210 个重复页准确输出 `noindex, follow`。
- 浏览器检查：1440px 桌面与 390px 手机均无横向溢出；移动菜单可展开，页脚隐私/条款链接存在，电话咨询可点击。
- 回归检查命令：构建后运行 `npm run verify:geo`，自动校验全站 canonical、hreflang、语言声明、重复页索引规则、JSON-LD、信任页面和索引文件。

## 发布状态

- 代码与本地静态导出已验证完成。
- 本轮尚未提交 Git、推送 GitHub 或部署到线上。
- 本地预览：`http://localhost:3000/zh/`。
- Vercel 域名重定向必须随下一次部署才会生效。

## 参考规则

- [Google canonical 说明](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Google x-default 说明](https://developers.google.com/search/blog/2023/05/x-default?hl=en)
- [Google Organization 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google WebSite 站点名称结构化数据](https://developers.google.com/search/docs/appearance/site-names)
- [Google 文章日期说明](https://developers.google.com/search/docs/appearance/publication-dates)
