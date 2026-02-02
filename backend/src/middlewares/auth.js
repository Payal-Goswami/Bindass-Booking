// export function authenticate(req, res, next) {
//   req.user = { id: '4f036a94-fdf3-4bd6-953c-59ab6394d215', role: 'ADMIN' };
//   next();
// }

import { supabase } from '../config/supabase.js';
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
       return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
       return res.status(401).json({ error: "Invalid or expired token" });
    }

      const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', user.id)
      .single();

    if (dbError || !dbUser) {
      return res.status(403).json({ error: "User not registered" });
    }

    req.user = {
      id: dbUser.id,
      role: dbUser.role,
      email: user.email
    };

    next();
  } catch (err) {
    next(err);
  }
};