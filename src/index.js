const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const config = require('./common/configManager');
const logger = require('./common/logger');
const orm = require('./common/orm');

const app = express();

const server = http.createServer(app);
const port = config.get('PORT', 'server.port', 3000);
const corsOptions = {
    origin: [ config.get('CORS_ORIGIN', 'server.cors')],
    methods: [
        'GET',
        'PUT',
        'POST',
        'DELETE',
    ],
    credentials: true
};

app.use(morgan(logger.format, {'stream': logger.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOptions));
app.use(cookieParser());

require('./common/tokenManager')(app);
require('./common/headerManager')(app);

// basic
require('./controllers/home-controller')(app);
require('./controllers/code-controller')(app);

// administration
require('./controllers/administration/client-controller')(app);
require('./controllers/administration/website-controller')(app);
require('./controllers/administration/validation-controller')(app);

// Dashboard

orm.initConnection();
server.listen(port);
logger.info(`App started on port ${port}`);
