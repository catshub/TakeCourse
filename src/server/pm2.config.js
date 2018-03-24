module.exports = {
  apps: [
    {
      name: 'takekcourse',
      script: `${__dirname}/server.js`,
      watch: true,
      env: {
        Origin: 'http://draven-system.xhuyq.me',
      },
    },
  ],
};
