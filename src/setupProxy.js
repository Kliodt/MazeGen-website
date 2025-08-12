const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware({
            target: 'http://localhost:8080',
            pathFilter: ['/graphql', '/auth', '/oauth2'],
            // changeOrigin: true, // почему-то меняет только Host (поэтому меняю все вручную)
            on: {
                proxyReq: (proxyReq, req, res) => {
                    proxyReq.setHeader('Origin', 'http://localhost:8080');
                    proxyReq.setHeader('Host', 'localhost:8080');
                }
            }
        })
    );

    // npm install http-proxy-middleware --save
};
