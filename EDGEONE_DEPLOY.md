# CrossPilot Survey EdgeOne Pages 部署指南

这条部署路径用于解决国内访问问题：静态页面放在 EdgeOne Pages，接口用 EdgeOne Pages Functions，数据存到 EdgeOne KV。现有前端仍然请求 `/api/submit`、`/api/stats`、`/api/export` 等路径，不需要改问卷逻辑。

## 1. 推送代码

先把本地代码推送到 GitHub 仓库：

```bash
cd ~/Desktop/AI创业/crosspilot-survey
git add .
git commit -m "add edgeone pages deployment"
git push
```

## 2. 创建 EdgeOne Pages 项目

1. 打开 EdgeOne Pages 控制台，新建项目。
2. 选择当前 GitHub 仓库。
3. Framework preset 选择 `None` 或静态站点。
4. Build command 留空。
5. Output directory 填 `public`。
6. 部署分支选择 `main`。

仓库里的 `edgeone.json` 已经把输出目录写成 `public`，如果控制台能自动识别，可以直接使用默认值。

## 3. 创建并绑定 KV

1. 在 EdgeOne Pages 控制台创建一个 KV 命名空间，例如 `crosspilot_survey`.
2. 进入 Pages 项目的 Functions / KV 绑定设置。
3. 绑定变量名必须填：

```text
SURVEY_KV
```

4. 重新部署项目。

如果变量名不是 `SURVEY_KV`，接口会返回 `Missing EdgeOne KV binding`。

## 4. 验证

部署完成后打开：

```text
https://你的-edgeone-域名/
https://你的-edgeone-域名/admin
```

`/admin` 会自动跳转到 `/admin.html`，这是为了保留原来本地 Flask 的访问习惯。

测试顺序：

1. 填写并提交一份问卷。
2. 打开 `/admin`，确认总数增加、图表正常显示。
3. 点击导出 CSV，确认中文不乱码。
4. 删除一条数据，确认刷新后消失。

## 5. 后续建议

- 如果要正式发给卖家，建议绑定一个自己的短域名，便于信任和传播。
- `/admin` 目前没有密码保护，不要把后台链接公开发出去。
- 如果数据量超过几千份，建议再迁移到数据库型存储；当前 KV 方案足够支撑早期调研。
