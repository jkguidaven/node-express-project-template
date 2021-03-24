const modules = require.context(
    // Search for files in the current directory.
    '.',
    // Search for files in subdirectories.
    true,
    // Include any .js or .ts files that are not this file and base.controller.
    /^((?!index|base\.controller).)*\.(ts|js)$/
);

modules.keys().forEach((key) => modules(key));
