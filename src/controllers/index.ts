import requireContext from '../utils/require-context';
import path from 'path';

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

modules.keys().forEach((key: string) => modules(key));
