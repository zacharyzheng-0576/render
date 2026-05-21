/**
 * CrossPilot Survey Configuration v2
 * 聚焦AI应用场景，去除重复问题
 */
window.SURVEY_CONFIG = {
  // 浅度调查：12题，~5分钟，快速识别AI应用机会
  shallow: {
    id: 'shallow',
    title: { zh: '快速调研', en: 'Quick Survey' },
    subtitle: { zh: '约5分钟', en: '~5 min' },
    questionCount: 12,
    questions: [
      // ========== Section A: 基础画像 ==========
      {
        id: 'Q1',
        section: 'profile',
        sectionTitle: { zh: '基础信息', en: 'Basic Profile' },
        type: 'single',
        field: 'business_type',
        zh: '您目前主要做哪种业务？',
        en: 'What type of business do you mainly run?',
        options: [
          { value: '平台卖家', zh: '平台卖家', en: 'Platform seller', desc: { zh: 'Amazon / TikTok Shop / Shopee 等', en: 'Amazon / TikTok Shop / Shopee etc.' } },
          { value: '独立站卖家', zh: '独立站卖家', en: 'Independent site seller', desc: { zh: 'Shopify / WooCommerce 等', en: 'Shopify / WooCommerce etc.' } },
          { value: '两者都做', zh: '两者都做', en: 'Both', desc: null }
        ]
      },
      {
        id: 'Q2',
        type: 'single',
        field: 'experience',
        zh: '您做跨境电商多久了？',
        en: 'How long have you been doing cross-border e-commerce?',
        options: [
          { value: '半年以下', zh: '半年以下', en: 'Less than 6 months', desc: null },
          { value: '半年-1年', zh: '半年 ~ 1年', en: '6 months – 1 year', desc: null },
          { value: '1-3年', zh: '1 ~ 3年', en: '1 – 3 years', desc: null },
          { value: '3年以上', zh: '3年以上', en: 'More than 3 years', desc: null }
        ]
      },
      {
        id: 'Q3',
        type: 'single',
        field: 'revenue',
        zh: '您的平均月营收大约是？',
        en: 'What is your average monthly revenue?',
        hint: { zh: '人民币', en: 'RMB' },
        options: [
          { value: '5千以下', zh: '5千以下', en: 'Under $700', desc: null },
          { value: '5千-2万', zh: '5千 ~ 2万', en: '$700 – $2,800', desc: null },
          { value: '2万-10万', zh: '2万 ~ 10万', en: '$2,800 – $14,000', desc: null },
          { value: '10万-50万', zh: '10万 ~ 50万', en: '$14,000 – $70,000', desc: null },
          { value: '50万以上', zh: '50万以上', en: 'Over $70,000', desc: null }
        ]
      },

      // ========== Section B: AI应用场景探索（核心） ==========
      {
        id: 'Q4',
        section: 'ai_scenarios',
        sectionTitle: { zh: 'AI 应用场景', en: 'AI Application Scenarios' },
        type: 'multi',
        field: 'time_consuming_tasks',
        maxSelect: 3,
        zh: '以下哪些工作最占用您的时间？',
        en: 'Which tasks consume most of your time?',
        hint: { zh: '最多选3项', en: 'Max 3' },
        options: [
          { value: '商品上架', zh: '商品上架（标题/描述/关键词）', en: 'Product listing (title/description/keywords)', desc: null },
          { value: '广告素材', zh: '制作广告素材（图片/视频/文案）', en: 'Creating ad creatives (images/video/copy)', desc: null },
          { value: '竞品分析', zh: '分析竞品广告和策略', en: 'Analyzing competitor ads & strategies', desc: null },
          { value: '客服回复', zh: '回复客户咨询', en: 'Customer service replies', desc: null },
          { value: '内容本地化', zh: '内容翻译和本地化', en: 'Content translation & localization', desc: null },
          { value: 'SEO优化', zh: 'SEO关键词优化', en: 'SEO keyword optimization', desc: null },
          { value: '数据分析', zh: '销售数据分析和报表', en: 'Sales data analysis & reporting', desc: null },
          { value: 'OTHER', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q5',
        type: 'single',
        field: 'ai_experience',
        zh: '您目前使用AI工具的情况？',
        en: 'What is your current experience with AI tools?',
        options: [
          { value: '经常用', zh: '经常用，已经成为工作流的一部分', en: 'Regularly use, part of my workflow', desc: null },
          { value: '偶尔用', zh: '偶尔用，还没完全融入', en: 'Occasionally use, not fully integrated', desc: null },
          { value: '试过', zh: '试过但效果不好', en: 'Tried but not satisfied', desc: null },
          { value: '想试', zh: '没试过但想尝试', en: 'Haven\'t tried but interested', desc: null },
          { value: '不考虑', zh: '不考虑使用', en: 'Not considering', desc: null }
        ]
      },
      {
        id: 'Q6',
        type: 'multi',
        field: 'ai_use_cases',
        branch: { field: 'ai_experience', values: ['经常用', '偶尔用', '试过'] },
        zh: '您用AI工具主要做哪些事情？',
        en: 'What do you mainly use AI tools for?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: '写文案', zh: '写商品标题/描述/卖点', en: 'Writing product titles/descriptions/selling points', desc: null },
          { value: '翻译', zh: '翻译/本地化内容', en: 'Translating/localizing content', desc: null },
          { value: '广告创意', zh: '生成广告文案和创意', en: 'Generating ad copy and creatives', desc: null },
          { value: '竞品分析', zh: '分析竞品广告和市场', en: 'Analyzing competitor ads & market', desc: null },
          { value: '客服', zh: '自动回复客户', en: 'Auto-replying to customers', desc: null },
          { value: '数据分析', zh: '分析销售数据', en: 'Analyzing sales data', desc: null },
          { value: '图片处理', zh: '处理商品图片', en: 'Processing product images', desc: null },
          { value: 'OTHER', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },

      // ========== Section C: 对AI的态度和期望 ==========
      {
        id: 'Q7',
        section: 'ai_attitude',
        sectionTitle: { zh: 'AI 态度与期望', en: 'AI Attitude & Expectations' },
        type: 'multi',
        field: 'ai_concerns',
        zh: '使用AI工具时，您最担心什么？',
        en: 'What concerns you most when using AI tools?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: '质量不稳定', zh: '生成内容质量不稳定', en: 'Unstable content quality', desc: null },
          { value: '不够本地化', zh: '不够本地化/太机翻', en: 'Not localized enough / too machine-translated', desc: null },
          { value: '需要大量修改', zh: '生成后还需要大量人工修改', en: 'Requires heavy manual editing', desc: null },
          { value: '学习成本高', zh: '学习成本高，不会用提示词', en: 'High learning curve, don\'t know prompts', desc: null },
          { value: '数据安全', zh: '担心数据安全和隐私', en: 'Data security and privacy concerns', desc: null },
          { value: '价格贵', zh: '价格太贵', en: 'Too expensive', desc: null },
          { value: '不了解', zh: '不了解有什么AI工具', en: 'Don\'t know what AI tools exist', desc: null },
          { value: 'OTHER', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q8',
        type: 'single',
        field: 'ai_value_expectation',
        zh: '如果有一个AI工具能帮您提升效率，您最希望它解决什么问题？',
        en: 'If an AI tool could improve your efficiency, what problem would you most want it to solve?',
        options: [
          { value: '节省时间', zh: '节省时间，让我专注更重要的事', en: 'Save time, let me focus on more important things', desc: null },
          { value: '提升质量', zh: '提升内容质量，减少人工修改', en: 'Improve content quality, reduce manual editing', desc: null },
          { value: '降低成本', zh: '降低人力成本', en: 'Reduce labor costs', desc: null },
          { value: '快速上手', zh: '简单易用，不需要学习', en: 'Easy to use, no learning curve', desc: null },
          { value: '一站式', zh: '一站式解决多个问题', en: 'One-stop solution for multiple problems', desc: null },
          { value: 'OTHER', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q9',
        type: 'single',
        field: 'willing_to_pay',
        zh: '如果AI工具能显著提升您的工作效率，您愿意每月付多少？',
        en: 'If an AI tool significantly improved your efficiency, how much would you pay monthly?',
        options: [
          { value: '0', zh: '¥0 — 不需要', en: '$0 — Don\'t need', desc: null },
          { value: '99以下', zh: '¥99 以下', en: 'Under $14', desc: null },
          { value: '99-299', zh: '¥99 ~ ¥299', en: '$14 – $42', desc: null },
          { value: '300-599', zh: '¥300 ~ ¥599', en: '$42 – $84', desc: null },
          { value: '600以上', zh: '¥600 以上', en: 'Over $84', desc: null }
        ]
      },

      // ========== Section D: 联系方式（浅度调查独有） ==========
      {
        id: 'Q10',
        section: 'contact',
        sectionTitle: { zh: '联系方式', en: 'Contact' },
        type: 'contact',
        field: 'willing_interview',
        shallowOnly: true,
        zh: '如果后续有更深入的交流机会，您方便留下联系方式吗？',
        en: 'Would you like to leave your contact for further discussion?',
        options: [
          { value: '愿意', zh: '可以，欢迎联系我', en: 'Sure, feel free to reach out', desc: null },
          { value: '不愿意', zh: '暂时不用', en: 'Not right now', desc: null }
        ],
        contactFields: [
          { field: 'contact_wechat', placeholder: { zh: '微信号 / WeChat ID', en: 'WeChat ID' } },
          { field: 'contact_phone', placeholder: { zh: '手机号 / Phone', en: 'Phone number' } },
          { field: 'contact_email', placeholder: { zh: '邮箱 / Email', en: 'Email address' } }
        ]
      }
    ]
  },

  // 深度调查：25题，~10分钟，深入挖掘AI应用细节
  deep: {
    id: 'deep',
    title: { zh: '深度调研', en: 'Detailed Survey' },
    subtitle: { zh: '约10分钟', en: '~10 min' },
    questionCount: 25,
    questions: [
      // 深度调查额外问题（Q11-Q25）
      {
        id: 'Q11-DEEP',
        section: 'listing_details',
        sectionTitle: { zh: '商品上架细节', en: 'Listing Details' },
        type: 'single',
        field: 'sku_count',
        deepOnly: true,
        zh: '您当前总 SKU 数量大概是多少？',
        en: 'Approximately how many total SKUs do you have?',
        options: [
          { value: '1-10', zh: '1 ~ 10', en: '1 – 10', desc: null },
          { value: '11-50', zh: '11 ~ 50', en: '11 – 50', desc: null },
          { value: '51-200', zh: '51 ~ 200', en: '51 – 200', desc: null },
          { value: '201-1000', zh: '201 ~ 1000', en: '201 – 1000', desc: null },
          { value: '1000以上', zh: '1000+', en: '1000+', desc: null }
        ]
      },
      {
        id: 'Q12-DEEP',
        type: 'single',
        field: 'listing_time',
        deepOnly: true,
        zh: '一个 SKU 从中文资料到完成上架，大概需要多久？',
        en: 'How long does one SKU take from Chinese materials to live listing?',
        options: [
          { value: '10分钟以下', zh: '10分钟以下', en: 'Under 10 min', desc: null },
          { value: '10-30分钟', zh: '10 ~ 30分钟', en: '10 – 30 min', desc: null },
          { value: '30-60分钟', zh: '30 ~ 60分钟', en: '30 – 60 min', desc: null },
          { value: '1-2小时', zh: '1 ~ 2小时', en: '1 – 2 hours', desc: null },
          { value: '2小时以上', zh: '2小时以上', en: '2+ hours', desc: null }
        ]
      },
      {
        id: 'Q13-DEEP',
        type: 'multi',
        field: 'listing_bottlenecks',
        deepOnly: true,
        zh: '上新过程中，哪些环节最耗时？',
        en: 'Which steps in the listing process are most time-consuming?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: '中文资料整理', zh: '整理中文产品资料', en: 'Organizing Chinese product materials', desc: null },
          { value: '英文文案', zh: '写英文标题/描述/卖点', en: 'Writing English title/description/selling points', desc: null },
          { value: '关键词研究', zh: '研究SEO关键词', en: 'Researching SEO keywords', desc: null },
          { value: '图片处理', zh: '处理商品图片/主图', en: 'Processing product images', desc: null },
          { value: '格式适配', zh: '适配不同平台格式', en: 'Adapting to different platform formats', desc: null },
          { value: '合规检查', zh: '检查合规性/禁词', en: 'Checking compliance/banned words', desc: null },
          { value: 'OTHER', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q14-DEEP',
        type: 'single',
        field: 'multi_platform',
        deepOnly: true,
        zh: '同一个商品需要上架到几个平台？',
        en: 'How many platforms do you list the same product on?',
        options: [
          { value: '1个', zh: '只有1个平台', en: 'Only 1 platform', desc: null },
          { value: '2-3个', zh: '2 ~ 3个平台', en: '2 – 3 platforms', desc: null },
          { value: '4-5个', zh: '4 ~ 5个平台', en: '4 – 5 platforms', desc: null },
          { value: '5个以上', zh: '5个以上', en: '5+ platforms', desc: null }
        ]
      },
      {
        id: 'Q15-DEEP',
        type: 'single',
        field: 'rewrite_need',
        deepOnly: true,
        branch: { field: 'multi_platform', values: ['2-3个', '4-5个', '5个以上'] },
        zh: '不同平台的内容是否需要重新改写？',
        en: 'Does content need to be rewritten for different platforms?',
        options: [
          { value: '完全重写', zh: '每个平台都要完全重写', en: 'Completely rewrite for each platform', desc: null },
          { value: '部分修改', zh: '需要部分修改', en: 'Need partial modifications', desc: null },
          { value: '微调即可', zh: '只需微调', en: 'Only minor adjustments', desc: null },
          { value: '直接复制', zh: '通常直接复制', en: 'Usually just copy', desc: null }
        ]
      },

      // ========== 广告与创意 ==========
      {
        id: 'Q16-DEEP',
        section: 'ad_creative',
        sectionTitle: { zh: '广告与创意', en: 'Ad Creative & Intelligence' },
        type: 'single',
        field: 'ad_status',
        deepOnly: true,
        zh: '您目前在投广告吗？',
        en: 'Are you currently running ads?',
        options: [
          { value: '在投', zh: '是，正在投放', en: 'Yes, actively', desc: null },
          { value: '测试中', zh: '在测试', en: 'Testing', desc: null },
          { value: '计划中', zh: '还没投但计划中', en: 'Not yet but planning', desc: null },
          { value: '没有', zh: '没有', en: 'No', desc: null }
        ]
      },
      {
        id: 'Q17-DEEP',
        type: 'single',
        field: 'ad_refresh_frequency',
        deepOnly: true,
        branch: { field: 'ad_status', values: ['在投', '测试中'] },
        zh: '多久更新一次广告素材？',
        en: 'How often do you refresh ad creatives?',
        options: [
          { value: '几天', zh: '几天一次', en: 'Every few days', desc: null },
          { value: '每周', zh: '每周', en: 'Weekly', desc: null },
          { value: '两周', zh: '每两周', en: 'Biweekly', desc: null },
          { value: '每月', zh: '每月', en: 'Monthly', desc: null },
          { value: '很少', zh: '很少更新', en: 'Rarely', desc: null }
        ]
      },
      {
        id: 'Q18-DEEP',
        type: 'single',
        field: 'competitor_tracking',
        deepOnly: true,
        branch: { field: 'ad_status', values: ['在投', '测试中'] },
        zh: '您目前怎么追踪竞品的广告和创意？',
        en: 'How do you track competitors\' ads and creatives?',
        options: [
          { value: '工具', zh: '用 AdSpy / Minea / PipiAds 等工具', en: 'Using ad spy tools', desc: null },
          { value: '手动', zh: '手动刷社交媒体和广告库', en: 'Manually browsing social media & ad libraries', desc: null },
          { value: '没有', zh: '没有系统追踪', en: 'No systematic tracking', desc: null },
          { value: 'OTHER', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q19-DEEP',
        type: 'multi',
        field: 'creative_pain_points',
        deepOnly: true,
        branch: { field: 'ad_status', values: ['在投', '测试中'] },
        zh: '制作广告素材时，最大的困难是什么？',
        en: 'What are the biggest difficulties when creating ad creatives?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: '没有灵感', zh: '没有创意灵感', en: 'Lack of creative inspiration', desc: null },
          { value: '制作慢', zh: '制作速度太慢', en: 'Production is too slow', desc: null },
          { value: '不知道有效', zh: '不知道什么素材有效', en: 'Don\'t know what creatives work', desc: null },
          { value: '竞品抄袭', zh: '想参考竞品但不知道怎么找', en: 'Want to reference competitors but don\'t know how', desc: null },
          { value: '测试成本高', zh: 'A/B测试成本高', en: 'A/B testing is expensive', desc: null },
          { value: 'OTHER', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },

      // ========== 功能需求验证 ==========
      {
        id: 'Q20-DEEP',
        section: 'feature_validation',
        sectionTitle: { zh: '功能需求验证', en: 'Feature Validation' },
        type: 'single',
        field: 'need_competitor_intelligence',
        deepOnly: true,
        zh: '如果AI能自动追踪竞品广告并生成创意建议，您是否需要？',
        en: 'If AI could automatically track competitor ads and generate creative suggestions, would you need it?',
        options: [
          { value: '非常需要', zh: '非常需要', en: 'Very need', desc: null },
          { value: '有点需要', zh: '有点需要', en: 'Somewhat', desc: null },
          { value: '看效果', zh: '看效果', en: 'Depends on quality', desc: null },
          { value: '不需要', zh: '现在不需要', en: 'Not now', desc: null }
        ]
      },
      {
        id: 'Q21-DEEP',
        type: 'single',
        field: 'need_auto_listing',
        deepOnly: true,
        zh: '如果AI能一键把中文资料生成多平台上架内容，您是否需要？',
        en: 'If AI could generate multi-platform listing content from Chinese materials in one click, would you need it?',
        options: [
          { value: '非常需要', zh: '非常需要', en: 'Very need', desc: null },
          { value: '有点需要', zh: '有点需要', en: 'Somewhat', desc: null },
          { value: '看效果', zh: '看效果', en: 'Depends on quality', desc: null },
          { value: '不需要', zh: '现在不需要', en: 'Not now', desc: null }
        ]
      },
      {
        id: 'Q22-DEEP',
        type: 'multi',
        field: 'top_features',
        maxSelect: 3,
        deepOnly: true,
        zh: '如果只能优先做3个功能，您最需要哪些？',
        en: 'If only 3 features first, which do you need most?',
        hint: { zh: '最多选3项', en: 'Max 3' },
        options: [
          { value: '商品文案', zh: 'AI生成商品标题/描述/卖点', en: 'AI-generated product title/description/selling points', desc: null },
          { value: '广告创意', zh: 'AI生成广告文案和创意', en: 'AI-generated ad copy and creatives', desc: null },
          { value: '竞品追踪', zh: '自动追踪竞品广告策略', en: 'Auto-track competitor ad strategies', desc: null },
          { value: '多平台上架', zh: '一键多平台上架', en: 'One-click multi-platform listing', desc: null },
          { value: '内容本地化', zh: 'AI翻译和本地化', en: 'AI translation and localization', desc: null },
          { value: '客服回复', zh: 'AI自动回复客户', en: 'AI auto-reply to customers', desc: null },
          { value: '数据分析', zh: 'AI销售数据分析', en: 'AI sales data analysis', desc: null },
          { value: 'OTHER', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },

      // ========== 付费意愿 ==========
      {
        id: 'Q23-DEEP',
        section: 'pricing',
        sectionTitle: { zh: '付费意愿', en: 'Willingness to Pay' },
        type: 'single',
        field: 'pay_for_listing',
        deepOnly: true,
        zh: '如果AI能帮您把上新时间从1小时缩短到10分钟，您愿意为每个SKU付多少？',
        en: 'If AI could reduce listing time from 1 hour to 10 minutes, how much would you pay per SKU?',
        options: [
          { value: '0', zh: '¥0 — 不需要', en: '$0 — Don\'t need', desc: null },
          { value: '1-5元', zh: '¥1 ~ ¥5 / SKU', en: '$0.15 – $0.70 / SKU', desc: null },
          { value: '5-10元', zh: '¥5 ~ ¥10 / SKU', en: '$0.70 – $1.40 / SKU', desc: null },
          { value: '10-20元', zh: '¥10 ~ ¥20 / SKU', en: '$1.40 – $2.80 / SKU', desc: null },
          { value: '20元以上', zh: '¥20+ / SKU', en: '$2.80+ / SKU', desc: null }
        ]
      },
      {
        id: 'Q24-DEEP',
        type: 'single',
        field: 'pay_for_creative',
        deepOnly: true,
        zh: '如果AI能帮您每天生成10条广告创意并分析效果，您愿意每月付多少？',
        en: 'If AI could generate 10 ad creatives daily and analyze performance, how much would you pay monthly?',
        options: [
          { value: '0', zh: '¥0 — 不需要', en: '$0 — Don\'t need', desc: null },
          { value: '99以下', zh: '¥99 以下', en: 'Under $14', desc: null },
          { value: '99-299', zh: '¥99 ~ ¥299', en: '$14 – $42', desc: null },
          { value: '300-599', zh: '¥300 ~ ¥599', en: '$42 – $84', desc: null },
          { value: '600以上', zh: '¥600+', en: 'Over $84', desc: null }
        ]
      },

      // ========== 联系方式 ==========
      {
        id: 'Q25-DEEP',
        section: 'contact',
        sectionTitle: { zh: '联系与反馈', en: 'Contact & Feedback' },
        type: 'contact',
        field: 'willing_interview',
        deepOnly: true,
        zh: '是否愿意留下联系方式？',
        en: 'Would you like to leave your contact?',
        options: [
          { value: '愿意', zh: '可以，欢迎联系我', en: 'Sure, feel free to reach out', desc: null },
          { value: '不愿意', zh: '暂时不用', en: 'Not right now', desc: null }
        ],
        contactFields: [
          { field: 'contact_wechat', placeholder: { zh: '微信号 / WeChat ID', en: 'WeChat ID' } },
          { field: 'contact_phone', placeholder: { zh: '手机号 / Phone', en: 'Phone number' } },
          { field: 'contact_email', placeholder: { zh: '邮箱 / Email', en: 'Email address' } }
        ]
      }
    ]
  }
};

window.SURVEY_CONFIG.deep.shallowRef = true;
