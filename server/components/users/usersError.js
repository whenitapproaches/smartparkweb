const UserError = function(status, message) {
    return {
        status: status,
        message: message
    }
}

module.exports = UserError