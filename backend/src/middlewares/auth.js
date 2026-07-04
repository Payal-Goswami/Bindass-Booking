import { supabase } from '../config/supabase.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', user.id)
      .maybeSingle();

    if (dbError) {
      return res.status(500).json({ error: 'Authentication failed' });
    }

    if (!dbUser) {
      const { data: insertedUser, error: insertError } = await supabase
        .from('users')
        .insert({ id: user.id, email: user.email, role: 'USER' })
        .select()
        .single();

      if (insertError) {
        return res.status(500).json({ error: 'Authentication failed' });
      }

      req.user = { id: insertedUser.id, role: insertedUser.role, email: user.email };
    } else {
      req.user = { id: dbUser.id, role: dbUser.role, email: user.email };
    }

    next();
  } catch (err) {
    next(err);
  }
};
