const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
};

// Alt method
// To allow JS & Express servers to work together, in client's package.json file:
//   "proxy": {
//    "/auth/google": {
//      "target": "http://localhost:5000"
//    }
//  }
