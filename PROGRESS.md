# CrossPilot Survey 项目进度

> 更新时间：2026-05-22
> 当前分支：main
> 最新提交：f5871b7 Handle shallow survey replacement on deep submit

---

## 一、项目概述

**项目名称**：CrossPilot AI 跨境电商卖家需求调研系统

**项目目标**：收集跨境电商卖家的需求和痛点，为 CrossPilot AI 产品方向提供数据支持。

**技术栈**：
- 前端：纯 HTML/CSS/JavaScript + Tailwind CSS
- 后端：Supabase (PostgreSQL + Auth)
- 部署：GitHub Pages
- 图表：Chart.js
- 导出：SheetJS (Excel) + jsPDF (PDF)

**线上地址**：
- 问卷端：https://zacharyzheng-0576.github.io/render/
- 后台端：https://zacharyzheng-0576.github.io/render/admin.html

---

## 二、已完成功能

### 问卷端 (index.html)

1. **双版本问卷**
   - 浅度调查：12题，约5分钟
   - 深度调查：25题，约10分钟
   - 着陆页选择问卷类型

2. **UI 设计**
   - 苹果液态玻璃风格
   - 深色背景 + 底部 indigo 渐变
   - 卡片模糊效果 + 半透明边框
   - 单选题自动跳转
   - 多选题浮动"继续"按钮

3. **语言切换**
   - 中文/English 双语支持
   - 着陆页、问题、按钮、提示文字全部支持

4. **问题类型**
   - 单选题（自动跳转）
   - 多选题（手动继续）
   - 滑块题
   - 文本输入
   - 联系方式（微信/手机/邮箱/LinkedIn）

5. **分支逻辑**
   - 根据业务类型显示不同问题
   - 根据广告状态显示不同问题

6. **提交策略**
   - 浅度问卷提交时立即写入 Supabase，避免用户关闭页面导致数据丢失
   - 如果用户继续完成深度问卷，深度完整记录提交成功后会删除之前的浅度记录，避免后台重复统计

7. **品牌元素**
   - Crosspilot AI 名称
   - 标语：出海每一步，都有方向
   - 感谢页邮箱：hambur.zach@gmail.com

### 后台端 (admin.html)

1. **数据展示**
   - 23 个统计图表
   - 数据表格（最新记录）
   - 问卷类型筛选

2. **筛选功能**
   - 问卷类型（快速/深度）
   - 业务类型
   - 目标市场
   - 月广告投入

3. **导出功能**
   - CSV 导出
   - Excel 导出（SheetJS）
   - PDF 导出（jsPDF + 图表截图）

4. **UI 设计**
   - 深色背景 + 底部渐变
   - 液态玻璃卡片
   - 紫色主题按钮

5. **认证**
   - Supabase Auth 登录
   - 管理员邮箱验证

---

## 三、问卷问题结构

### 浅度调查（12题）

| 题号 | 字段 | 类型 | 问题 |
|------|------|------|------|
| Q1 | business_type | 单选 | 您目前主要做哪种业务？ |
| Q2 | main_market | 单选 | 您的主要目标市场是？ |
| Q3 | monthly_ad_spend | 单选 | 您每月在广告上的投入大约是？ |
| Q4 | creative_refresh_frequency | 单选 | 您多久更新一次广告素材？ |
| Q5 | biggest_creative_challenge | 单选 | 制作广告素材时，最大的挑战是什么？ |
| Q6 | competitor_tracking | 单选 | 您目前怎么追踪竞品的广告和创意？ |
| Q7 | conversion_rate_concern | 单选 | 您对独立站/商品页的转化率满意吗？ |
| Q8 | product_page_issues | 多选(3) | 您的商品页最常遇到哪些问题？ |
| Q9 | ai_experience | 单选 | 您目前使用AI工具的情况？ |
| Q10 | ai_expectation | 单选 | 您最希望AI解决什么问题？ |
| Q11 | willing_to_pay | 单选 | 您愿意每月付多少？ |
| Q12 | willing_interview | 联系 | 是否愿意留下联系方式？ |

### 深度调查（25题）

在浅度基础上增加：

| 题号 | 字段 | 类型 | 问题 |
|------|------|------|------|
| Q13 | ad_platforms | 多选 | 您主要投哪些广告平台？ |
| Q14 | monthly_creative_count | 单选 | 每月大约制作多少条广告素材？ |
| Q15 | creative_source | 单选 | 广告创意灵感主要来自哪里？ |
| Q16 | creative_pain_detail | 单选 | 最希望AI帮您做什么？ |
| Q17 | product_page_time | 单选 | 优化一个商品页需要多长时间？ |
| Q18 | product_page_elements | 多选 | 哪些商品页元素对转化率影响最大？ |
| Q19 | market_readiness_need | 单选 | 是否会检查商品资料完整性？ |
| Q20 | competitor_analysis_frequency | 单选 | 多久分析一次竞品？ |
| Q21 | competitor_analysis_content | 多选 | 分析竞品时主要关注什么？ |
| Q22 | pay_for_creative_scout | 单选 | 创意追踪服务付费意愿 |
| Q23 | pay_for_page_optimize | 单选 | 页面优化服务付费意愿 |
| Q24 | most_valuable_features | 多选(3) | 哪些功能最有价值？ |
| Q25 | willing_interview | 联系 | 是否愿意留下联系方式？ |

---

## 四、技术架构

### 文件结构

```
crosspilot-survey/
├── public/
│   ├── index.html          # 问卷页面（主入口）
│   ├── admin.html          # 后台管理页面
│   ├── style.css           # 样式文件（已弃用，样式在 index.html 中）
│   ├── survey-config.js    # 问卷问题配置
│   ├── supabase-config.js  # Supabase 配置
│   ├── data-service.js     # 数据服务层
│   └── assets/
│       └── chart.umd.min.js
├── docs/                   # GitHub Pages 发布目录（与 public 同步）
├── CLAUDE_HANDOFF.md       # Claude 交接文档
├── PROGRESS.md             # 本文件
└── survey-config.js        # 问卷配置备份
```

### Supabase 配置

```javascript
// supabase-config.js
window.CROSSPILOT_SUPABASE_CONFIG = {
  url: 'https://qghjxucxyujssehbymsl.supabase.co',
  anonKey: 'sb_publishable_qAq7AvUMt8UPSrUVzJ7vjA_28qmcfGN'
};
window.CROSSPILOT_ADMIN_EMAILS = ['hambur.zach@gmail.com'];
```

### 数据库表结构

```sql
CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  data JSONB NOT NULL
);
```

**RLS 策略**：已禁用（开发阶段）

---

## 五、已知问题

1. **PDF 导出**：中文字符可能显示为乱码（jsPDF 不支持中文）
2. **PDF 图表**：饼图导出后可能不是正圆形
3. **语言切换**：部分动态内容可能未完全翻译

---

## 六、下一步工作建议

### 优先级高

1. **修复 PDF 中文乱码**
   - 方案：使用 html2canvas 截图生成 PDF
   - 或：使用支持中文的 PDF 库

2. **完善深度调查图表**
   - 添加深度调查专属图表
   - 优化图表布局

3. **测试问卷流程**
   - 测试所有分支路径
   - 测试浅度→深度的过渡

### 优先级中

4. **优化移动端体验**
   - 测试手机端显示
   - 优化触摸交互

5. **添加数据验证**
   - 必填项验证
   - 格式验证（邮箱、手机号）

6. **后台功能增强**
   - 数据编辑功能
   - 批量操作
   - 数据可视化增强

### 优先级低

7. **多语言完善**
   - 确保所有文字都有翻译
   - 添加更多语言支持

8. **性能优化**
   - 图片懒加载
   - 代码分割

---

## 七、关键命令

```bash
# 进入项目目录
cd ~/Desktop/AI创业/crosspilot-survey

# 同步文件到 docs
cp public/index.html docs/index.html
cp public/admin.html docs/admin.html
cp public/survey-config.js docs/survey-config.js
cp public/data-service.js docs/data-service.js
cp public/supabase-config.js docs/supabase-config.js

# 提交推送
git add public/ docs/
git commit -m "描述"
git push origin main

# 查看状态
git status
git log --oneline -5
```

---

## 八、设计规范

### 颜色

- 背景：`#000000` (纯黑)
- 卡片：半透明白色渐变
- 主色：`#0071E3` (Apple Blue) / `#7C3AED` (Purple)
- 文字：`#FFFFFF` (白) / `#98989D` (灰)

### 字体

```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'PingFang SC', 'Helvetica Neue', sans-serif;
```

### 圆角

- 卡片：20px
- 按钮：980px (药丸形)
- 输入框：12px
- 选项：14px

---

## 九、联系方式

- 管理员邮箱：hambur.zach@gmail.com
- GitHub 仓库：https://github.com/zacharyzheng-0576/render

---

**注意**：交给 Codex 时，请确保提供本文件和项目目录路径，Codex 可以直接继续开发。
