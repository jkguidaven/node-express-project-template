module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Controller Name:',
        validate(value) {
            if (!value.length) {
                return 'controller must have a name.';
            }

            return true;
        }
    }
];
