import { Router, Request, Response, NextFunction } from 'express';
import passport from '../../config/passport';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import type { User } from '../../services/sql/userService';

const router = Router();

// Redirect to Google consent screen
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

// Google callback
router.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', { session: false }, (err: Error, user: User) => {
    if (err) {
      console.error('[Google OAuth error]', err)
      return res.redirect(`${env.corsOrigin}/login?error=auth_failed`)
    }
    if (!user) {
      console.error('[Google OAuth] no user returned')
      return res.redirect(`${env.corsOrigin}/login?error=auth_failed`)
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    );

    const refreshToken = jwt.sign(
      { sub: user.id },
      env.jwt.refreshSecret,
      { expiresIn: env.jwt.refreshExpiresIn }
    );

    res.redirect(`${env.corsOrigin}/auth/callback?token=${token}&refresh=${refreshToken}`);
  })(req, res, next)
});

export default router;
