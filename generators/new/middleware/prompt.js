module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Middleware Name:',
        validate(value) {
            if (!value.length) {
                return 'Middleware must have a name.';
            }

            return true;
        }
    }
];
