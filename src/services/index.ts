import { Container } from 'inversify';
import requireContext from '../utils/require-context';
import path from 'path';

export default (container: Container): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let modules: any;

    try {
        modules = require.context('.', true, /^((?!index).)*\.(ts|js)$/);
    } catch (_) {
        // Incase 'require.context' is not available (test environment)
        modules = requireContext(
            path.resolve(__dirname, '.'),
            true,
            /^((?!index).)*\.(ts|js)$/
        );
    }

    modules.keys().forEach((fileName: string) => {
        const serviceDefinition = modules(fileName).default;
        container
            .bind<typeof serviceDefinition>(serviceDefinition)
            .toSelf()
            .inSingletonScope();
    });
};
