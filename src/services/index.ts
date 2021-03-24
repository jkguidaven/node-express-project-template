import { Container } from 'inversify';

import camelCase from 'lodash/camelCase';

export default (container: Container): void => {
    const modules = require.context(
        // Search for files in the current directory.
        '.',
        // Search for files in subdirectories.
        true,
        // Include any .js or .ts files that are not this file.
        /^((?!index).)*\.(ts|js)$/
    );

    modules.keys().forEach((fileName) => {
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
            .map(camelCase)[0];

        container
            .bind<typeof serviceDefinition>(serviceName)
            .to(serviceDefinition);
    });
};
