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
    },
    {
        type: 'multiselect',
        name: 'methods',
        message: 'Included Http methods:',
        initial: [],
        choices: [
            {
                name: 'GET',
                message: 'GET'
            },
            {
                name: 'POST',
                message: 'POST'
            },
            {
                name: 'PUT',
                message: 'PUT'
            },
            {
                name: 'DELETE',
                message: 'DELETE'
            }
        ]
    }
];
