const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'azdfgnkl180#*mpoijhbvftgnjgfderfg180#*çsdq$q';
module.exports = {
    generateTokenForUser: function (userdata) {
        return jwt.sign({
            idUser: userdata.id,
            role: userdata.role
        },
            JWT_SIGN_SECRET
            , { expiresIn: '2h' })
    },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function (authorization) {
        var idUser = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    idUser = jwtToken.idUser;
            } catch (err) {

            }
        }
        return idUser;
    },
    getUserRole: function (authorization) {
        var role = 'visitor';
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    role = jwtToken.role;
            } catch (err) {

            }
        }
        return role;
    }
}