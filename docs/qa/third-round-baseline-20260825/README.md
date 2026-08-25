# 第三轮迭代升级前页面基线

## 用途

本目录保存 2026-08-25 第三轮官网迭代升级前的完整页面效果，用于改版后的逐页对比和回归检查。

## 截图规范

- 来源：本地当前版本 `http://localhost:3000`
- 视口：1440×900 桌面视口
- 范围：全页截图
- 格式：JPG，质量 74
- 语言：中文、英文
- 数量：22 张

## 页面清单

| 序号 | 页面模板 | 中文截图 | 英文截图 |
| --- | --- | --- | --- |
| 01 | 首页 | `screenshots/zh-01-home.jpg` | `screenshots/en-01-home.jpg` |
| 02 | 产品列表 | `screenshots/zh-02-products-list.jpg` | `screenshots/en-02-products-list.jpg` |
| 03 | 产品详情 | `screenshots/zh-03-product-detail.jpg` | `screenshots/en-03-product-detail.jpg` |
| 04 | 解决方案列表 | `screenshots/zh-04-solutions-list.jpg` | `screenshots/en-04-solutions-list.jpg` |
| 05 | 解决方案详情 | `screenshots/zh-05-solution-detail.jpg` | `screenshots/en-05-solution-detail.jpg` |
| 06 | FAQ 列表 | `screenshots/zh-06-faq-list.jpg` | `screenshots/en-06-faq-list.jpg` |
| 07 | FAQ 详情 | `screenshots/zh-07-faq-detail.jpg` | `screenshots/en-07-faq-detail.jpg` |
| 08 | 文章列表 | `screenshots/zh-08-articles-list.jpg` | `screenshots/en-08-articles-list.jpg` |
| 09 | 文章详情 | `screenshots/zh-09-article-detail.jpg` | `screenshots/en-09-article-detail.jpg` |
| 10 | 关于我们 | `screenshots/zh-10-about.jpg` | `screenshots/en-10-about.jpg` |
| 11 | 联系我们 | `screenshots/zh-11-contact.jpg` | `screenshots/en-11-contact.jpg` |

## 对应路由

- 产品详情：`/products/new-generation-pneumatic-scalding-dehairing-machine/`
- 解决方案详情：`/solutions/58-type-plucker-entry-solution/`
- FAQ 详情：`/faqs/220v-or-380v-poultry-plucker/`
- 文章详情：`/articles/220v-vs-380v-poultry-plucker/`

以上路由分别加 `/zh` 或 `/en` 前缀。列表页因内容数量较大，截图高度明显高于普通详情页，这是完整页面高度，不是图片拉伸。

## 第三轮改版验收建议

1. 对照首页检查头部、主视觉、产品、解决方案、知识内容和底部是否形成统一视觉系统。
2. 对照四类列表页检查分类导航、卡片密度、分页或长列表阅读体验。
3. 对照四类详情页检查首屏信息、正文层级、关联内容和联系方式。
4. 中文确认后，同步检查英文页面是否保持相同组件结构且无中文残留。
5. 桌面版完成后补充移动端截图，不以桌面效果代替响应式验收。
