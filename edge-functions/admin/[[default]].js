export function onRequest(context) {
  const url = new URL(context.request.url);
  url.pathname = '/admin.html';
  return Response.redirect(url.toString(), 302);
}
