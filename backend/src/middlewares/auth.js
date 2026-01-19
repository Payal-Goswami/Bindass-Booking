export function authenticate(req, res, next) {
  req.user = { id: '4f036a94-fdf3-4bd6-953c-59ab6394d215' };
  next();
}
