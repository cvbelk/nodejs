//middleware used after request to check if user is authorized, authorization in req.header
const jwt = require('jsonwebtoken');
const ModelUser = require('../models/user');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const user = await ModelUser.findOne({ 
            _id: decoded._id,
            'tokens.token': token  
        });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user; // storing logged for further requests 
        next();
    } catch(e) {
        res.status(401).send({error: "Please, authenticate"});
    }
} 
module.exports = auth;
//Without middleware: new request -> run route handle
//with middleware: new request -> do middleware -> run route hanle 
//'tokens.token'
//That's a special syntax in Mongoose for accessing a property on an array of objects. 
//So you could use tokens.token to say "look for an object in the tokens array and check it's token property against this value".