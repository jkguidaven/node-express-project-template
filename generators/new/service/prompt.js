module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Service Name:',
        validate(value) {
            if (!value.length) {
                return 'service must have a name.';
            }

            return true;
        }
    }
];
