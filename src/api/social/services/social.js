'use strict';

const axios = require('axios');
const passport = require('passport');
const GoogleStrategy = require('passport-token-google').Strategy;
const crypto = require('crypto')
const appleSigninAuth = require('apple-signin-auth');



passport.initialize();


const loginObject = async (email) => {
  try {
    const user = await strapi.db.query("plugin::users-permissions.user").findOne({
      where: {
        email
      }
    });

    if (user) {
      const jwtToken = strapi.plugins["users-permissions"].services.jwt.issue({ id: user.id });

      delete user.password;

      return {
        jwt: jwtToken,
        user: { ...user }
      };
    }

    return {}

  } catch (error) {
    return error;
  }
};


const callback = async (accessToken, refreshToken, profile, done) => {
  try {
    if (!profile._json.email) done(null, false);

    const user = await loginObject(profile._json.email);
    done(null, user);

  } catch (error) {
    done(error, false, error.message)

  }
}


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, callback));



module.exports = {
  loginFacebook: async (token) => {
    try {
      const url = `https://graph.facebook.com/me?access_token=${token}&fields=email`;

      return axios({
        method: 'GET',
        url: url
      }).then(async (response) => {
        return await loginObject(response.data.email);

      }).catch(function (error) {
        return error;
      });

    } catch (error) {
      return false;
    }
  },
  loginApple: async (id_token, nonce) => {
    try {

      const appleIdTokenClaims = await appleSigninAuth.verifyIdToken(id_token, {
        nonce: nonce ? crypto.createHash('sha256').update(nonce).digest('hex') : undefined,
      });

      return await loginObject(appleIdTokenClaims.email);

    } catch (error) {
      console.error(error)
      return error;

    }
  },
  login: (name, ctx) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(name, { session: false }, async (error, user, info) => {
        if (error === null) {
          resolve(user)
        }
      })(ctx);
    })
  },
  loginGoogle: async (token) => {
    try {
      const url = `https://www.googleapis.com/oauth2/v3/userinfo`;

      return axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(async (response) => {
        return await loginObject(response.data.email);

      }).catch(function (error) {
        return error;
      });

    } catch (error) {
      return false;
    }
  },
};
