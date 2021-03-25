import prodConfig from './config/prod.config';
import devConfig from './config/dev.config';
import debugLog from './src/utils/debug';

const config: AppConfig =
    process.env.environment === 'production' ? prodConfig : devConfig;

import initialize from './src/app';
import AppConfig from './config/app.config';

// Initialize our app using our config file
const app = initialize(config);

const server = app.listen(config.PORT, () => {
    debugLog(`Server running at http://localhost:${config.PORT}`);
});

export default server;