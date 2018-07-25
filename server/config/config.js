var env = process.env.NODE_ENV || 'development';

if (env === "test" || env === "development") {

    var configData = require('./config.json');
    var envConfig = configData[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });

}