'use strict';

module.exports = {
    text: {
        isLength: {
            options: {
                min: 2,
            },
        },
        isString: {
            errorMessage: {
                msg: '$ngx_type_string'
            },
        },
        optional: false,
        isEmpty: {
            negated: true
        }
    },
    status: {
        isLength: {
            options: {
                min: 1,
                max: 1,
            },
        },
        isString: {
            errorMessage: {
                msg: '$ngx_type_string'
            },
        },
        optional: false,
        isEmpty: {
            negated: true
        }
    }
};


