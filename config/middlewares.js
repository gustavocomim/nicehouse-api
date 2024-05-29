module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'script-src': ["'self'", "'unsafe-inline'"],
          'img-src': ["'self'", 'data:', 'strapi.io'],
          'frame-src': ["'self'", 'data:', 'lookerstudio.google.com'],
        },
      }
    },
  },
  {
    name: "strapi::body",
    config: {
      formLimit: "1024mb", // modify form body
      jsonLimit: "1024mb", // modify JSON body
      textLimit: "1024mb", // modify text body
      formidable: {
        maxFileSize: 1024 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  // 'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'global::redirector'
];
