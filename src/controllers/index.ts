import requireContext from '../utils/require-context';
import { Container } from 'inversify';
import { Interfaces, TYPE } from 'inversify-socket-utils';
import path from 'path';

export default (container: Container): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let modules: any;

    try {
        modules = require.context(
            '.',
            true,
            /^((?!index|base\.controller).)*\.(ts|js)$/
        );
    } catch (_) {
        // Incase 'require.context' is not available (test environment)
        modules = requireContext(
            path.resolve(__dirname, '.'),
            true,
            /^((?!index|base\.controller).)*\.(ts|js)$/
        );
    }

    modules.keys().forEach((key: string) => {
        const WS_CONTROLLER_METADATAKEY = 'inversify-socket-utils:controller';

        const module = modules(key);
        const moduleName = Object.keys(module)[0];
        const controller = module[moduleName];

        // We only need to manually register websocket controllers
        if (
            Reflect.getMetadataKeys(controller).includes(
                WS_CONTROLLER_METADATAKEY
            )
        ) {
            container
                .bind<Interfaces.Controller>(TYPE.Controller)
                .to(controller)
                .whenTargetNamed(moduleName);
        }
    });
};
