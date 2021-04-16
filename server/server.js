//NAME: server.js
//AUTH: Ryan McCartney <ryan.mccartney@bbc.co.uk>
//DATE: 16/04/2021
//DESC: OBS Ninja served here

const alias = require('module-alias/register');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const app = require('@server/app');
const logger = require('@server/utils/logger');

const port = process.env.PORT || 80;
const ishttps = false;//process.env.HTTPS || false;

if(ishttps){
    const privateKey  = fs.readFileSync(path.join(__dirname,'ssl','server.key'),'utf8');
    const certificate = fs.readFileSync(path.join(__dirname,'ssl','server.crt'),'utf8');
    const credentials = {key: privateKey, cert: certificate};
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port,() => {
        logger.info(`OBS Ninja (HTTPS) running on port ${port}`)
    });

}
else{
    const httpServer = http.createServer(app);
    httpServer.listen(port,() => {
        logger.info(`OBS Ninja (HTTP) running on port ${port}`)
    });

}