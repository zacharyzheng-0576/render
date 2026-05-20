const RESPONSE_PREFIX = 'response_';

const CSV_HEADERS = [
  '提交时间', '入行时间', '目标国家', '月营收', '业务类型',
  '主要平台', '平台痛点', '平台痛点补充', 'AI工具', 'AI工具补充',
  '获客渠道', '素材时间', '竞品追踪', '竞品追踪补充',
  '最大痛点', '痛点补充', '付费意愿',
  '创意素材', '竞品情报', '多语言管理', '广告优化', '运营效率',
  'AI工具不足', 'AI工具不足补充', '愿意访谈', '联系方式类型', '联系方式'
];

function getKV(context) {
  const env = context && context.env ? context.env : {};
  const kv = env.SURVEY_KV || env.survey_kv || env.my_kv ||
    globalThis.SURVEY_KV || globalThis.survey_kv || globalThis.my_kv;

  if (!kv) {
    throw new Error('Missing EdgeOne KV binding. Bind a KV namespace as SURVEY_KV.');
  }

  return kv;
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function csvResponse(content) {
  return new Response('\uFEFF' + content, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'cache-control': 'no-store',
      'content-disposition': 'attachment; filename=survey_export.csv'
    }
  });
}

function sanitizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeResponse(data) {
  const id = Date.now() * 1000 + Math.floor(Math.random() * 1000);
  return {
    id,
    created_at: new Date().toISOString(),
    experience: data.experience || null,
    countries: sanitizeArray(data.countries),
    countries_other: data.countries_other || null,
    revenue: data.revenue || null,
    business_type: data.business_type || null,
    platforms: sanitizeArray(data.platforms),
    platforms_other: data.platforms_other || null,
    platform_pain: data.platform_pain || null,
    platform_pain_other: data.platform_pain_other || null,
    platform_ai_tools: sanitizeArray(data.platform_ai_tools),
    platform_ai_tools_other: data.platform_ai_tools_other || null,
    traffic_channels: sanitizeArray(data.traffic_channels),
    creative_hours: data.creative_hours || null,
    competitor_tracking: data.competitor_tracking || null,
    competitor_tracking_other: data.competitor_tracking_other || null,
    biggest_pains: sanitizeArray(data.biggest_pains),
    biggest_pains_other: data.biggest_pains_other || null,
    willing_to_pay: data.willing_to_pay || null,
    pain_creative: Number(data.pain_creative) || 3,
    pain_intelligence: Number(data.pain_intelligence) || 3,
    pain_multilingual: Number(data.pain_multilingual) || 3,
    pain_ad_optimize: Number(data.pain_ad_optimize) || 3,
    pain_efficiency: Number(data.pain_efficiency) || 3,
    ai_tool_gap: data.ai_tool_gap || null,
    ai_tool_gap_other: data.ai_tool_gap_other || null,
    willing_interview: data.willing_interview || null,
    contact_method: data.contact_method || null,
    contact_info: data.contact_info || null
  };
}

async function listResponseKeys(kv) {
  const keys = [];
  let cursor = undefined;

  do {
    const options = { prefix: RESPONSE_PREFIX, limit: 256 };
    if (cursor) options.cursor = cursor;

    const result = await kv.list(options);
    const pageKeys = (result && result.keys) || [];
    pageKeys.forEach(item => keys.push(typeof item === 'string' ? item : item.key || item.name));

    cursor = result && result.cursor;
    if (result && result.complete) break;
  } while (cursor);

  return keys.filter(Boolean);
}

async function listResponses(kv) {
  const keys = await listResponseKeys(kv);
  const rows = await Promise.all(keys.map(async key => {
    const value = await kv.get(key);
    if (!value) return null;
    if (typeof value === 'object') return value;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }));

  return rows
    .filter(Boolean)
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
}

function csvEscape(value) {
  const text = value === null || value === undefined ? '' : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function toCsv(rows) {
  const lines = [CSV_HEADERS.map(csvEscape).join(',')];

  rows.forEach(r => {
    const values = [
      r.created_at,
      r.experience,
      sanitizeArray(r.countries).join('|'),
      r.revenue,
      r.business_type,
      sanitizeArray(r.platforms).join('|'),
      r.platform_pain,
      r.platform_pain_other,
      sanitizeArray(r.platform_ai_tools).join('|'),
      r.platform_ai_tools_other,
      sanitizeArray(r.traffic_channels).join('|'),
      r.creative_hours,
      r.competitor_tracking,
      r.competitor_tracking_other,
      sanitizeArray(r.biggest_pains).join('|'),
      r.biggest_pains_other,
      r.willing_to_pay,
      r.pain_creative,
      r.pain_intelligence,
      r.pain_multilingual,
      r.pain_ad_optimize,
      r.pain_efficiency,
      r.ai_tool_gap,
      r.ai_tool_gap_other,
      r.willing_interview,
      r.contact_method,
      r.contact_info
    ];
    lines.push(values.map(csvEscape).join(','));
  });

  return lines.join('\n');
}

async function handleSubmit(request, kv) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ success: false, error: 'Invalid JSON body' }, 400);
  }

  const row = normalizeResponse(payload || {});
  await kv.put(RESPONSE_PREFIX + row.id, JSON.stringify(row));
  return jsonResponse({ success: true, id: row.id });
}

async function handleStats(kv) {
  const responses = await listResponses(kv);
  return jsonResponse({ total: responses.length, responses });
}

async function handleDelete(pathname, kv) {
  const id = pathname.split('/').filter(Boolean).pop();
  if (!id || !/^\d+$/.test(id)) {
    return jsonResponse({ success: false, error: 'Invalid response id' }, 400);
  }

  await kv.delete(RESPONSE_PREFIX + id);
  return jsonResponse({ success: true });
}

async function handleClear(kv) {
  const keys = await listResponseKeys(kv);
  await Promise.all(keys.map(key => kv.delete(key)));
  return jsonResponse({ success: true, deleted: keys.length });
}

async function handleExport(kv) {
  const responses = await listResponses(kv);
  return csvResponse(toCsv(responses));
}

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const method = request.method.toUpperCase();
  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  if (method === 'OPTIONS') return new Response(null, { status: 204 });

  try {
    const kv = getKV(context);

    if (pathname === '/api/submit' && method === 'POST') return handleSubmit(request, kv);
    if (pathname === '/api/stats' && method === 'GET') return handleStats(kv);
    if (pathname.startsWith('/api/delete/') && method === 'DELETE') return handleDelete(pathname, kv);
    if (pathname === '/api/clear' && method === 'DELETE') return handleClear(kv);
    if (pathname === '/api/export' && method === 'GET') return handleExport(kv);

    return jsonResponse({ success: false, error: 'Not found' }, 404);
  } catch (error) {
    return jsonResponse({ success: false, error: error.message || 'Server error' }, 500);
  }
}
