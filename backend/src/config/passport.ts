import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from './env';
// import { userService } from '../services/sql/userService';

// TODO: replace with real DB user once schema is set up
const MOCK_USER = {
  id: 'mock-user-1',
  email: 'mockuser7342@gmail.com',
  username: 'mockuser7342',
  password_hash: null,
  google_id: null,
  avatar_url: null,
  created_at: new Date(),
};

passport.use(
  new GoogleStrategy(
    {
      clientID: env.google.clientId,
      clientSecret: env.google.clientSecret,
      callbackURL: env.google.callbackUrl,
    },
    async (_accessToken, _refreshToken, _profile, done) => {
      try {
        // TODO: replace mock with real DB lookup once schema is set up
        // const email = _profile.emails?.[0]?.value ?? '';
        // const avatarUrl = _profile.photos?.[0]?.value ?? '';
        // let user = await userService.findByGoogleId(_profile.id);
        // if (!user) {
        //   user = await userService.createFromGoogle({
        //     googleId: _profile.id,
        //     email,
        //     username: _profile.displayName,
        //     avatarUrl,
        //   });
        // }
        // return done(null, user);

        return done(null, MOCK_USER);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

export default passport;
