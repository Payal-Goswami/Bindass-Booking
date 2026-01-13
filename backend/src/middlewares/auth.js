export function authenticate(req, res, next) {
  req.user = { id: 'aa8add85-9776-4924-9d34-71badd4db85a' };
  next();
}
