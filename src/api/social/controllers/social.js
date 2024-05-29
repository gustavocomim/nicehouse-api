'use strict';

const { loginFacebook, loginApple, loginGoogle, login } = require('../services/social');


module.exports = {
  authTokenFacebook: async (ctx) => {
    try {
      const { access_token } = ctx.request.query;

      if(!access_token) return ctx.badRequest("access_token not found");
      
      const user = await loginFacebook(access_token);
      if(!user) return ctx.badRequest("user not found");
      return ctx.body = user;  
      
    } catch (error) {
      return ctx.badRequest(error);

    }
  },

  authTokenGoogle: async (ctx) => {
    try {
      const user = await login('google-token', ctx);

      if(!user) return ctx.badRequest("user not found");
      return ctx.body = user;
      
    } catch (error) {
      return ctx.badRequest(error);

    }
  },

  bearerTokenGoogle: async (ctx) => {
    try {
      const { access_token } = ctx.request.query;

      if(!access_token) return ctx.badRequest("access_token not found");
      
      const user = await loginGoogle(access_token);
      if(!user) return ctx.badRequest("user not found");
      return ctx.body = user;  
      
    } catch (error) {
      return ctx.badRequest(error);

    }
  },

  authTokenApple: async (ctx) => {
    try {
      const { id_token, nonce } = ctx.request.query;

      if(!id_token) {
        return ctx.badRequest("id_token not found");
      }

      if(!nonce) {
        return ctx.badRequest("nonce not found");
      }

      const user = await loginApple(id_token, nonce);

      if(user) {
        return ctx.body = user;
      }

      ctx.badRequest("user not found");

    } catch (error) {
      return ctx.badRequest(error);
    }
  }
};
