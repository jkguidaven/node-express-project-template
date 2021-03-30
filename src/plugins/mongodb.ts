import mongoose from 'mongoose';
import debuglog from '../utils/debug';

export default async (
    uri: string,
    options: mongoose.ConnectOptions
): Promise<void> => {
    await mongoose.connect(uri, options || {}, (err) => {
        if (err) {
            debuglog(err);
        }
    });
};
