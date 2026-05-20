(function () {
  const COLLECTION = 'survey_responses';
  const config = window.CROSSPILOT_FIREBASE_CONFIG;
  const adminEmails = window.CROSSPILOT_ADMIN_EMAILS || [];
  let app = null;
  let db = null;
  let auth = null;

  function configured() {
    return Boolean(config && config.apiKey && window.firebase);
  }

  function init() {
    if (!configured()) return false;
    if (!app) {
      app = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
      db = firebase.firestore();
      auth = firebase.auth();
    }
    return true;
  }

  function apiUrl(path) {
    return path.replace(/^\//, '');
  }

  function normalizeRow(doc) {
    const data = doc.data();
    return Object.assign({}, data, {
      id: doc.id,
      countries: Array.isArray(data.countries) ? data.countries : [],
      platforms: Array.isArray(data.platforms) ? data.platforms : [],
      platform_ai_tools: Array.isArray(data.platform_ai_tools) ? data.platform_ai_tools : [],
      traffic_channels: Array.isArray(data.traffic_channels) ? data.traffic_channels : [],
      biggest_pains: Array.isArray(data.biggest_pains) ? data.biggest_pains : []
    });
  }

  function withCreatedAt(data) {
    const payload = Object.assign({}, data);
    payload.created_at = new Date().toISOString();
    if (configured()) payload.created_at_server = firebase.firestore.FieldValue.serverTimestamp();
    return payload;
  }

  async function submitResponse(data) {
    if (!init()) {
      const response = await fetch(apiUrl('/api/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    }

    const doc = await db.collection(COLLECTION).add(withCreatedAt(data));
    return { success: true, id: doc.id };
  }

  async function loadResponses() {
    if (!init()) {
      const response = await fetch(apiUrl('/api/stats'));
      return response.json();
    }

    const snapshot = await db.collection(COLLECTION).orderBy('created_at', 'desc').get();
    const responses = snapshot.docs.map(normalizeRow);
    return { total: responses.length, responses };
  }

  function subscribeResponses(callback, onError) {
    if (!init()) return null;

    return db.collection(COLLECTION)
      .orderBy('created_at', 'desc')
      .onSnapshot(snapshot => {
        const responses = snapshot.docs.map(normalizeRow);
        callback({ total: responses.length, responses });
      }, error => {
        if (onError) onError(error);
      });
  }

  async function deleteResponse(id) {
    if (!init()) {
      const response = await fetch(apiUrl('/api/delete/' + encodeURIComponent(id)), { method: 'DELETE' });
      return response.json();
    }

    await db.collection(COLLECTION).doc(String(id)).delete();
    return { success: true };
  }

  async function clearResponses(rows) {
    if (!init()) {
      const response = await fetch(apiUrl('/api/clear'), { method: 'DELETE' });
      return response.json();
    }

    const batch = db.batch();
    rows.forEach(row => batch.delete(db.collection(COLLECTION).doc(String(row.id))));
    await batch.commit();
    return { success: true };
  }

  function login(email, password) {
    if (!init()) return Promise.reject(new Error('Firebase is not configured.'));
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    if (!init()) return Promise.resolve();
    return auth.signOut();
  }

  function onAuthChange(callback) {
    if (!init()) {
      callback({ email: 'local-api' });
      return function () {};
    }
    return auth.onAuthStateChanged(callback);
  }

  function isAllowedAdmin(user) {
    if (!init()) return true;
    return Boolean(user && adminEmails.includes(user.email));
  }

  window.CrossPilotData = {
    firebaseEnabled: configured,
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
