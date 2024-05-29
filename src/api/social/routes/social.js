module.exports = {
  routes: [
    {
      "method": "GET",
      "path": "/auth/token-facebook",
      "handler": "social.authTokenFacebook",
      "config": {
        "policies": []
      }
    },
    {
      "method": "GET",
      "path": "/auth/token-google",
      "handler": "social.authTokenGoogle",
      "config": {
        "policies": []
      }
    },
    {
      "method": "GET",
      "path": "/auth/bearer-google",
      "handler": "social.bearerTokenGoogle",
      "config": {
        "policies": []
      }
    },
    {
      "method": "GET",
      "path": "/auth/token-apple",
      "handler": "social.authTokenApple",
      "config": {
        "policies": []
      }
    }
  ]
};
