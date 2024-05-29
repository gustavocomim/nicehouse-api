module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000000000,
      },
    },
  },
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('MAIL_DEFAULT_FROM'),
        defaultReplyTo: env('MAIL_DEFAULT_REPLY_TO'),
      },
    },
  },
  'dashboard': {
    enabled: false,
    resolve: './src/plugins/dashboard'
  },
});