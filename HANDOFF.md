# CrossPilot 卖家需求调研问卷 — 工作交接文档

## 一、项目概述

这是一个面向跨境电商卖家的在线调研问卷系统，用于收集卖家的真实需求和痛点，为 CrossPilot AI 创业项目提供数据支撑。

**核心功能：**
- 问卷填写页面（中英双语，约 5 分钟，12 题）
- 数据统计仪表盘（雷达图 + 柱状图 + 筛选 + CSV 导出）
- 根据业务类型（平台卖家 / 独立站 / 两者都做）分支显示不同问题

**项目路径：** `~/Desktop/AI创业/crosspilot-survey/`

---

## 二、已完成的工作

### 2.1 问卷设计与开发

问卷共 12 题，问题顺序如下：

| 序号 | 问题 | 类型 | 说明 |
|------|------|------|------|
| Q1 | 您目前主要做哪种业务？ | 单选 | **分支点**：平台卖家 / 独立站 / 两者都做 |
| Q2 | 您做跨境电商多久了？ | 单选 | 半年以下 / 半年-1年 / 1-3年 / 3年以上 |
| Q3 | 您主要做哪些国家/地区？ | 多选 | 北美/欧洲/东南亚/日韩/中东/拉美/其他 |
| Q4 | 您的平均月营收大约是？ | 单选 | 5千以下 ~ 50万以上 |
| Q5-Q7 | 分支问题 | 混合 | 见下方分支逻辑 |
| Q8 | 哪些工作让您最头疼？ | 多选(最多3) | 写文案/做素材/追竞品/SEO/多平台上架/客服 |
| Q9 | AI工具付费意愿 | 单选 | ¥0 ~ ¥600以上 |
| Q10 | 5维痛点评分 | 滑块(1-5) | 创意素材/竞品情报/多语言/广告优化/运营效率 |
| Q11 | 现有AI工具最缺什么 | 单选 | 中文支持/不够智能/太贵/功能分散/不了解 |
| Q12 | 是否愿意留下联系方式 | 单选+输入 | 选"愿意"后弹出微信号/手机号/邮箱输入 |

**分支逻辑（Q1 选择后）：**
- **平台卖家** → Q5(主要平台) → Q6(上新痛点) → Q7(AI工具使用)
- **独立站卖家** → Q5(获客渠道) → Q6(素材时间) → Q7(竞品追踪方式)
- **两者都做** → Q5(主要平台) → Q6(上新痛点) → Q6(素材时间) → Q7(竞品追踪)

每题都有英文翻译，"其他"选项选中后弹出输入框。

### 2.2 技术栈

- **后端：** Python Flask + SQLite
- **前端：** 纯 HTML/CSS/JS，Chart.js 做图表
- **文件结构：**

```
crosspilot-survey/
├── server.py           # Flask 服务端（本地运行用）
├── api/index.py        # Vercel 无服务器函数版本
├── vercel.json         # Vercel 部署配置
├── requirements.txt    # Python 依赖（flask>=3.0.0）
├── Procfile            # Render 部署配置（已弃用）
├── runtime.txt         # Python 版本（已弃用）
├── public/
│   ├── index.html      # 问卷页面
│   ├── admin.html      # 统计仪表盘
│   └── style.css       # 共享样式
└── data/               # 本地 SQLite 存储目录
```

### 2.3 本地运行（已验证可用）

```bash
cd ~/Desktop/AI创业/crosspilot-survey
python3 server.py
# 问卷: http://localhost:3000
# 统计: http://localhost:3000/admin
```

本地运行完全正常，问卷提交、图表显示、删除数据、CSV导出都已测试通过。

### 2.4 统计仪表盘功能

- **雷达图：** 5 维痛点评分，按业务类型分组对比
- **柱状图：** 入行时间/月营收/业务类型/最大痛点/付费意愿/AI工具使用/AI不足/国家分布
- **所有柱状图都显示全部预设选项**（包括 0 人选择的），柱子上方标注数字
- **筛选器：** 按业务类型、入行时间、月营收组合筛选
- **实时刷新：** 每 10 秒自动刷新，有新数据时闪绿色提示
- **删除功能：** 每条数据有删除按钮，有清空全部按钮（二次确认）
- **CSV 导出：** 支持导出全部数据

### 2.5 GitHub 仓库

- 仓库地址：`https://github.com/zacharyzheng-0576/render`
- 已上传文件：server.py, api/index.py, vercel.json, requirements.txt, public/ 下 3 个文件

---

## 三、当前遇到的问题

### 核心问题：问卷无法在国内访问

已经尝试了两个部署平台，都无法在国内正常访问：

1. **Render**（`xxx.onrender.com`）— 国内被墙或极慢
2. **Vercel**（`render-one-flax.vercel.app`）— 部署成功（状态 Ready），但国内无法访问（连接超时）

**根本原因：** 免费部署平台的默认域名（`.onrender.com`、`.vercel.app`）在国内被 DNS 污染或 IP 封锁。

### 解决方向（需要 Codex 继续）

**方向 1：绑自定义域名（推荐）**
- 在 Vercel 后台绑定一个自定义域名（如 `.top`、`.cn` 等国内可访问的域名）
- Vercel 会自动配置 SSL 证书
- 国内用户通过自定义域名访问，绕过 `.vercel.app` 的封锁
- 成本：域名年费约 ¥10-50

**方向 2：换用国内可访问的免费平台**
- 尝试 `github.io`（GitHub Pages）— 但只支持静态页面，需要把后端逻辑迁移到无服务器方案
- 尝试 Cloudflare Pages（`pages.dev`）— 国内可能可访问
- 尝试 Railway（`railway.app`）— 需要测试国内可达性

**方向 3：使用国内云服务**
- 用阿里云/腾讯云的轻量服务器（最便宜约 ¥50/年）
- 完全可控，国内访问速度快
- 需要域名备案（如果用国内服务器）

---

## 四、已知的代码问题

1. **Vercel 的 SQLite 持久化问题：** `api/index.py` 使用 `/tmp/survey.db`，Vercel 无服务器函数的 `/tmp` 是临时存储，冷启动时数据会丢失。如果要长期使用 Vercel，需要迁移到 Vercel Postgres 或外部数据库。

2. **静态文件路径：** `api/index.py` 中 `STATIC_DIR` 的路径计算依赖于 `__file__` 的位置，在 Vercel 环境中可能需要调整。

3. **本地 server.py 和 api/index.py 是两套代码：** 本地用 Flask 直接跑，Vercel 用无服务器函数。如果后续只用一个部署方式，可以合并。

---

## 五、下一步待办

1. **解决国内访问问题** — 这是当前阻塞项
2. **测试完整流程** — 在可访问的环境中测试：填写问卷 → 提交 → 统计页面查看 → 删除数据 → 导出 CSV
3. **数据库持久化** — 如果用 Vercel，需要迁移到持久化数据库
4. **开始收集数据** — 把问卷链接发给跨境电商卖家，开始收集真实反馈

---

## 六、相关的项目文件

问卷项目是 CrossPilot AI 创业项目的一部分，相关文件在 `~/Desktop/AI创业/AI Project Zachary ZHENG/`：

- `CrossPilot_AI_聊天整理_项目思路迭代.md` — 项目方向迭代记录（已更新竞品分析和时间规划）
- `Business Plan/BP_CrossPilot_AI__Zachary_ZHENG.md` — 商业计划书（已调整目标数字和竞品分析）
- `Project Description/Project_Description_001_CrossPilot_AI_项目方案书_Zachary_ZHENG.md` — 项目方案书（已调整）

这些文件之前已根据可行性分析做了修改，主要改动：30天目标改为60天、补充竞品分析（AdSpy/Minea/PipiAds等）、下调付费客户预期、补充客户获取路径。

---

## 七、2026-05-20 继续推进记录

### 7.1 新增国内访问部署方案：EdgeOne Pages + KV

已新增一条更适合国内访问的部署路线：

```
crosspilot-survey/
├── EDGEONE_DEPLOY.md                  # EdgeOne 部署步骤
├── edgeone.json                       # Pages 输出目录配置
├── edge-functions/
│   ├── admin.js                       # /admin → /admin.html
│   ├── admin/
│   │   └── [[default]].js             # /admin/ → /admin.html
│   └── api/
│       └── [[default]].js             # EdgeOne Pages Functions API
└── public/
    ├── assets/
    │   └── chart.umd.min.js           # 本地 Chart.js，后台实际引用
    └── vendor/
        └── chart.umd.min.js           # 本地 Chart.js 备份路径
```

EdgeOne API 已实现并本地模拟测试通过：

- `POST /api/submit`：提交问卷，写入 KV
- `GET /api/stats`：读取全部问卷数据
- `DELETE /api/delete/:id`：删除单条数据
- `DELETE /api/clear`：清空全部数据
- `GET /api/export`：导出 CSV，带 UTF-8 BOM，中文 Excel 兼容

### 7.2 部署时必须注意

1. EdgeOne Pages 静态输出目录填 `public`。
2. 必须创建 KV 命名空间，并绑定变量名 `SURVEY_KV`。
3. 后台 `/admin` 已改为加载本地 `/assets/chart.umd.min.js`，国内打开图表更稳。
4. EdgeOne 上 `/admin` 和 `/admin/` 已通过函数跳转到 `/admin.html`。
5. `/admin` 仍未加密码保护，正式收集前建议补一个简单后台保护。

### 7.3 本次验证

用 Node + 内存 KV 模拟测试了完整 API 流程：

1. 提交一条问卷数据
2. 统计接口返回 1 条
3. CSV 导出包含提交内容
4. 删除该条数据
5. 再次统计返回 0 条
