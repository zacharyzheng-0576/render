(function () {
  const TABLE = 'survey_responses';
  const config = window.CROSSPILOT_SUPABASE_CONFIG;
  const adminEmails = window.CROSSPILOT_ADMIN_EMAILS || [];
  let supabase = null;

  function hasConfig() {
    return Boolean(config && config.url && config.anonKey);
  }

  function init() {
    if (!hasConfig() || !window.supabase) return false;
    if (!supabase) {
      supabase = window.supabase.createClient(config.url, config.anonKey);
    }
    return true;
  }

  function isStaticHosting() {
    return /github\.io$/.test(window.location.hostname) || window.location.protocol === 'file:';
  }

  function normalizeRow(row) {
    const data = row.data || {};
    return Object.assign({}, data, {
      id: row.id,
      created_at: row.created_at,
      countries: Array.isArray(data.countries) ? data.countries : [],
      platforms: Array.isArray(data.platforms) ? data.platforms : [],
      platform_ai_tools: Array.isArray(data.platform_ai_tools) ? data.platform_ai_tools : [],
      traffic_channels: Array.isArray(data.traffic_channels) ? data.traffic_channels : [],
      biggest_pains: Array.isArray(data.biggest_pains) ? data.biggest_pains : []
    });
  }

  async function submitResponse(data) {
    if (!init()) {
      if (isStaticHosting()) {
        return {
          success: false,
          error: 'Supabase 没有加载成功，请检查网络或配置。'
        };
      }
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    }

    const payload = Object.assign({}, data);
    payload.created_at = new Date().toISOString();

    const { data: result, error } = await supabase
      .from(TABLE)
      .insert([{ data: payload }])
      .select();

    if (error) {
      throw new Error(error.message || 'Supabase 写入失败');
    }

    return { success: true, id: result && result[0] ? result[0].id : null };
  }

  async function loadResponses() {
    if (!init()) {
      if (isStaticHosting()) {
        throw new Error('Supabase 没有加载成功，后台无法读取数据。');
      }
      const response = await fetch('/api/stats');
      return response.json();
    }

    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message || 'Supabase 读取失败');
    }

    const responses = (data || []).map(normalizeRow);
    return { total: responses.length, responses };
  }

  function subscribeResponses(callback, onError) {
    if (!init()) return null;

    const channel = supabase
      .channel('survey_responses_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: TABLE
      }, async () => {
        try {
          const result = await loadResponses();
          callback(result);
        } catch (err) {
          if (onError) onError(err);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async function deleteResponse(id) {
    if (!init()) {
      const response = await fetch('/api/delete/' + encodeURIComponent(id), { method: 'DELETE' });
      return response.json();
    }

    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message || 'Supabase 删除失败');
    }

    return { success: true };
  }

  async function clearResponses(rows) {
    if (!init()) {
      const response = await fetch('/api/clear', { method: 'DELETE' });
      return response.json();
    }

    const ids = rows.map(row => row.id);
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .in('id', ids);

    if (error) {
      throw new Error(error.message || 'Supabase 清空失败');
    }

    return { success: true };
  }

  async function login(email, password) {
    if (!init()) return Promise.reject(new Error('Supabase is not configured.'));

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      throw new Error(error.message || '登录失败');
    }

    return data;
  }

  async function logout() {
    if (!init()) return Promise.resolve();

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message || '登出失败');
    }
  }

  function onAuthChange(callback) {
    if (!init()) {
      callback({ email: 'local-api' });
      return function () {};
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        callback(session ? session.user : null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }

  function isAllowedAdmin(user) {
    if (!init()) return true;
    return Boolean(user && adminEmails.includes(user.email));
  }

  window.CrossPilotData = {
    supabaseEnabled: hasConfig,
    submitResponse,
    loadResponses,
    subscribeResponses,
    deleteResponse,
    clearResponses,
    login,
    logout,
    onAuthChange,
    isAllowedAdmin
  };
})();
