/**
 * CrossPilot Survey Configuration v3
 * 聚焦 AI 创意情报 + 增长测试 + 商品页转化优化
 */
window.SURVEY_CONFIG = {
  // 浅度调查：12题，~5分钟
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
          { value: '独立站卖家', zh: '独立站卖家', en: 'Independent site seller', desc: { zh: 'Shopify / WooCommerce 等', en: 'Shopify / WooCommerce etc.' } },
          { value: '平台卖家', zh: '平台卖家', en: 'Platform seller', desc: { zh: 'Amazon / TikTok Shop / Shopee 等', en: 'Amazon / TikTok Shop / Shopee etc.' } },
          { value: '两者都做', zh: '两者都做', en: 'Both', desc: null }
        ]
      },
      {
        id: 'Q2',
        type: 'single',
        field: 'main_market',
        zh: '您的主要目标市场是？',
        en: 'What is your main target market?',
        options: [
          { value: '北美', zh: '北美（美国、加拿大）', en: 'North America (US, Canada)', desc: null },
          { value: '欧洲', zh: '欧洲（英、法、德等）', en: 'Europe (UK, France, Germany, etc.)', desc: null },
          { value: '东南亚', zh: '东南亚', en: 'Southeast Asia', desc: null },
          { value: '日韩', zh: '日韩', en: 'Japan / Korea', desc: null },
          { value: '中东', zh: '中东', en: 'Middle East', desc: null },
          { value: '拉美', zh: '拉美', en: 'Latin America', desc: null },
          { value: '全球', zh: '全球布局', en: 'Global', desc: null }
        ]
      },
      {
        id: 'Q3',
        type: 'single',
        field: 'monthly_ad_spend',
        zh: '您每月在广告上的投入大约是？',
        en: 'What is your approximate monthly ad spend?',
        hint: { zh: '人民币', en: 'RMB' },
        options: [
          { value: '0', zh: '目前不投广告', en: 'Not running ads currently', desc: null },
          { value: '5千以下', zh: '¥5,000 以下', en: 'Under ¥5,000', desc: null },
          { value: '5千-2万', zh: '¥5,000 ~ ¥20,000', en: '¥5,000 – ¥20,000', desc: null },
          { value: '2万-10万', zh: '¥20,000 ~ ¥100,000', en: '¥20,000 – ¥100,000', desc: null },
          { value: '10万以上', zh: '¥100,000+', en: '¥100,000+', desc: null }
        ]
      },

      // ========== Section B: 广告与创意痛点 ==========
      {
        id: 'Q4',
        section: 'creative_pain',
        sectionTitle: { zh: '广告与创意', en: 'Ad Creative' },
        type: 'single',
        field: 'creative_refresh_frequency',
        zh: '您多久更新一次广告素材？',
        en: 'How often do you refresh ad creatives?',
        options: [
          { value: '几天', zh: '几天一次', en: 'Every few days', desc: null },
          { value: '每周', zh: '每周', en: 'Weekly', desc: null },
          { value: '两周', zh: '每两周', en: 'Biweekly', desc: null },
          { value: '每月', zh: '每月', en: 'Monthly', desc: null },
          { value: '很少', zh: '很少更新', en: 'Rarely', desc: null },
          { value: '不投', zh: '不投广告', en: 'Don\'t run ads', desc: null }
        ]
      },
      {
        id: 'Q5',
        type: 'single',
        field: 'biggest_creative_challenge',
        zh: '制作广告素材时，最大的挑战是什么？',
        en: 'What is the biggest challenge when creating ad creatives?',
        options: [
          { value: '没有灵感', zh: '没有创意灵感，不知道拍什么', en: 'No creative inspiration', desc: null },
          { value: '制作慢', zh: '制作速度太慢，效率低', en: 'Production is too slow', desc: null },
          { value: '不知道有效', zh: '不知道什么素材有效', en: 'Don\'t know what works', desc: null },
          { value: '素材疲劳', zh: '素材容易疲劳，很快失效', en: 'Creative fatigue, ads stop working', desc: null },
          { value: '竞品难追踪', zh: '不知道竞品在做什么广告', en: 'Hard to track competitor ads', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q6',
        type: 'single',
        field: 'competitor_tracking',
        zh: '您目前怎么追踪竞品的广告和创意？',
        en: 'How do you track competitors\' ads and creatives?',
        options: [
          { value: '工具', zh: '用 AdSpy / Minea / PipiAds 等工具', en: 'Using ad spy tools', desc: null },
          { value: '手动', zh: '手动刷社交媒体和广告库', en: 'Manually browsing social media & ad libraries', desc: null },
          { value: '没有', zh: '没有系统追踪', en: 'No systematic tracking', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },

      // ========== Section C: 商品页与转化 ==========
      {
        id: 'Q7',
        section: 'conversion',
        sectionTitle: { zh: '商品页与转化', en: 'Product Page & Conversion' },
        type: 'single',
        field: 'conversion_rate_concern',
        zh: '您对独立站/商品页的转化率满意吗？',
        en: 'Are you satisfied with your store/product page conversion rate?',
        options: [
          { value: '很差', zh: '很差，急需提升', en: 'Very poor, need to improve urgently', desc: null },
          { value: '一般', zh: '一般，有提升空间', en: 'Average, room for improvement', desc: null },
          { value: '还行', zh: '还行，基本满意', en: 'Decent, mostly satisfied', desc: null },
          { value: '很好', zh: '很好，很满意', en: 'Very good, satisfied', desc: null },
          { value: '不关注', zh: '不太关注这个指标', en: 'Don\'t track this metric', desc: null }
        ]
      },
      {
        id: 'Q8',
        type: 'multi',
        field: 'product_page_issues',
        maxSelect: 3,
        zh: '您的商品页最常遇到哪些问题？',
        en: 'What are the most common issues with your product pages?',
        hint: { zh: '最多选3项', en: 'Max 3' },
        options: [
          { value: '转化率低', zh: '流量来了但转化率低', en: 'Traffic comes but low conversion', desc: null },
          { value: '跳出率高', zh: '用户很快就离开了', en: 'Users leave quickly (high bounce rate)', desc: null },
          { value: '退货多', zh: '退货率高，买家预期不符', en: 'High return rate, buyer expectations mismatch', desc: null },
          { value: '差评多', zh: '差评多，不知道怎么改善', en: 'Many negative reviews, don\'t know how to improve', desc: null },
          { value: 'SEO差', zh: '搜索排名低，自然流量少', en: 'Low search ranking, little organic traffic', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },

      // ========== Section D: AI 工具态度 ==========
      {
        id: 'Q9',
        section: 'ai_attitude',
        sectionTitle: { zh: 'AI 工具态度', en: 'AI Tool Attitude' },
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
        id: 'Q10',
        type: 'single',
        field: 'ai_expectation',
        zh: '如果有一个AI工具能帮您提升效率，您最希望它解决什么问题？',
        en: 'If an AI tool could improve your efficiency, what problem would you most want it to solve?',
        options: [
          { value: '创意情报', zh: '每天自动追踪竞品广告和热门素材', en: 'Auto-track competitor ads and trending creatives daily', desc: null },
          { value: '广告优化', zh: '帮我优化广告素材和投放策略', en: 'Help optimize ad creatives and targeting', desc: null },
          { value: '商品页优化', zh: '帮我提升商品页转化率', en: 'Help improve product page conversion', desc: null },
          { value: '内容生成', zh: '快速生成多平台内容', en: 'Quickly generate multi-platform content', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q11',
        type: 'single',
        field: 'willing_to_pay',
        zh: '如果AI工具能显著提升您的广告效果和转化率，您愿意每月付多少？',
        en: 'If an AI tool significantly improved your ad performance and conversion rate, how much would you pay monthly?',
        options: [
          { value: '0', zh: '¥0 — 不需要', en: '$0 — Don\'t need', desc: null },
          { value: '99以下', zh: '¥99 以下', en: 'Under $14', desc: null },
          { value: '99-299', zh: '¥99 ~ ¥299', en: '$14 – $42', desc: null },
          { value: '300-599', zh: '¥300 ~ ¥599', en: '$42 – $84', desc: null },
          { value: '600以上', zh: '¥600 以上', en: 'Over $84', desc: null }
        ]
      },

      // ========== Section E: 联系方式 ==========
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
          { field: 'contact_email', placeholder: { zh: '邮箱 / Email', en: 'Email address' } },
          { field: 'contact_linkedin', placeholder: { zh: '领英账号 / LinkedIn Profile', en: 'LinkedIn Profile' } }
        ]
      }
    ]
  },

  // 深度调查：25题，~10分钟
  deep: {
    id: 'deep',
    title: { zh: '深度调研', en: 'Detailed Survey' },
    subtitle: { zh: '约10分钟', en: '~10 min' },
    questionCount: 25,
    questions: [
      // ========== 深度调查额外问题 ==========
      {
        id: 'Q13-DEEP',
        section: 'ad_details',
        sectionTitle: { zh: '广告投放细节', en: 'Ad Details' },
        type: 'multi',
        field: 'ad_platforms',
        deepOnly: true,
        zh: '您主要投哪些广告平台？',
        en: 'Which ad platforms do you mainly use?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: 'Facebook/Instagram', zh: 'Facebook / Instagram', en: 'Facebook / Instagram', desc: null },
          { value: 'TikTok', zh: 'TikTok', en: 'TikTok', desc: null },
          { value: 'Google', zh: 'Google Ads', en: 'Google Ads', desc: null },
          { value: 'Pinterest', zh: 'Pinterest', en: 'Pinterest', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q14-DEEP',
        type: 'single',
        field: 'monthly_creative_count',
        deepOnly: true,
        zh: '您每月大约制作多少条广告素材？',
        en: 'How many ad creatives do you produce monthly?',
        options: [
          { value: '10条以下', zh: '10条以下', en: 'Under 10', desc: null },
          { value: '10-50条', zh: '10 ~ 50条', en: '10 – 50', desc: null },
          { value: '50-100条', zh: '50 ~ 100条', en: '50 – 100', desc: null },
          { value: '100条以上', zh: '100条以上', en: '100+', desc: null }
        ]
      },
      {
        id: 'Q15-DEEP',
        type: 'single',
        field: 'creative_source',
        deepOnly: true,
        zh: '您的广告创意灵感主要来自哪里？',
        en: 'Where do your ad creative ideas mainly come from?',
        options: [
          { value: '竞品参考', zh: '参考竞品的广告', en: 'Reference competitor ads', desc: null },
          { value: '平台趋势', zh: '平台热门趋势', en: 'Platform trending content', desc: null },
          { value: '自己想', zh: '自己想', en: 'Come up with myself', desc: null },
          { value: '外包', zh: '外包给团队/服务商', en: 'Outsource to team/service provider', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q16-DEEP',
        type: 'single',
        field: 'creative_pain_detail',
        deepOnly: true,
        zh: '您在广告创意方面最希望AI帮您做什么？',
        en: 'What do you most want AI to help with regarding ad creatives?',
        options: [
          { value: '追踪竞品', zh: '自动追踪竞品每天在投什么广告', en: 'Auto-track what competitors are running daily', desc: null },
          { value: '热门素材', zh: '发现当前热门的广告素材和hook', en: 'Discover trending ad creatives and hooks', desc: null },
          { value: '生成脚本', zh: '生成短视频脚本和广告文案', en: 'Generate video scripts and ad copy', desc: null },
          { value: '测试建议', zh: '告诉我今天应该测试什么内容', en: 'Tell me what to test today', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },

      // ========== 商品页优化 ==========
      {
        id: 'Q17-DEEP',
        section: 'product_page',
        sectionTitle: { zh: '商品页优化', en: 'Product Page Optimization' },
        type: 'single',
        field: 'product_page_time',
        deepOnly: true,
        zh: '优化一个商品页大约需要多长时间？',
        en: 'How long does it take to optimize one product page?',
        options: [
          { value: '1小时以下', zh: '1小时以下', en: 'Under 1 hour', desc: null },
          { value: '1-3小时', zh: '1 ~ 3小时', en: '1 – 3 hours', desc: null },
          { value: '3-8小时', zh: '3 ~ 8小时', en: '3 – 8 hours', desc: null },
          { value: '8小时以上', zh: '8小时以上', en: '8+ hours', desc: null },
          { value: '不优化', zh: '基本不优化', en: 'Rarely optimize', desc: null }
        ]
      },
      {
        id: 'Q18-DEEP',
        type: 'multi',
        field: 'product_page_elements',
        deepOnly: true,
        zh: '您认为哪些商品页元素对转化率影响最大？',
        en: 'Which product page elements do you think impact conversion the most?',
        hint: { zh: '最多选3项', en: 'Max 3' },
        options: [
          { value: '主图视频', zh: '主图/视频', en: 'Main image / video', desc: null },
          { value: '标题卖点', zh: '标题和卖点', en: 'Title and selling points', desc: null },
          { value: '详细描述', zh: '详细描述', en: 'Detailed description', desc: null },
          { value: '用户评价', zh: '用户评价/社交证明', en: 'Reviews / social proof', desc: null },
          { value: 'FAQ', zh: 'FAQ / 常见问题', en: 'FAQ / common questions', desc: null },
          { value: '价格策略', zh: '价格和促销', en: 'Pricing and promotions', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },
      {
        id: 'Q19-DEEP',
        type: 'single',
        field: 'market_readiness_need',
        deepOnly: true,
        zh: '上架前，您是否会检查商品资料是否完整（材质、尺寸、警告语等）？',
        en: 'Before listing, do you check if product information is complete (materials, size, warnings, etc.)?',
        options: [
          { value: '每次都查', zh: '每次都仔细检查', en: 'Always check carefully', desc: null },
          { value: '偶尔查', zh: '偶尔检查', en: 'Sometimes check', desc: null },
          { value: '基本不查', zh: '基本不检查', en: 'Rarely check', desc: null },
          { value: '不知道查什么', zh: '不知道该检查什么', en: 'Don\'t know what to check', desc: null }
        ]
      },

      // ========== 竞品与市场 ==========
      {
        id: 'Q20-DEEP',
        section: 'market_intelligence',
        sectionTitle: { zh: '竞品与市场', en: 'Competitors & Market' },
        type: 'single',
        field: 'competitor_analysis_frequency',
        deepOnly: true,
        zh: '您多久分析一次竞品？',
        en: 'How often do you analyze competitors?',
        options: [
          { value: '每天', zh: '每天', en: 'Daily', desc: null },
          { value: '每周', zh: '每周', en: 'Weekly', desc: null },
          { value: '每月', zh: '每月', en: 'Monthly', desc: null },
          { value: '很少', zh: '很少分析', en: 'Rarely', desc: null },
          { value: '从不', zh: '从不分析', en: 'Never', desc: null }
        ]
      },
      {
        id: 'Q21-DEEP',
        type: 'multi',
        field: 'competitor_analysis_content',
        deepOnly: true,
        zh: '您分析竞品时主要关注什么？',
        en: 'What do you mainly focus on when analyzing competitors?',
        hint: { zh: '可多选', en: 'Multiple choice' },
        options: [
          { value: '广告素材', zh: '他们的广告素材', en: 'Their ad creatives', desc: null },
          { value: '定价策略', zh: '定价策略', en: 'Pricing strategy', desc: null },
          { value: '商品页', zh: '商品页设计', en: 'Product page design', desc: null },
          { value: '用户评价', zh: '用户评价', en: 'User reviews', desc: null },
          { value: '流量来源', zh: '流量来源', en: 'Traffic sources', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
        ]
      },

      // ========== 付费意愿 ==========
      {
        id: 'Q22-DEEP',
        section: 'pricing',
        sectionTitle: { zh: '付费意愿', en: 'Willingness to Pay' },
        type: 'single',
        field: 'pay_for_creative_scout',
        deepOnly: true,
        zh: '如果AI每天帮您追踪竞品广告并生成5条可测试的创意建议，您愿意每月付多少？',
        en: 'If AI tracked competitor ads daily and generated 5 testable creative suggestions, how much would you pay monthly?',
        options: [
          { value: '0', zh: '¥0 — 不需要', en: '$0 — Don\'t need', desc: null },
          { value: '99以下', zh: '¥99 以下', en: 'Under $14', desc: null },
          { value: '99-299', zh: '¥99 ~ ¥299', en: '$14 – $42', desc: null },
          { value: '300-599', zh: '¥300 ~ ¥599', en: '$42 – $84', desc: null },
          { value: '600以上', zh: '¥600+', en: 'Over $84', desc: null }
        ]
      },
      {
        id: 'Q23-DEEP',
        type: 'single',
        field: 'pay_for_page_optimize',
        deepOnly: true,
        zh: '如果AI能帮您分析商品页问题并给出优化建议，您愿意每月付多少？',
        en: 'If AI could analyze your product pages and give optimization suggestions, how much would you pay monthly?',
        options: [
          { value: '0', zh: '¥0 — 不需要', en: '$0 — Don\'t need', desc: null },
          { value: '99以下', zh: '¥99 以下', en: 'Under $14', desc: null },
          { value: '99-299', zh: '¥99 ~ ¥299', en: '$14 – $42', desc: null },
          { value: '300-599', zh: '¥300 ~ ¥599', en: '$42 – $84', desc: null },
          { value: '600以上', zh: '¥600+', en: 'Over $84', desc: null }
        ]
      },
      {
        id: 'Q24-DEEP',
        type: 'multi',
        field: 'most_valuable_features',
        maxSelect: 3,
        deepOnly: true,
        zh: '以下哪些功能对您最有价值？',
        en: 'Which features would be most valuable to you?',
        hint: { zh: '最多选3项', en: 'Max 3' },
        options: [
          { value: '竞品广告追踪', zh: '每天自动追踪竞品广告', en: 'Auto-track competitor ads daily', desc: null },
          { value: '热门素材发现', zh: '发现热门广告素材和hook', en: 'Discover trending ad creatives and hooks', desc: null },
          { value: '创意脚本生成', zh: '生成短视频脚本和广告文案', en: 'Generate video scripts and ad copy', desc: null },
          { value: '商品页优化建议', zh: '分析商品页并给出优化建议', en: 'Analyze product pages and give optimization tips', desc: null },
          { value: '市场准备度检查', zh: '上架前检查资料完整性', en: 'Pre-listing completeness check', desc: null },
          { value: '其他', zh: '其他', en: 'Other', desc: null, hasOther: true }
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
          { field: 'contact_email', placeholder: { zh: '邮箱 / Email', en: 'Email address' } },
          { field: 'contact_linkedin', placeholder: { zh: '领英账号 / LinkedIn Profile', en: 'LinkedIn Profile' } }
        ]
      }
    ]
  }
};

window.SURVEY_CONFIG.deep.shallowRef = true;
