import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

import config from './config/app.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const debugLog: debug.IDebugger = debug('app');

// We load our static files from source directory
app.use(config.STATIC_BASE_URL, express.static(config.STATIC_SOURCE_DIR));

// here we are adding middleware to parse all incoming requests as JSON
app.use(bodyparser.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are configuring the expressWinston logging middleware,
// which will automatically log all HTTP requests handled by Express.js
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  })
);

app.get('/', (req, res) => {
  res.send('hello world');
});

server.listen(config.PORT, () => {
  debugLog(`Server running at http://localhost:${config.PORT}`);
});
