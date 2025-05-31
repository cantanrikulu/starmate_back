const Tarot = require("../models/tarot.model");

exports.createTarotCard = async (req) => {
  try {
    const { name, description, reversedDescription } = req.body;
    const existTarot = await Tarot.findOne({ name });
    if (existTarot) {
      throw new Error("Bu isimde tarot kartı mevcut");
    }
    const tarot = new Tarot({ name, description, reversedDescription });
    await tarot.save();
    return tarot;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteTarotCard = async (req) => {
  try {
    const { tarotId } = req.params;
    const existTarot = await Tarot.findById(tarotId);
    if (!existTarot) {
      throw new Error("Tarot kartı bulunamadı");
    }
    const tarot = await Tarot.findByIdAndDelete(tarotId);
    return "Kart Silindi";
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllTarotCards = async () => {
  try {
    return await Tarot.find();
  } catch (error) {
    throw new Error(error);
  }
};

exports.getTarotFortune = async (req) => {
  try {
    const { selectedCards } = req.body;
    // if (
    //   !selectedCards ||
    //   !Array.isArray(selectedCards) ||
    //   selectedCards.length !== 3
    // ) {
    //   throw new Error("3 adet kart seçmelisiniz");
    // } *validasyonda yapılacak*

    const cards = await Tarot.find({ name: { $in: selectedCards } });

    if (cards.length !== 3) {
      throw new Error("Seçilen kartlardan bazıları bulunamadı");
    }

    const result = cards.map((card) => ({
      name: card.name,
      description: card.description,
      reversedDescription: card.reversedDescription || null,
    }));

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
