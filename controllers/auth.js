const jwt = require('jsonwebtoken')
const user = require('../model/user')

const googleAuth = async (req, res) => {

    try {
        const find = await user.findOne({ googleId: req.body.id })
        if (find) {
            const token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET);
            return  res.header("auth_token", token).send({token:token});
        }
        else {
            const createUser = new user({
                userName: req.body.name,
                googleId: req.body.id,
                email: req.body.email,

            })
            await createUser.save();
            const token = jwt.sign({ email: createUser.email }, process.env.TOKEN_SECRET);
            res.header("auth_token", token).send({token:token});
        }
    }
    catch (error) {
           res.status(400).send(error)
    }
}





module.exports.googleAuth = googleAuth;
