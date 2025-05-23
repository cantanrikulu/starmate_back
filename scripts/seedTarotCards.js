require("dotenv").config();
const mongoose = require("mongoose");
const Tarot = require("../models/tarot.model");

const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

const cards = [
  {
    name: "The Fool",
    description: "Yeni başlangıçlar, saf niyet, macera, özgürlük.",
    reversedDescription:
      "Düşüncesizlik, riskler, uyarıların göz ardı edilmesi.",
  },
  {
    name: "The Magician",
    description: "Yaratıcılık, güç, odaklanma, beceri.",
    reversedDescription: "Manipülasyon, aldatma, yetenek eksikliği.",
  },
  {
    name: "The High Priestess",
    description: "Sezgi, bilinçaltı, gizem, bilgelik.",
    reversedDescription:
      "Gizli bilgiler, kafa karışıklığı, içsel sesin göz ardı edilmesi.",
  },
  {
    name: "The Empress",
    description: "Bereket, doğurganlık, doğa, annelik.",
    reversedDescription: "Aşırı koruma, bağımlılık, yaratıcılık blokajı.",
  },
  {
    name: "The Emperor",
    description: "Otorite, yapı, kontrol, liderlik.",
    reversedDescription: "Tiranlık, kontrolsüzlük, kural dışılık.",
  },
  {
    name: "The Hierophant",
    description: "Gelenek, öğretim, maneviyat, bilgi.",
    reversedDescription: "Ayak direme, isyan, sınırların dışına çıkma.",
  },
  {
    name: "The Lovers",
    description: "Aşk, birliktelik, seçim, uyum.",
    reversedDescription: "Çatışma, dengesizlik, yanlış kararlar.",
  },
  {
    name: "The Chariot",
    description: "Zafer, irade, başarı, kararlılık.",
    reversedDescription: "Kontrol kaybı, yönsüzlük, hırs.",
  },
  {
    name: "Strength",
    description: "Cesaret, sabır, güç, şefkat.",
    reversedDescription: "Zayıflık, korku, sabırsızlık.",
  },
  {
    name: "The Hermit",
    description: "İçe dönüş, yalnızlık, arayış, bilgelik.",
    reversedDescription: "Yalıtılmışlık, yalnızlık korkusu, içe kapanma.",
  },

  {
    name: "Wheel of Fortune",
    description: "Kader, değişim, döngüler, şans.",
    reversedDescription:
      "Şanssızlık, kontrol kaybı, beklenmedik değişiklikler.",
  },
  {
    name: "Justice",
    description: "Adalet, denge, doğruluk, kararlar.",
    reversedDescription: "Haksızlık, yanlılık, adaletsizlik.",
  },
  {
    name: "The Hanged Man",
    description: "Fedakarlık, bekleyiş, perspektif değişikliği.",
    reversedDescription: "İnatçılık, değişime direnç, tıkanıklık.",
  },
  {
    name: "Death",
    description: "Dönüşüm, sonlar, yenilenme, değişim.",
    reversedDescription: "Direnç, korku, değişime karşı durma.",
  },
  {
    name: "Temperance",
    description: "Ölçülülük, denge, sabır, uyum.",
    reversedDescription: "Aşırılık, dengesizlik, sabırsızlık.",
  },
  {
    name: "The Devil",
    description: "Bağımlılık, materyalizm, tuzaklar, korkular.",
    reversedDescription: "Kurtulma, özgürleşme, farkındalık.",
  },
  {
    name: "The Tower",
    description: "Yıkım, ani değişiklik, uyanış, kriz.",
    reversedDescription: "Felaketin ertelenmesi, direnç, korku.",
  },
  {
    name: "The Star",
    description: "Umut, ilham, huzur, yenilenme.",
    reversedDescription: "Umutsuzluk, hayal kırıklığı, inançsızlık.",
  },
  {
    name: "The Moon",
    description: "İllüzyonlar, bilinçaltı, rüyalar, gizem.",
    reversedDescription: "Korkuların üstesinden gelme, aydınlanma.",
  },
  {
    name: "The Sun",
    description: "Başarı, mutluluk, canlılık, neşe.",
    reversedDescription: "Karmaşa, hayal kırıklığı, geçici sorunlar.",
  },
  {
    name: "Judgement",
    description: "Kendini yargılama, uyanış, yeniden doğuş.",
    reversedDescription: "Kendini affedememe, pişmanlık, gecikme.",
  },
  {
    name: "The World",
    description: "Tamamlama, başarı, bütünlük, seyahat.",
    reversedDescription: "Eksiklik, gecikme, tamamlanmamış işler.",
  },
  {
    name: "Ace of Cups",
    description: "Yeni duygular, aşkın başlangıcı, yaratıcılık.",
    reversedDescription: "Duygusal tıkanıklık, reddedilme.",
  },
  {
    name: "Two of Cups",
    description: "Ortaklık, uyum, aşk, dostluk.",
    reversedDescription: "Uyumsuzluk, kopukluk, anlaşmazlık.",
  },
  {
    name: "Three of Cups",
    description: "Kutlama, dostluk, destek, topluluk.",
    reversedDescription: "Aşırı kutlama, dedikodu, kopukluk.",
  },
  {
    name: "Four of Cups",
    description: "Düşünme, memnuniyetsizlik, fırsatları görmeme.",
    reversedDescription: "Yeni fırsatlar, farkındalık, harekete geçme.",
  },
  {
    name: "Five of Cups",
    description: "Kayıp, üzüntü, pişmanlık, yas.",
    reversedDescription: "Kabul, iyileşme, ileriye bakma.",
  },
  {
    name: "Six of Cups",
    description: "Geçmiş, nostalji, masumiyet, hatıralar.",
    reversedDescription: "Geçmişten kurtulma, büyüme.",
  },
  {
    name: "Seven of Cups",
    description: "Hayaller, seçenekler, kararsızlık, hayal kırıklığı.",
    reversedDescription: "Odaklanma, gerçekçilik, karar verme.",
  },
  {
    name: "Eight of Cups",
    description: "Bırakma, yolculuk, arayış, terk etme.",
    reversedDescription: "Korku, kaçma, ilerleyememe.",
  },
  {
    name: "Nine of Cups",
    description: "Dileklerin gerçekleşmesi, tatmin, mutluluk.",
    reversedDescription: "Doyumsuzluk, hayal kırıklığı, fazlalık.",
  },
  {
    name: "Ten of Cups",
    description: "Aile mutluluğu, uyum, barış, tatmin.",
    reversedDescription: "Aile sorunları, uyumsuzluk, hayal kırıklığı.",
  },
  {
    name: "Page of Cups",
    description: "Yeni duygular, haberler, hayal gücü, yaratıcı başlangıçlar.",
    reversedDescription: "Duygusal blokaj, hayal kırıklığı, olgunlaşmamışlık.",
  },
  {
    name: "Knight of Cups",
    description: "Romantizm, teklif, idealizm, macera.",
    reversedDescription: "Yanıltıcı teklifler, abartı, tutarsızlık.",
  },
  {
    name: "Queen of Cups",
    description: "Sevgi, şefkat, sezgi, duygusal denge.",
    reversedDescription: "Duygusal kararsızlık, manipülasyon, aşırı koruma.",
  },
  {
    name: "King of Cups",
    description: "Duygusal olgunluk, denge, anlayış, destek.",
    reversedDescription:
      "Duygusal dengesizlik, manipülasyon, bastırılmış duygular.",
  },
  {
    name: "Ace of Pentacles",
    description: "Yeni maddi fırsatlar, bolluk, başlangıçlar.",
    reversedDescription: "Kaçırılan fırsatlar, maddi kayıplar.",
  },
  {
    name: "Two of Pentacles",
    description: "Denge, uyum, çoklu görevler, esneklik.",
    reversedDescription: "Dengesizlik, stres, aşırı yüklenme.",
  },
  {
    name: "Three of Pentacles",
    description: "Takım çalışması, beceri, başarı, planlama.",
    reversedDescription: "Uyumsuzluk, yetersizlik, başarısızlık.",
  },
  {
    name: "Four of Pentacles",
    description: "Maddi güvenlik, tutuculuk, tasarruf.",
    reversedDescription: "Açgözlülük, kıskançlık, maddi kayıplar.",
  },
  {
    name: "Four of Cups",
    description: "Durgunluk, memnuniyetsizlik, fırsatları kaçırma.",
    reversedDescription: "Yeni fırsatlara açık olma, yeniden canlanma.",
  },
  {
    name: "Five of Cups",
    description: "Kayıp, pişmanlık, üzüntü.",
    reversedDescription: "Kabul, iyileşme, ileriye bakma.",
  },
  {
    name: "Six of Cups",
    description: "Nostalji, çocukluk anıları, saflık.",
    reversedDescription: "Geçmişten kopamama, takıntı.",
  },
  {
    name: "Seven of Cups",
    description: "Hayaller, seçenekler, hayal gücü.",
    reversedDescription: "Gerçeklikten kaçış, kararsızlık.",
  },
  {
    name: "Eight of Cups",
    description: "Vazgeçme, yolculuk, yeni başlangıçlar.",
    reversedDescription: "Kaçış, takıntı, gelişime direnç.",
  },
  {
    name: "Nine of Cups",
    description: "Dileklerin gerçekleşmesi, tatmin, mutluluk.",
    reversedDescription: "Doyumsuzluk, hayal kırıklığı, fazlalık.",
  },
  {
    name: "Ten of Cups",
    description: "Aile mutluluğu, uyum, barış, tatmin.",
    reversedDescription: "Aile sorunları, uyumsuzluk, hayal kırıklığı.",
  },
  {
    name: "Page of Cups",
    description: "Yeni duygular, haberler, hayal gücü, yaratıcı başlangıçlar.",
    reversedDescription: "Duygusal blokaj, hayal kırıklığı, olgunlaşmamışlık.",
  },
  {
    name: "Knight of Cups",
    description: "Romantizm, teklif, idealizm, macera.",
    reversedDescription: "Yanıltıcı teklifler, abartı, tutarsızlık.",
  },
  {
    name: "Queen of Cups",
    description: "Sevgi, şefkat, sezgi, duygusal denge.",
    reversedDescription: "Duygusal kararsızlık, manipülasyon, aşırı koruma.",
  },
];

async function seed() {
  try {
    await mongoose.connect(`${DB_URI}${DB_NAME}`, {
      serverSelectionTimeoutMS: process.env.CONNECTIONTIMEOUTMS || 5000,
    });
    await Tarot.deleteMany({});
    await Tarot.insertMany(cards);
    console.log("Tarot kartları başarıyla yüklendi!");
  } catch (err) {
    console.error("Hata oluştu:", err);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
}

seed();
