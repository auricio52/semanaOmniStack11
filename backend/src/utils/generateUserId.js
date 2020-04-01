const crypto = require('crypto')

module.exports = function generateUserId() {
    return crypto.randomBytes(4).toString('HEX') // Gera um id aleatório para as ongs
} 