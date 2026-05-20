# CrossPilot Survey 项目交接给 Claude Code

## 0. 一句话结论

这是一个跨境电商卖家需求调研问卷项目。前端问卷和后台仪表盘已经完成，当前主要卡点是：**免费静态部署方案下，问卷提交数据的后端服务选择还没最终稳定下来**。

目前线上 GitHub Pages 页面已经可访问，但 Firebase/Firestore 提交在用户当前网络环境下出现 `Failed to fetch`，高度疑似因为浏览器无法访问 Google Firebase 服务。

建议 Claude Code 接手后优先做：**把数据后端从 Firebase 切到 Supabase，保留 GitHub Pages 静态前端**。

---

## 1. 项目基本信息

项目路径：

```bash
~/Desktop/AI创业/crosspilot-survey
```

GitHub 仓库：

```text
https://github.com/zacharyzheng-0576/render
```

当前 Git 分支：

```text
main
```

当前线上 GitHub Pages 地址：

```text
https://zacharyzheng-0576.github.io/render/
```

后台地址：

```text
https://zacharyzheng-0576.github.io/render/admin.html
```

当前最新提交：

```text
9a46f69 bust inline submit cache
```

仓库当前状态：

```text
main...origin/main
```

表示本地和远端已同步。

---

## 2. 项目功能概览

这是一个面向跨境电商卖家的需求调研系统。

已实现：

- 问卷填写页，中英双语
- 业务类型分支逻辑：
  - 平台卖家
  - 独立站卖家
  - 两者都做
- 12 道题，包括：
  - 业务类型
  - 入行时间
  - 目标国家/地区
  - 月营收
  - 平台/独立站分支问题
  - 最大痛点
  - AI 工具付费意愿
  - 5 维痛点评分
  - AI 工具缺口
  - 联系方式
- 后台统计页：
  - 总问卷数
  - 雷达图
  - 饼图/柱状图
  - 筛选
  - 最新提交表格
  - 删除单条
  - 清空全部
  - CSV 导出

---

## 3. 当前文件结构重点

```text
crosspilot-survey/
├── public/
│   ├── index.html              # 问卷页源文件
│   ├── admin.html              # 后台页源文件
│   ├── style.css               # 样式
│   ├── firebase-config.js      # Firebase 配置
│   ├── firebase-service.js     # Firebase 数据层
│   └── assets/chart.umd.min.js # 本地 Chart.js
├── docs/
│   ├── index.html              # GitHub Pages 实际发布文件
│   ├── admin.html
│   ├── style.css
│   ├── firebase-config.js
│   ├── firebase-service.js
│   └── assets/chart.umd.min.js
├── server.py                   # 本地 Flask + SQLite 版本
├── api/index.py                # Vercel Python 版本
├── edge-functions/             # EdgeOne Pages Functions 尝试
├── EDGEONE_DEPLOY.md           # EdgeOne 部署记录
├── GITHUB_PAGES_FIREBASE.md    # GitHub Pages + Firebase 部署记录
├── HANDOFF.md                  # 原始和中途交接记录
└── CLAUDE_HANDOFF.md           # 当前文件
```

重要提醒：

```text
GitHub Pages 当前发布目录是 docs/
```

所以改 `public/` 后，必须同步到 `docs/`，否则线上不会变化。

常用同步方式：

```bash
cp public/index.html docs/index.html
cp public/admin.html docs/admin.html
cp public/style.css docs/style.css
cp public/firebase-config.js docs/firebase-config.js
cp public/firebase-service.js docs/firebase-service.js
```

---

## 4. 已经尝试过的部署路线

### 4.1 本地 Flask + SQLite

本地版本最早已验证可用。

运行方式：

```bash
cd ~/Desktop/AI创业/crosspilot-survey
python3 server.py
```

访问：

```text
http://localhost:3000
http://localhost:3000/admin
```

注意：当前用户 Python 环境可能没有安装 Flask，运行时可能报：

```text
ModuleNotFoundError: No module named 'flask'
```

如果需要本地复测，可先安装依赖：

```bash
pip install -r requirements.txt
```

### 4.2 Render / Vercel

曾尝试 Render 和 Vercel。

问题：

- `onrender.com` 国内访问慢或不可用
- `vercel.app` 国内访问超时
- Vercel 的 `/tmp/survey.db` 不持久，SQLite 数据会丢

所以这条路线不推荐继续，除非换外部数据库。

### 4.3 EdgeOne Pages + KV

已新增 EdgeOne 版本：

```text
edge-functions/api/[[default]].js
edge-functions/admin.js
edgeone.json
EDGEONE_DEPLOY.md
```

已实现 API：

- `POST /api/submit`
- `GET /api/stats`
- `DELETE /api/delete/:id`
- `DELETE /api/clear`
- `GET /api/export`

问题：

EdgeOne 默认域名：

```text
*.edgeone.dev
```

在项目区域为：

```text
全球可用区（不含中国大陆）
```

时，中国大陆访问会返回：

```text
401 UNAUTHORIZED
eo_time missing
```

官方建议绑定自定义域名。用户曾进入 `survey.crosspilot.top` 的域名归属验证界面，但后来询问是否有不花钱路线，因此没有继续。

如果继续 EdgeOne：

- 需要绑定自定义域名
- 或完成备案/大陆区域配置
- 或接受非大陆访问

### 4.4 GitHub Pages + Firebase

当前主线尝试。

GitHub Pages 已上线：

```text
https://zacharyzheng-0576.github.io/render/
```

GitHub Pages 设置应为：

```text
Settings → Pages
Source: Deploy from a branch
Branch: main
Folder: /docs
```

Firebase 项目：

```text
crosspilot-survey
```

Firebase config 已写入：

```js
window.CROSSPILOT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBVXihMjbNwyR5Uyq37VlCWXAex1Yw-gf4",
  authDomain: "crosspilot-survey.firebaseapp.com",
  projectId: "crosspilot-survey",
  storageBucket: "crosspilot-survey.firebasestorage.app",
  messagingSenderId: "56303894366",
  appId: "1:56303894366:web:6c4e3e811b2bd0778b59cf",
  measurementId: "G-12BGFPD8ZM"
};
window.CROSSPILOT_ADMIN_EMAILS = [
  'hambur.zach@gmail.com'
];
```

后台管理员邮箱：

```text
hambur.zach@gmail.com
```

不要索要或记录后台密码。

Firestore Rules 预期应为：

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email in ["hambur.zach@gmail.com"];
    }

    match /survey_responses/{docId} {
      allow create: if true;
      allow read, delete: if isAdmin();
      allow update: if false;
    }
  }
}
```

Authentication：

- 已引导用户开启 Email/Password
- 已引导用户创建 `hambur.zach@gmail.com` 用户

已验证：

- 服务器端 `curl` 能写 Firestore
- 未登录读 Firestore 返回 `403`，这是预期的，说明读权限没有公开
- 后台已改成 Firestore `onSnapshot` 实时监听
- 问卷页已加提交中状态和错误提示
- 问卷页已尝试去掉阻塞的 Firebase SDK，改用 Firestore REST 提交
- 问卷页还加了 inline Firestore submit fallback

当前问题：

用户在问卷端点击提交后出现：

```text
Failed to fetch
```

判断：

这通常表示浏览器无法连到：

```text
https://firestore.googleapis.com
```

在用户当前网络环境中，Google/Firebase 很可能不可达。也就是说，GitHub Pages + Firebase 对这个用户/目标访问环境不稳定。

---

## 5. 当前最关键问题

### 问题 A：不要用 file:// 测试

用户曾在内置浏览器打开：

```text
file:///Users/.../public/index.html
```

这不是线上问卷。Firebase/Auth/Firestore 在 `file://` 下容易异常。

正确测试地址：

```text
https://zacharyzheng-0576.github.io/render/?v=9a46f69
```

或去掉参数：

```text
https://zacharyzheng-0576.github.io/render/
```

### 问题 B：Firebase 在当前网络下 `Failed to fetch`

即使使用 GitHub Pages 正式地址，用户仍看到：

```text
Failed to fetch
```

这高度疑似浏览器无法访问 Firestore API。

如果用户目标是海外访问，可以继续 Firebase。

如果用户希望自己在国内网络能稳定测试、或希望国内卖家也能提交，不建议继续 Firebase。

---

## 6. 推荐下一步

### 首推：迁移到 Supabase

建议 Claude Code 下一步把后端从 Firebase 换成 Supabase：

```text
GitHub Pages 静态前端 + Supabase Database/Auth/API
```

原因：

- 保留 GitHub Pages 免费静态托管
- 保留现有问卷 UI 和后台
- Supabase 免费额度够早期问卷使用
- 比 Firebase 更适合当前网络环境测试
- 不需要自建服务器

需要用户创建 Supabase 项目，并提供：

```text
SUPABASE_URL
SUPABASE_ANON_KEY
管理员邮箱
```

注意：

Supabase anon key 也是前端可公开 key，真正权限靠 RLS。

建议 Supabase 表结构：

```sql
create table survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  data jsonb not null
);
```

建议 RLS：

- 允许匿名 `insert`
- 只允许管理员登录后 `select/delete`
- 禁止 `update`

一种简单方式：

```sql
alter table survey_responses enable row level security;

create policy "Anyone can submit survey"
on survey_responses
for insert
to anon
with check (true);

create policy "Admin can read"
on survey_responses
for select
to authenticated
using (auth.jwt() ->> 'email' = 'hambur.zach@gmail.com');

create policy "Admin can delete"
on survey_responses
for delete
to authenticated
using (auth.jwt() ->> 'email' = 'hambur.zach@gmail.com');
```

前端迁移建议：

- 新建 `public/supabase-config.js`
- 新建或替换 `public/firebase-service.js` 为更通用的 `public/data-service.js`
- 同步到 `docs/`
- `index.html` 调 `CrossPilotData.submitResponse`
- `admin.html` 调 `CrossPilotData.loadResponses/subscribeResponses/deleteResponse/clearResponses/login`
- 后台可用 Supabase Auth email/password 登录

### 备选：继续 EdgeOne + KV

如果用户愿意绑定域名，EdgeOne + KV 也可继续。

优点：

- 腾讯云国内生态
- Edge Functions + KV 代码已经写好

缺点：

- 默认 `edgeone.dev` 在中国大陆不可用
- 自定义域名可能要买域名
- 大陆节点可能涉及备案

### 备选：腾讯问卷/问卷星

如果用户目标只是快速收集数据，可以用国内问卷平台。

优点：

- 国内访问稳定
- 零开发成本

缺点：

- 放弃当前自定义网页和后台

---

## 7. 当前代码里需要注意的坑

### 7.1 public 和 docs 双目录

当前源文件在：

```text
public/
```

GitHub Pages 实际发布：

```text
docs/
```

所以每次改前端，必须同步。

### 7.2 admin 后台仍依赖 Firebase SDK

当前后台：

```text
docs/admin.html
docs/firebase-service.js
```

仍依赖：

```text
https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js
https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js
https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js
```

如果网络无法访问 Google，后台登录/读取也会失败。

这也是迁移 Supabase 的原因之一。

### 7.3 问卷提交目前有多层 fallback

当前 `index.html` 已内置 Firestore REST submit fallback。

但是只要浏览器无法访问：

```text
firestore.googleapis.com
```

仍会 `Failed to fetch`。

---

## 8. 已知测试记录

曾用 Firestore REST 写入测试记录：

```text
测试数据
Codex后台接收测试
```

如果后台能登录，可以看到这些记录并删除。

如果迁移 Supabase，旧 Firebase 测试记录可以忽略。

---

## 9. 推荐 Claude Code 接手执行顺序

1. 确认用户是否愿意注册 Supabase 免费项目。
2. 指导用户创建 Supabase project。
3. 在 Supabase SQL Editor 创建 `survey_responses` 表和 RLS policies。
4. 获取 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY`。
5. 替换前端数据层：
   - 新增 `public/supabase-config.js`
   - 新增或重写 `public/data-service.js`
   - 更新 `public/index.html`
   - 更新 `public/admin.html`
   - 同步到 `docs/`
6. 本地静态检查：
   - `node --check public/data-service.js`
   - `rg` 检查旧 Firebase 引用是否清理干净
7. 提交并推送 GitHub。
8. 打开线上 GitHub Pages 测试：
   - 提交问卷
   - 后台登录
   - 后台实时/刷新读取
   - 删除测试数据
   - CSV 导出

---

## 10. 关键命令

查看状态：

```bash
cd ~/Desktop/AI创业/crosspilot-survey
git status --short --branch
git log --oneline -10 --decorate
```

同步 `public` 到 `docs`：

```bash
cp public/index.html docs/index.html
cp public/admin.html docs/admin.html
cp public/style.css docs/style.css
cp public/firebase-config.js docs/firebase-config.js
cp public/firebase-service.js docs/firebase-service.js
```

提交推送：

```bash
git add .
git commit -m "..."
git push
```

线上访问：

```text
https://zacharyzheng-0576.github.io/render/
https://zacharyzheng-0576.github.io/render/admin.html
```

---

## 11. 给 Claude Code 的最终建议

不要继续在 Firebase 上花太多时间，除非用户确认目标填写者都能访问 Google/Firebase。

当前最平滑的接手路径是：

```text
保留 GitHub Pages
保留现有问卷 UI
把数据层从 Firebase 换成 Supabase
```

这能最大程度复用已有代码，同时解决当前 `Failed to fetch` 的核心网络问题。
