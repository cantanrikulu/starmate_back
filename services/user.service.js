const User = require("../models/user.model");
const Blog = require("../models/blog.model");
const Zodiac = require("../models/zodiac.model");
const Relationship = require("../models/relationship.model");
const { sendBotMessage } = require("./telegram.service");
const utils = require("../utils/index");
const fileService = require("./file.service");

exports.register = async (req) => {
  try {
    const { name, surname, email, password, birthDate, gender } = req.body;
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      throw new Error("Bu email zaten kulllanımda");
    }
    const _password = utils.helper.hashToPassword(password);

    const birth = new Date(birthDate);
    const zodiacSign = utils.helper.zodiacSign(
      birth.getDate(),
      birth.getMonth() + 1
    );

    const user = new User({
      name,
      surname,
      email,
      password: _password,
      birthDate,
      gender,
      zodiacSign: zodiacSign,
    });
    await user.save();
    const token = utils.helper.createToken(user._id, user.name);

    const totalUsers = await User.countDocuments(); //xx
    await sendBotMessage(
      `🟢 Yeni kullanıcı kaydı:\n👤 ${name} ${surname}\n📧 ${email}\n♑ Burç: ${zodiacSign}\n👥 Toplam kullanıcı: ${totalUsers}`
    );

    return { user, token };
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = async (req) => {
  try {
    const { email, password } = req.body;
    const _password = utils.helper.hashToPassword(password);
    const user = await User.findOne({ email: email, password: _password });
    if (!user) {
      throw new Error("Kullanıcı bilgileri yanlış!");
    }
    const token = utils.helper.createToken(user._id, user.name);
    return { user, token };
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateUser = async (req) => {
  try {
    const { userId } = req.params;
    const { name, surname } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: name, surname: surname },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

exports.changePassword = async (req) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body;
    const existUser = await User.findById(id);
    if (!existUser) {
      throw new Error("Kullanıcı bulunamadı");
    }
    const _password = utils.helper.hashToPassword(password);
    const _newPassword = utils.helper.hashToPassword(newPassword);
    if (existUser.password === _password) {
      existUser.password = _newPassword;
      await existUser.save();
      return existUser;
    } else {
      throw new Error("Şifre yanlış");
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserLikedBlogs = async (req) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw new Error("Kullanıcı bulunamadı");

    //user.likedBlogs promiseAll ile blog modelden verileri getirilip return edilebilir

    //     const blogs = await Promise.all(
    //   user.likedBlogs.map(blogId => Blog.findById(blogId))
    // );
    const blogs = await Blog.find({ _id: { $in: user.likedBlogs } });
    return blogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUserLikedByZodiacs = async (req) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw new Error("Kullanıcı bulunamadı");

    const zodiacs = await Zodiac.find({ _id: { $in: user.likedZodiacs } });
    return zodiacs;
  } catch (error) {
    throw new error(error);
  }
};

exports.getUserLikedByRelationships = async (req) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw new Error("Kullanıcı bulunamadı");

    const relationships = await Relationship.find({
      _id: { $in: user.likedRelationships },
    });
    return relationships;
  } catch (error) {
    throw new error(error);
  }
};

exports.deleteUser = async (req) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    const deleteUser = await User.findByIdAndDelete(userId);
    await sendBotMessage(
      `❌ Kullanıcı silindi: ${deleteUser.name} ${deleteUser.surname} (${deleteUser.email})Toplam kullanıcı: ${totalUsers}`
    ); 

    return "Kullanıcı başarılı şekilde silindi";
  } catch (error) {
    throw new Error(error);
  }
};

exports.uploadProfilePhoto = async (req, res) => {  
  try {  
    const { userId } = req.params;  
    const user = await User.findById(userId);  
    if (!user) {  
      throw new Error("Kullanıcı bulunamadı");  
    }  
    const imageUrl = await fileService.uploadImage(req, res);  
    const updatedUser = await User.findByIdAndUpdate(  
      userId,  
      { avatar: imageUrl },  
      { new: true }  
    );  
    return updatedUser;  
  } catch (error) {  
    throw new Error(error);  
  }  
};  