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
       return res.status(401).json({ error: "Invalid or expired token : User not registered" });
    }

      const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', user.id)
      .maybeSingle();

      if (dbError) {
      return res.status(403).json({ error: "Failed to login:(" });
    }

      let finalUser = dbUser;

if (!dbUser) {
  const { data: insertedUser, error: insertError } = await supabase
    .from('users')
    .insert({
      id: user.id,
      email: user.email,
      role: 'USER' 
    })
    .select()
    .single();

  if (insertError) {
    return res.status(500).json({ error: "Failed to login:(" });
  }

  finalUser = insertedUser;
}

    

    req.user = {
      id: finalUser.id,
      role: finalUser.role,
      email: finalUser.email
    };
    next();
  } catch (err) {
    next(err);
  }
};