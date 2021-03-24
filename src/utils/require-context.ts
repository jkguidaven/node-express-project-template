import fs from 'fs';
import path from 'path';

/*
 * we will need this helper function to allow app to properly test the
 * app without webpack's 'require.context'
 */
export default (
    base: string,
    scanSubDirectories: boolean,
    regularExpression: RegExp
): {
    (file: string): string;
    keys(): string[];
} => {
    const files: { [path: string]: boolean } = {};

    const readDirectory = (directory: string): void => {
        fs.readdirSync(directory).forEach((file: string) => {
            const fullPath = path.resolve(directory, file);

            if (fs.statSync(fullPath).isDirectory()) {
                if (scanSubDirectories) readDirectory(fullPath);

                return;
            }

            if (!regularExpression.test(fullPath)) return;

            files[fullPath] = true;
        });
    };

    readDirectory(path.resolve(__dirname, base));

    const Module = (file: string) => {
        return require(file);
    };

    Module.keys = () => Object.keys(files);

    return Module;
};
