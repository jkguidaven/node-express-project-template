import prodConfig from './config/prod.config';
import devConfig from './config/dev.config';

const config: AppConfig =
    process.env.environment === 'production' ? prodConfig : devConfig;

import runApp from './src/app';
import AppConfig from './config/app.config';

// run our app using our config file
export default runApp(config);
