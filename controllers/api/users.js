let User = require('../../models/user')
let jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports = {
    create,
    login,
    checkToken
}



async function create(req, res) {
    try {
        // Add the user to the database
        const user = await User.create(req.body)
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
         // Client will check for non-2xx status code
         // 400 = Bad request 
         res.status(400).json(err)
    }
}  


async function login(req, res) {
    try {
        const user = await User.findOne({'email': req.body.email})
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error();
        const token = createJWT(user);
        res.json(token)
    } catch {
        res.status(400).json('Bad Credentials')
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}


// Helper Functions

function createJWT(user) {
    return jwt.sign(
        // extra data for the payload
        { user },
        process.env.SECRET,
        {expiresIn: '24h'}
    );
    
}