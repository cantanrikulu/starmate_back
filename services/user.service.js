const User = require("../models/user.model");
const utils = require("../utils/index");

exports.register = async (req) => {
try {
    const {name,surname,email,password,birthDate,gender} = req.body;
    const existUser = await User.findOne({email:email})
    if (existUser) {
        throw new Error("Bu email zaten kulllanımda");
    };
    const _password = utils.helper.hashToPassword(password)

    const user = new User ({
        name,
        surname,
        email,
        password:_password,
        birthDate,
        gender,
    });
    await user.save();
     

} catch (error) {
    throw new Error(error);
}
};
