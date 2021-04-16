import path from 'path';
import requireContext from '../utils/require-context';
import { Container } from 'inversify';

// Load our middlewares to our container
export default (container: Container): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let modules: any;

    try {
        modules = require.context(
            '.',
            true,
            /^((?!index|base\.middleware).)*\.(ts|js)$/
        );
    } catch (_) {
        // Incase 'require.context' is not available (test environment)
        modules = requireContext(
            path.resolve(__dirname, '.'),
            true,
            /^((?!index|base\.middleware).)*\.(ts|js)$/
        );
    }

    modules.keys().forEach((fileName: string) => {
        const middlewareDefinition = modules(fileName).default;
        container
            .bind<typeof middlewareDefinition>(middlewareDefinition)
            .toSelf();
    });
};
