# GitHub Pages + Firebase 免费部署指南

这条路线适合不要求中国大陆稳定访问的问卷部署：

- GitHub Pages 托管静态网页
- Firebase Firestore 保存问卷数据
- Firebase Auth 保护后台

上线地址会类似：

```text
https://zacharyzheng-0576.github.io/render/
```

## 1. 创建 Firebase 项目

1. 打开 Firebase 控制台。
2. 新建项目，例如 `crosspilot-survey`.
3. Google Analytics 可以先关闭。
4. 进入项目后，点击 Web App 图标 `</>`。
5. App nickname 填 `crosspilot-survey-web`.
6. 复制 Firebase config。

## 2. 填写 Firebase Config

打开 `public/firebase-config.js`，把 `null` 改成 Firebase 给你的配置：

```js
window.CROSSPILOT_FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

window.CROSSPILOT_ADMIN_EMAILS = [
  "你的邮箱@example.com"
];
```

Firebase config 不是数据库密码，可以放在前端。真正的权限由 Firestore Rules 控制。

## 3. 开启 Firestore

1. 在 Firebase 左侧进入 `Firestore Database`.
2. 点击 `Create database`.
3. 选择 Production mode.
4. 区域选择离你近的即可，例如 `asia-east1` 或默认区域。

## 4. 设置 Firestore Rules

把下面规则里的邮箱换成你的后台登录邮箱：

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email in ["你的邮箱@example.com"];
    }

    match /survey_responses/{docId} {
      allow create: if true;
      allow read, delete: if isAdmin();
      allow update: if false;
    }
  }
}
```

这个规则允许任何人提交问卷，但只有你的登录账号可以查看、删除和导出数据。

## 5. 开启后台登录

1. 在 Firebase 左侧进入 `Authentication`.
2. 点击 `Get started`.
3. 在 Sign-in method 中启用 `Email/Password`.
4. 进入 Users，添加你的邮箱和一个密码。

后台 `/admin.html` 会要求你用这个邮箱和密码登录。

## 6. 开启 GitHub Pages

1. 打开 GitHub 仓库 `zacharyzheng-0576/render`.
2. 进入 `Settings` -> `Pages`.
3. Source 选择 `Deploy from a branch`.
4. Branch 选择 `main`.
5. Folder 选择 `/docs`.
6. 点击 `Save`.
7. 等待 Pages 部署完成后，访问：

```text
https://zacharyzheng-0576.github.io/render/
```

## 7. 验证

1. 打开问卷页面，提交一份测试问卷。
2. 打开 `/render/admin.html`.
3. 用 Firebase Authentication 里创建的邮箱密码登录。
4. 确认看到 1 份问卷、图表正常、CSV 可以导出。
