/**
 * CrossPilot Survey Configuration
 * 浅度调查（14题）和深度调查（33题）配置
 */
window.SURVEY_CONFIG = {
  // 浅度调查
  shallow: {
    id: 'shallow',
    title: { zh: '快速调研', en: 'Quick Survey' },
    subtitle: { zh: '约5分钟', en: '~5 min' },
    questionCount: 14,
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
        type: 'multi',
        field: 'countries',
        zh: '您主要做哪些国家/地区？',
        en: 'Which countries/regions do you mainly target?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: '北美', zh: '北美', en: 'North America', desc: null },
          { value: '欧洲', zh: '欧洲', en: 'Europe', desc: null },
          { value: '东南亚', zh: '东南亚', en: 'Southeast Asia', desc: null },
          { value: '日韩', zh: '日韩', en: 'Japan / Korea', desc: null },
          { value: '中东', zh: '中东', en: 'Middle East', desc: null },
          { value: '拉美', zh: '拉美', en: 'Latin America', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q4',
        type: 'single',
        field: 'revenue',
        zh: '您的平均月营收大约是？',
        en: 'What is your average monthly revenue?',
        hint: { zh: '人民币', en: 'RMB' },
        options: [
          { value: '5千以下', zh: '5千以下', en: 'Under ¥5K', desc: null },
          { value: '5千-2万', zh: '5千 ~ 2万', en: '¥5K – ¥20K', desc: null },
          { value: '2万-10万', zh: '2万 ~ 10万', en: '¥20K – ¥100K', desc: null },
          { value: '10万-50万', zh: '10万 ~ 50万', en: '¥100K – ¥500K', desc: null },
          { value: '50万以上', zh: '50万以上', en: 'Over ¥500K', desc: null }
        ]
      },

      // ========== Section B: 分支问题 ==========
      // 平台卖家分支
      {
        id: 'Q5-PLATFORM',
        section: 'branch',
        sectionTitle: { zh: '业务详情', en: 'Business Details' },
        type: 'multi',
        field: 'platforms',
        branch: { field: 'business_type', values: ['平台卖家', '两者都做'] },
        zh: '您主要在哪些平台？',
        en: 'Which platforms do you mainly sell on?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: 'Amazon', zh: 'Amazon', en: 'Amazon', desc: null },
          { value: 'TikTok Shop', zh: 'TikTok Shop', en: 'TikTok Shop', desc: null },
          { value: 'Shopee', zh: 'Shopee', en: 'Shopee', desc: null },
          { value: 'Temu', zh: 'Temu', en: 'Temu', desc: null },
          { value: '速卖通', zh: '速卖通', en: 'AliExpress', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q6-PLATFORM',
        type: 'single',
        field: 'platform_pain',
        branch: { field: 'business_type', values: ['平台卖家'] },
        zh: '上新时最大的痛点是？',
        en: 'What is your biggest pain point when listing new products?',
        options: [
          { value: '翻译质量差', zh: '翻译/文案质量不够好', en: 'Poor translation / copy quality', desc: null },
          { value: '关键词不会选', zh: '关键词不知道怎么选', en: 'Don\'t know how to choose keywords', desc: null },
          { value: '多平台格式不同', zh: '不同平台格式要求不同', en: 'Different format requirements across platforms', desc: null },
          { value: '素材不够', zh: '图片/视频素材不够', en: 'Not enough images / video materials', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q7-PLATFORM',
        type: 'multi',
        field: 'platform_ai_tools',
        branch: { field: 'business_type', values: ['平台卖家'] },
        zh: '您用过哪些 AI 工具辅助运营？',
        en: 'Which AI tools have you used for operations?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: 'ChatGPT', zh: 'ChatGPT', en: 'ChatGPT', desc: null },
          { value: 'DeepSeek', zh: 'DeepSeek', en: 'DeepSeek', desc: null },
          { value: '平台自带AI', zh: '平台自带 AI', en: 'Platform built-in AI', desc: null },
          { value: 'ERP工具', zh: 'ERP 工具', en: 'ERP tools', desc: { zh: '店小秘/马帮/通途', en: 'Dianxiaomi/Mabang/Tongtool' } },
          { value: 'Helium10等', zh: 'Helium 10 / Jungle Scout 等', en: 'Helium 10 / Jungle Scout etc.', desc: null },
          { value: '都没用过', zh: '都没用过', en: 'None of the above', desc: null }
        ]
      },
      // 独立站卖家分支
      {
        id: 'Q5-INDIE',
        section: 'branch',
        sectionTitle: { zh: '业务详情', en: 'Business Details' },
        type: 'multi',
        field: 'traffic_channels',
        branch: { field: 'business_type', values: ['独立站卖家'] },
        zh: '您的主要获客渠道？',
        en: 'What are your main customer acquisition channels?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: 'Facebook广告', zh: 'Facebook / Instagram 广告', en: 'Facebook / Instagram Ads', desc: null },
          { value: 'Google广告', zh: 'Google 广告', en: 'Google Ads', desc: null },
          { value: 'TikTok广告', zh: 'TikTok 广告/短视频', en: 'TikTok Ads / Short video', desc: null },
          { value: 'SEO', zh: 'SEO（搜索引擎优化）', en: 'Search Engine Optimization', desc: null },
          { value: '社交媒体', zh: '社交媒体自然流量', en: 'Organic social media', desc: null },
          { value: '邮件营销', zh: '邮件营销', en: 'Email marketing', desc: null }
        ]
      },
      {
        id: 'Q6-INDIE',
        type: 'single',
        field: 'creative_hours',
        branch: { field: 'business_type', values: ['独立站卖家', '两者都做'] },
        zh: '每月在广告素材上花多少时间？',
        en: 'How much time do you spend monthly on ad creatives?',
        hint: { zh: '图片/视频/文案', en: 'Images / Video / Copy' },
        options: [
          { value: '5小时以下', zh: '5小时以下', en: 'Less than 5 hours', desc: null },
          { value: '5-20小时', zh: '5 ~ 20小时', en: '5 – 20 hours', desc: null },
          { value: '20-50小时', zh: '20 ~ 50小时', en: '20 – 50 hours', desc: null },
          { value: '50小时以上', zh: '50小时以上', en: 'More than 50 hours', desc: null }
        ]
      },
      {
        id: 'Q7-INDIE',
        type: 'single',
        field: 'competitor_tracking',
        branch: { field: 'business_type', values: ['独立站卖家', '两者都做'] },
        zh: '您目前怎么追踪竞品的广告和创意？',
        en: 'How do you track competitors\' ads and creatives?',
        options: [
          { value: 'AdSpy等工具', zh: '用 AdSpy / Minea / PipiAds 等工具', en: 'Using ad spy tools', desc: null },
          { value: '手动刷', zh: '手动刷社交媒体和广告库', en: 'Manually browsing social media & ad libraries', desc: null },
          { value: '没有追踪', zh: '没有系统追踪', en: 'No systematic tracking', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },

      // ========== Section C: 核心需求 ==========
      {
        id: 'Q8',
        section: 'needs',
        sectionTitle: { zh: '核心需求', en: 'Core Needs' },
        type: 'multi',
        field: 'biggest_pains',
        maxSelect: 3,
        zh: '哪些工作让您最头疼？',
        en: 'Which tasks frustrate you the most?',
        hint: { zh: '最多选3项', en: 'Max 3' },
        options: [
          { value: '写产品文案', zh: '写产品文案', en: 'Writing product copy', desc: null },
          { value: '做广告素材', zh: '做广告素材（图片/视频）', en: 'Creating ad creatives', desc: null },
          { value: '追踪竞品', zh: '追踪竞品动态', en: 'Tracking competitors', desc: null },
          { value: 'SEO优化', zh: 'SEO 优化', en: 'SEO optimization', desc: null },
          { value: '多平台上架', zh: '多平台上架/本地化', en: 'Multi-platform listing / localization', desc: null },
          { value: '客服回复', zh: '客服回复', en: 'Customer service replies', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q9',
        type: 'slider',
        fields: [
          { field: 'pain_creative', zh: '创意素材制作效率', en: 'Creative efficiency' },
          { field: 'pain_intelligence', zh: '竞品情报获取能力', en: 'Competitor intelligence' },
          { field: 'pain_multilingual', zh: '多平台/多语言管理', en: 'Multi-platform / multilingual' },
          { field: 'pain_ad_optimize', zh: '广告投放效果优化', en: 'Ad optimization' },
          { field: 'pain_efficiency', zh: '整体运营效率', en: 'Overall efficiency' }
        ],
        zh: '请对以下维度的痛点程度打分',
        en: 'Rate the pain level for each dimension',
        hint: { zh: '1 = 不痛，5 = 非常痛', en: '1 = not painful, 5 = very painful' },
        min: 1,
        max: 5,
        default: 3
      },
      {
        id: 'Q10',
        type: 'single',
        field: 'ai_tool_gap',
        zh: '您觉得现有 AI 工具最缺什么？',
        en: 'What do existing AI tools lack the most?',
        options: [
          { value: '中文支持不好', zh: '中文支持不好', en: 'Poor Chinese support', desc: null },
          { value: '不够智能', zh: '不够智能，生成内容需大量修改', en: 'Not smart enough, needs heavy editing', desc: null },
          { value: '太贵', zh: '太贵了', en: 'Too expensive', desc: null },
          { value: '功能太分散', zh: '功能太分散，要用很多工具', en: 'Too fragmented, need many tools', desc: null },
          { value: '不了解', zh: '不太了解有哪些工具', en: 'Don\'t know what tools exist', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q11',
        type: 'single',
        field: 'willing_to_pay',
        zh: '如果 AI 工具能每天自动分析竞品广告并生成创意建议，您愿意每月付多少？',
        en: 'If an AI tool auto-analyzed competitor ads daily and generated creative suggestions, how much would you pay monthly?',
        options: [
          { value: '0', zh: '¥0 — 不需要这类工具', en: '¥0 — Don\'t need this', desc: null },
          { value: '99以下', zh: '¥99 以下', en: 'Under ¥99', desc: null },
          { value: '99-299', zh: '¥99 ~ ¥299', en: '¥99 – ¥299', desc: null },
          { value: '300-599', zh: '¥300 ~ ¥599', en: '¥300 – ¥599', desc: null },
          { value: '600以上', zh: '¥600 以上', en: 'Over ¥600', desc: null }
        ]
      },

      // ========== Section D: 联系方式 ==========
      {
        id: 'Q12',
        section: 'contact',
        sectionTitle: { zh: '联系方式', en: 'Contact' },
        type: 'contact',
        field: 'willing_interview',
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

  // 深度调查
  deep: {
    id: 'deep',
    title: { zh: '深度调研', en: 'Detailed Survey' },
    subtitle: { zh: '约10-15分钟', en: '~10-15 min' },
    questionCount: 33,
    questions: [
      // ========== Section A: 基础画像（同浅度） ==========
      // Q1-Q4 与浅度相同，通过 shallowRef 引用

      // ========== Section B: 分支问题（同浅度） ==========
      // Q5-Q7 与浅度相同

      // ========== Section C: 运营细节（仅深度） ==========
      {
        id: 'Q8-DEEP',
        section: 'operations',
        sectionTitle: { zh: '运营细节', en: 'Operational Details' },
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
        id: 'Q9-DEEP',
        type: 'single',
        field: 'monthly_new_sku',
        deepOnly: true,
        zh: '每月大概会上新多少个 SKU？',
        en: 'How many new SKUs per month?',
        options: [
          { value: '0-5', zh: '0 ~ 5', en: '0 – 5', desc: null },
          { value: '6-10', zh: '6 ~ 10', en: '6 – 10', desc: null },
          { value: '10-30', zh: '10 ~ 30', en: '10 – 30', desc: null },
          { value: '31-100', zh: '31 ~ 100', en: '31 – 100', desc: null },
          { value: '100以上', zh: '100+', en: '100+', desc: null },
          { value: '不定', zh: '不定，看情况', en: 'Varies', desc: null }
        ]
      },
      {
        id: 'Q10-DEEP',
        type: 'single',
        field: 'listing_owner',
        deepOnly: true,
        zh: '现在商品上新主要由谁负责？',
        en: 'Who mainly handles new product listings?',
        options: [
          { value: '自己', zh: '自己', en: 'Myself', desc: null },
          { value: '团队', zh: '内部团队', en: 'Internal team', desc: null },
          { value: '外包', zh: '外包', en: 'Outsourcing', desc: null },
          { value: '供应商', zh: '供应商提供资料 + 简单编辑', en: 'Supplier provides + simple edit', desc: null },
          { value: '不定', zh: '看情况', en: 'Varies', desc: null }
        ]
      },
      {
        id: 'Q11-DEEP',
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
        id: 'Q12-DEEP',
        type: 'multi',
        field: 'time_consuming_steps',
        deepOnly: true,
        zh: '现在上新时最耗时的是哪些环节？',
        en: 'Which steps are most time-consuming when listing?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: '中文资料整理', zh: '中文资料整理', en: 'Chinese material organization', desc: null },
          { value: '英文标题描述', zh: '英文标题/描述/文案', en: 'English title / description / copy', desc: null },
          { value: 'SEO关键词', zh: 'SEO 关键词', en: 'SEO keywords', desc: null },
          { value: '平台格式适配', zh: '平台格式适配', en: 'Platform format adaptation', desc: null },
          { value: '图片文字', zh: '图片文字', en: 'Image text', desc: null },
          { value: 'FAQ客服模板', zh: 'FAQ / 客服模板', en: 'FAQ / customer service templates', desc: null },
          { value: '合规检查', zh: '合规检查', en: 'Compliance check', desc: null },
          { value: 'CSV导入导出', zh: 'CSV 导入导出', en: 'CSV import / export', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q13-DEEP',
        type: 'single',
        field: 'rewrite_across_platforms',
        deepOnly: true,
        zh: '同一个商品上到不同平台时，是否需要分别改写内容？',
        en: 'Do you need to rewrite content for different platforms?',
        options: [
          { value: '经常', zh: '经常需要', en: 'Often', desc: null },
          { value: '偶尔', zh: '偶尔需要', en: 'Occasionally', desc: null },
          { value: '直接复制', zh: '通常直接复制', en: 'Usually just copy', desc: null },
          { value: '只做一个平台', zh: '只做一个平台', en: 'Only on one platform', desc: null }
        ]
      },

      // ========== Section D: 核心需求（同浅度 Q8-Q11，但编号不同） ==========
      {
        id: 'Q14-DEEP',
        section: 'needs',
        sectionTitle: { zh: '核心需求', en: 'Core Needs' },
        type: 'multi',
        field: 'biggest_pains',
        maxSelect: 3,
        deepOnly: true,
        zh: '哪些工作让您最头疼？',
        en: 'Which tasks frustrate you the most?',
        hint: { zh: '最多选3项', en: 'Max 3' },
        options: [
          { value: '写产品文案', zh: '写产品文案', en: 'Writing product copy', desc: null },
          { value: '做广告素材', zh: '做广告素材（图片/视频）', en: 'Creating ad creatives', desc: null },
          { value: '追踪竞品', zh: '追踪竞品动态', en: 'Tracking competitors', desc: null },
          { value: 'SEO优化', zh: 'SEO 优化', en: 'SEO optimization', desc: null },
          { value: '多平台上架', zh: '多平台上架/本地化', en: 'Multi-platform listing / localization', desc: null },
          { value: '客服回复', zh: '客服回复', en: 'Customer service replies', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q15-DEEP',
        type: 'slider',
        deepOnly: true,
        fields: [
          { field: 'pain_creative', zh: '创意素材制作效率', en: 'Creative efficiency' },
          { field: 'pain_intelligence', zh: '竞品情报获取能力', en: 'Competitor intelligence' },
          { field: 'pain_multilingual', zh: '多平台/多语言管理', en: 'Multi-platform / multilingual' },
          { field: 'pain_ad_optimize', zh: '广告投放效果优化', en: 'Ad optimization' },
          { field: 'pain_efficiency', zh: '整体运营效率', en: 'Overall efficiency' }
        ],
        zh: '请对以下维度的痛点程度打分',
        en: 'Rate the pain level for each dimension',
        hint: { zh: '1 = 不痛，5 = 非常痛', en: '1 = not painful, 5 = very painful' },
        min: 1,
        max: 5,
        default: 3
      },
      {
        id: 'Q16-DEEP',
        type: 'single',
        field: 'ai_tool_gap',
        deepOnly: true,
        zh: '您觉得现有 AI 工具最缺什么？',
        en: 'What do existing AI tools lack the most?',
        options: [
          { value: '中文支持不好', zh: '中文支持不好', en: 'Poor Chinese support', desc: null },
          { value: '不够智能', zh: '不够智能，生成内容需大量修改', en: 'Not smart enough, needs heavy editing', desc: null },
          { value: '太贵', zh: '太贵了', en: 'Too expensive', desc: null },
          { value: '功能太分散', zh: '功能太分散，要用很多工具', en: 'Too fragmented, need many tools', desc: null },
          { value: '不了解', zh: '不太了解有哪些工具', en: 'Don\'t know what tools exist', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },

      // ========== Section E: AI工具深度（仅深度） ==========
      {
        id: 'Q17-DEEP',
        section: 'ai_tools',
        sectionTitle: { zh: 'AI 工具使用', en: 'AI Tool Usage' },
        type: 'multi',
        field: 'ai_tool_problems',
        deepOnly: true,
        zh: '使用 AI/翻译工具时，最大的问题是什么？',
        en: 'What\'s the biggest problem when using AI/translation tools?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: '不够本地化', zh: '不够本地化', en: 'Not localized enough', desc: null },
          { value: '平台格式不对', zh: '平台格式不对', en: 'Wrong platform format', desc: null },
          { value: '需要反复提示词', zh: '需要反复提示词', en: 'Need repeated prompts', desc: null },
          { value: '批量处理麻烦', zh: '批量处理麻烦', en: 'Batch processing is cumbersome', desc: null },
          { value: '缺少材质尺寸', zh: '缺少材质/尺寸信息', en: 'Missing material/size info', desc: null },
          { value: 'SEO关键词差', zh: 'SEO 关键词差', en: 'Poor SEO keywords', desc: null },
          { value: '太机翻', zh: '太机翻', en: 'Too machine-translation-like', desc: null },
          { value: '不知道是否合规', zh: '不知道是否合规', en: 'Don\'t know if compliant', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q18-DEEP',
        type: 'multi',
        field: 'current_tools',
        deepOnly: true,
        zh: '您现在使用哪些工具辅助上新或文案？',
        en: 'What tools do you currently use for listing or copywriting?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: 'ChatGPT', zh: 'ChatGPT', en: 'ChatGPT', desc: null },
          { value: 'Claude', zh: 'Claude', en: 'Claude', desc: null },
          { value: 'Gemini', zh: 'Gemini', en: 'Gemini', desc: null },
          { value: 'DeepL/Google翻译', zh: 'DeepL / Google 翻译', en: 'DeepL / Google Translate', desc: null },
          { value: 'Canva', zh: 'Canva', en: 'Canva', desc: null },
          { value: 'ERP工具', zh: 'ERP 工具', en: 'ERP tools', desc: null },
          { value: 'Jungle Scout/Helium10', zh: 'Jungle Scout / Helium 10', en: 'Jungle Scout / Helium 10', desc: null },
          { value: '外包', zh: '外包', en: 'Outsourcing', desc: null },
          { value: '基本不用', zh: '基本不用', en: 'Basically none', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q19-DEEP',
        type: 'single',
        field: 'ai_usage_frequency',
        deepOnly: true,
        zh: '是否使用 AI 生成商品内容？',
        en: 'Do you use AI to generate product content?',
        options: [
          { value: '经常', zh: '经常用', en: 'Often', desc: null },
          { value: '偶尔', zh: '偶尔用', en: 'Occasionally', desc: null },
          { value: '试过但不好', zh: '试过但效果不好', en: 'Tried but not good', desc: null },
          { value: '想试', zh: '没试过但想试', en: 'Haven\'t tried but willing', desc: null },
          { value: '不想', zh: '不考虑', en: 'Not considering', desc: null }
        ]
      },

      // ========== Section F: 广告与创意（仅深度） ==========
      {
        id: 'Q20-DEEP',
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
        id: 'Q21-DEEP',
        type: 'multi',
        field: 'ad_platforms',
        deepOnly: true,
        branch: { field: 'ad_status', values: ['在投', '测试中', '计划中'] },
        zh: '主要投哪些广告平台？',
        en: 'Which ad platforms do you use?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: 'Facebook/Instagram', zh: 'Facebook / Instagram', en: 'Facebook / Instagram', desc: null },
          { value: 'Google', zh: 'Google', en: 'Google', desc: null },
          { value: 'TikTok', zh: 'TikTok', en: 'TikTok', desc: null },
          { value: 'Pinterest', zh: 'Pinterest', en: 'Pinterest', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q22-DEEP',
        type: 'single',
        field: 'ad_budget',
        deepOnly: true,
        branch: { field: 'ad_status', values: ['在投', '测试中', '计划中'] },
        zh: '每月广告预算大约是？',
        en: 'Monthly ad budget approximately?',
        options: [
          { value: '1000以下', zh: '¥1,000 以下', en: 'Under ¥1,000', desc: null },
          { value: '1000-5000', zh: '¥1,000 ~ ¥5,000', en: '¥1,000 – ¥5,000', desc: null },
          { value: '5000-20000', zh: '¥5,000 ~ ¥20,000', en: '¥5,000 – ¥20,000', desc: null },
          { value: '20000-50000', zh: '¥20,000 ~ ¥50,000', en: '¥20,000 – ¥50,000', desc: null },
          { value: '50000以上', zh: '¥50,000+', en: '¥50,000+', desc: null },
          { value: '还没花', zh: '还没花钱', en: 'Not spending yet', desc: null }
        ]
      },
      {
        id: 'Q23-DEEP',
        type: 'single',
        field: 'creative_refresh_frequency',
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
        id: 'Q24-DEEP',
        type: 'single',
        field: 'competitor_tracking_deep',
        deepOnly: true,
        branch: { field: 'ad_status', values: ['在投', '测试中'] },
        zh: '您目前怎么追踪竞品的广告和创意？',
        en: 'How do you track competitors\' ads and creatives?',
        options: [
          { value: 'AdSpy等工具', zh: '用 AdSpy / Minea / PipiAds 等工具', en: 'Using ad spy tools', desc: null },
          { value: '手动刷', zh: '手动刷社交媒体和广告库', en: 'Manually browsing social media & ad libraries', desc: null },
          { value: '没有追踪', zh: '没有系统追踪', en: 'No systematic tracking', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q25-DEEP',
        type: 'single',
        field: 'creative_hours_deep',
        deepOnly: true,
        branch: { field: 'ad_status', values: ['在投', '测试中'] },
        zh: '每月在广告素材上花多少时间？',
        en: 'Monthly time on ad creatives?',
        options: [
          { value: '5小时以下', zh: '5小时以下', en: 'Less than 5 hours', desc: null },
          { value: '5-20小时', zh: '5 ~ 20小时', en: '5 – 20 hours', desc: null },
          { value: '20-50小时', zh: '20 ~ 50小时', en: '20 – 50 hours', desc: null },
          { value: '50小时以上', zh: '50小时以上', en: 'More than 50 hours', desc: null }
        ]
      },

      // ========== Section G: 功能验证与定价（仅深度） ==========
      {
        id: 'Q26-DEEP',
        section: 'validation',
        sectionTitle: { zh: '功能与定价', en: 'Features & Pricing' },
        type: 'single',
        field: 'need_batch_listing',
        deepOnly: true,
        zh: '如果有工具能把中文 SKU 表格批量生成多平台上架内容，您是否需要？',
        en: 'If a tool could batch-generate multi-platform listing content from Chinese SKU sheets, would you need it?',
        options: [
          { value: '非常需要', zh: '非常需要', en: 'Very need', desc: null },
          { value: '有点需要', zh: '有点需要', en: 'Somewhat', desc: null },
          { value: '看效果', zh: '看效果', en: 'Depends on quality', desc: null },
          { value: '不需要', zh: '现在不需要', en: 'Not now', desc: null }
        ]
      },
      {
        id: 'Q27-DEEP',
        type: 'single',
        field: 'need_market_check',
        deepOnly: true,
        zh: '您是否需要"市场准备度检查"？',
        en: 'Do you need "market readiness checks"?',
        hint: { zh: '检查缺失规格、合规性等', en: 'Check missing specs, compliance, etc.' },
        options: [
          { value: '非常需要', zh: '非常需要', en: 'Very need', desc: null },
          { value: '有点需要', zh: '有点需要', en: 'Somewhat', desc: null },
          { value: '看内容', zh: '看检查什么内容', en: 'Depends on content', desc: null },
          { value: '不需要', zh: '现在不需要', en: 'Not now', desc: null }
        ]
      },
      {
        id: 'Q28-DEEP',
        type: 'multi',
        field: 'checklist_items',
        deepOnly: true,
        zh: '您最希望 AI 帮您检查哪些内容？',
        en: 'What do you most want AI to check?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: '材质规格', zh: '材质规格', en: 'Material specs', desc: null },
          { value: '尺寸重量', zh: '尺寸/重量', en: 'Size / weight', desc: null },
          { value: '包装清单', zh: '包装清单', en: 'Package list', desc: null },
          { value: '说明书', zh: '说明书', en: 'Instructions', desc: null },
          { value: '安全警告', zh: '安全警告', en: 'Safety warnings', desc: null },
          { value: '退货运费', zh: '退货运费信息', en: 'Return/shipping info', desc: null },
          { value: 'FAQ', zh: 'FAQ', en: 'FAQ', desc: null },
          { value: '夸大宣传', zh: '夸大宣传', en: 'Exaggerated claims', desc: null },
          { value: '平台格式', zh: '平台格式匹配', en: 'Platform format fit', desc: null },
          { value: '目标市场语言', zh: '目标市场语言', en: 'Target market language', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q29-DEEP',
        type: 'multi',
        field: 'top_features',
        maxSelect: 3,
        deepOnly: true,
        zh: '如果只能优先做3个功能，您最需要哪些？',
        en: 'If only 3 features first, which do you need most?',
        hint: { zh: '最多选3项', en: 'Max 3' },
        options: [
          { value: 'Amazon上架', zh: 'Amazon 上架', en: 'Amazon listing', desc: null },
          { value: 'Shopify页面', zh: 'Shopify 页面', en: 'Shopify page', desc: null },
          { value: 'TikTok Shop', zh: 'TikTok Shop 文案', en: 'TikTok Shop hooks', desc: null },
          { value: 'Etsy文案', zh: 'Etsy 文案', en: 'Etsy copy', desc: null },
          { value: 'SEO关键词', zh: 'SEO 关键词', en: 'SEO keywords', desc: null },
          { value: 'FAQ生成', zh: 'FAQ 生成', en: 'FAQ generation', desc: null },
          { value: '客服模板', zh: '客服模板', en: 'CS templates', desc: null },
          { value: '市场准备度检查', zh: '市场准备度检查', en: 'Market readiness check', desc: null },
          { value: '批量CSV导出', zh: '批量 CSV 导出', en: 'Batch CSV export', desc: null },
          { value: '多语言版本', zh: '多语言版本', en: 'Multi-language versions', desc: null }
        ]
      },
      {
        id: 'Q30-DEEP',
        type: 'single',
        field: 'willing_pay_package',
        deepOnly: true,
        zh: '如果测试效果不错，10个SKU的上新内容包，您是否愿意付费？',
        en: 'Would you pay for a 10-SKU listing content package?',
        options: [
          { value: '愿意', zh: '愿意', en: 'Yes', desc: null },
          { value: '先看效果', zh: '先看效果', en: 'See results first', desc: null },
          { value: '现在不', zh: '现在不需要', en: 'Not now', desc: null },
          { value: '只用免费', zh: '只用免费版', en: 'Only free', desc: null }
        ]
      },
      {
        id: 'Q31-DEEP',
        type: 'single',
        field: 'package_price_range',
        deepOnly: true,
        zh: '10个SKU服务包，您能接受的价格区间是？',
        en: 'Acceptable price range for 10-SKU package?',
        options: [
          { value: '99以下', zh: '¥99 以下', en: 'Under ¥99', desc: null },
          { value: '99-199', zh: '¥99 ~ ¥199', en: '¥99 – ¥199', desc: null },
          { value: '199-399', zh: '¥199 ~ ¥399', en: '¥199 – ¥399', desc: null },
          { value: '399-699', zh: '¥399 ~ ¥699', en: '¥399 – ¥699', desc: null },
          { value: '699以上', zh: '¥699+', en: '¥699+', desc: null },
          { value: '不确定', zh: '不确定', en: 'Not sure', desc: null }
        ]
      },

      // ========== Section H: 联系与反馈 ==========
      {
        id: 'Q32-DEEP',
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
      },
      {
        id: 'Q33-DEEP',
        type: 'textarea',
        field: 'additional_comments',
        deepOnly: true,
        zh: '还有什么想补充的？',
        en: 'Any additional comments?',
        placeholder: { zh: '请在这里写下您的想法...', en: 'Write your thoughts here...' }
      }
    ]
  }
};

// 浅度调查的完整问题列表（包含引用）
// 深度调查会自动包含浅度的 Q1-Q7，加上自己的额外问题
window.SURVEY_CONFIG.deep.shallowRef = true; // 标记需要引用浅度问题
