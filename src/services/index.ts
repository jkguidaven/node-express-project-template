import { Container } from 'inversify';
import requireContext from '../utils/require-context';
import path from 'path';

import camelCase from 'lodash/camelCase';

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

        // Get the module path as an array.
        const serviceName = fileName
            // Remove the "./" from the beginning.
            .replace(/^\.\//, '')
            // Remove the file extension from the end.
            .replace(/\.\w+$/, '')
            // Split nested modules into an array path.
            .split(/\//)
            // CamelCase all module namespaces and names.
            .map(camelCase);

        container
            .bind<typeof serviceDefinition>(serviceName[serviceName.length - 1])
            .to(serviceDefinition);
    });
};
