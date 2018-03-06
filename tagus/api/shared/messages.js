module.exports = {
    warning: {
        alreadyExists: item => {
            return `${item} already exists`;
        }
    },
    error: {
        whileFetching: item => {
            return `An error occurred while loading ${item}`;
        },
        whileCreating: item => {
            return `An error occurred while creating ${item}`;
        },
        whileCreating: item => {
            return `An error occurred while updating ${item}`;
        }
    },
    success: {
        created: item => {
            return `${item} was created with success`;
        },
        updated: item => {
            return `${item} was updated with success`;
        },
        deleted: item => {
            return `${item} was deleted with success`;
        }
    }
};