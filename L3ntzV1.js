const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const settings = require('./settings');
const bot = new TelegramBot(settings.botToken, { polling: true });

/// Menu Start
let userIds = [];

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const videonya = './image/menux.gif';
  const usernames = msg.from.username;
  const caption = `Hi Bray @${usernames}, Click /menu to learn more about how yo use this bot`;

    
    if (!userIds.includes(chatId)) {
        userIds.push(chatId);
        }

  bot.sendVideo(chatId, videonya, {
  caption: caption,
  reply_markup: {
  inline_keyboard: [
  
  [{text: 'Youtube', url: 'https://youtube.com/@Excollent755'},
  {text: 'Channel Whatsapp', url: 'https://whatsapp.com/channel/0029VaVKXktFMqrOe8UZVm3h'}],
  [{text: 'Telegram', url: 'https://t.me/XxwyXrcix994'}]
    ]
   }
 });
});

bot.onText(/\/menu/, async (msg) => {
  const chatId = msg.chat.id;
  const video = './image/lentz.mp4';
  const usernames = msg.from.username;
  const caption = `╾────( INFO MENU )────╼

                ❝𝙶𝚁𝙾𝚄𝙿 𝙼𝙴𝙽𝚄❞
    ╭────────────────╼
    ║▢ ➠/antilink
    ║▢ ➠/getlinkgrup
    ║▢ ➠/infogc
    ║▢ ➠/msg_hiden
    ║▢ ➠/on_caracterlimit
    ║▢ ➠/off_caracterlimit
    ╰────────────────╼

                  ❝𝙰𝙻𝙻 𝙼𝙴𝙽𝚄❞
    ╭────────────────╼
    ║▢ ➠/tinyurl
    ║▢ ➠/infokip
    ║▢ ➠/gempa
    ║▢ ➠/cekkodam
    ║▢ ➠/myinfo
    ╰────────────────╼

        ❝𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙼𝙰𝙻𝚆𝙰𝚁𝙴❞
   ╭────────────────╼
   ║▢ ➠/ransomware
   ║▢ ➠/simple_trojan
   ║▢ ➠/trojan2
   ╰────────────────╼`;
  
  bot.sendVideo(chatId, video, {
  caption: caption,
  reply_markup: {
  inline_keyboard: [
  
  [{text: 'Youtube', url: 'https://youtube.com/@Excollent755'},
  {text: 'Channel Whatsapp', url: 'https://whatsapp.com/channel/0029VaVKXktFMqrOe8UZVm3h'}],
  [{text: 'Telegram', url: 'https://t.me/XxwyXrcix994'}]
    ]
   }
 });
});

const tinyurlApiToken = settings.tinyurl;

async function shortenURL(url) {
    try {
        const response = await axios.post('https://api.tinyurl.com/create', {
            url: url
        }, {
            headers: {
                'Authorization': `Bearer ${tinyurlApiToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data.tiny_url;
    } catch (error) {
        console.error(error);
        return 'Terjadi kesalahan saat mempersingkat URL lapor @Undernx';
    }
}

bot.onText(/\/tinyurl (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1].trim();

    if (url) {
        const shortUrl = await shortenURL(url);
        bot.sendMessage(chatId, `Shortened URL: ${shortUrl}`);
    } else {
        bot.sendMessage(chatId, 'Silakan kirim URL yang valid untuk dipersingkat.');
    }
});

bot.onText(/\/tinyurl$/, async (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'cara menggunakan perintah ini: /tinyurl <url>')
})

bot.onText(/\/myinfo/, async (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;
  const languageCode = msg.from.language_code;
  
  const message = `
*Username*: @${user.username || 'tidak ada username'}
*User ID*: \`${user.id}\`
*Nama Akun*: [${user.first_name} ${user.last_name || ''}](https://t.me/${user.username})
*Language*: ${languageCode}
`;

  try {
    const userPhotos = await bot.getUserProfilePhotos(user.id);
    if (userPhotos.total_count > 0) {
      const fileId = userPhotos.photos[0][0].file_id;

      bot.sendPhoto(chatId, fileId, {
        caption: message,
        parse_mode: 'Markdown',
        reply_markup: {
         inline_keyboard: [
        [{ text: 'OWNER 1', url: 'https://t.me/L_D_S_E' },
        { text: 'OWNER 2', url: 'https://t.me/XxwyXrcix994' }],
        [{ text: 'OWNER 3', url: 'https://instagram.com/@Excollent_404' }],
                       ]
                     }
                   });
                  
    } else {
    
  const chatId = msg.chat.id;
  const user = msg.from;
    bot.sendMessage(chatId, `
*Username*: @${user.username || 'tidak ada username'}
*User ID*: ``${user.id}``
*Language*: ${languageCode}
*Nama Akun*: [${user.first_name} ${user.last_name || ''}](https://t.me/${user.username})`, {parse_mode:'Markdown'});
    }
  } catch (error) {
    console.error("bug bro, cek eror nya nih:", error);
    bot.sendMessage(chatId, "Pasang Poto Profil / Pp Telegram Lu Untuk Melihat Info Akun Mu");
  }
});


/// Khusus Admin Saja Yang Bisa bc / Broadcast
bot.onText(/\/bc (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1]; // Ambil pesan yang akan disiarkan

    // Hanya izinkan administrator untuk menyiarkan
    if (chatId === 6045881406) {
        broadcastMessage(message);
        bot.sendMessage(chatId, 'Pesan siaran telah dikirim.');
    } else {
        bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk melakukan siaran.');
    }
});

// Fungsi untuk menyiarkan pesan
function broadcastMessage(message) {
    userIds.forEach((userId) => {
        bot.sendMessage(userId, message)
            .catch((error) => {
                console.error(`Gagal mengirim pesan ke ${userId}:`, error.message);
            });
    });
}

bot.onText(/\/infoip (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const usernames = msg.from.username
    const ip = match[1];
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        const data = response.data;

const message = `<blockquote>
query: ${data.query}
status: ${data.status}
country: ${data.country}
countryCode: ${data.countryCode}
region: ${data.region}
regionName: ${data.regionName}
city: ${data.city}
zip: ${data.zip}
lat: ${data.lat}
lon: ${data.lon}
timezone: ${data.timezone}
isp: ${data.isp}
org: ${data.org}
as: ${data.as}

📝 note: please do not misuse this boat, if this boat is wrong using the owner of this boat will not. responsible!! 
        </blockquote>`;
        bot.sendMessage(chatId, message, {parse_mode:'HTML'});
    } catch (error) {
        bot.sendMessage(chatId, "eror jir kaowkwoak");
    }
});

bot.onText(/\/infoip$/, async (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'cara menggunakan perintah ini: /infoip <ip>')
})

const antiLinkStatus = new Map()

bot.onText(/\/ubahnamagc (.+)/, async (msg, match) => {
    const chatId = msg.chat.id
    const senderId = msg.from.id
    const newName = match[1]

    if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') {
        return bot.sendMessage(chatId, 'perintah ini hanya bisa digunakan di grup.')
    }

    const chatMember = await bot.getChatMember(chatId, senderId)
    if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
        try {
            await bot.setChatTitle(chatId, newName)
            bot.sendMessage(chatId, `nama grup berhasil diubah menjadi "${newName}".`)
        } catch (error) {
            bot.sendMessage(chatId, `gagal mengubah nama grup: ${error.message}`)
        }
    } else {
        bot.sendMessage(chatId, 'hanya admin yang bisa menggunakan perintah ini.')
    }
})

bot.onText(/\/ubahnamagc$/, async (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'cara menggunakan perintah ini: .ubahnamagc <nama_grup_baru>')
})

bot.onText(/\/antilink (on|off)/, async (msg, match) => {
    const chatId = msg.chat.id
    const senderId = msg.from.id
    const status = match[1]

    if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') {
        return bot.sendMessage(chatId, 'perintah ini hanya bisa digunakan di grup.')
    }

    const chatMember = await bot.getChatMember(chatId, senderId)
    if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
        if (status === 'on') {
            antiLinkStatus.set(chatId, true)
            bot.sendMessage(chatId, 'anti-link diaktifkan.')
        } else {
            antiLinkStatus.delete(chatId)
            bot.sendMessage(chatId, 'anti-link dinonaktifkan.')
        }
    } else {
        bot.sendMessage(chatId, 'hanya admin dan owner yang bisa menggunakan perintah ini.')
    }
})

bot.onText(/\/antilink$/, async (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'cara menggunakan perintah ini: .antilink (on|off)')
})

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const senderId = msg.from.id

    if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return

    if (antiLinkStatus.get(chatId)) {
        const chatMember = await bot.getChatMember(chatId, senderId)
        if (!['administrator', 'creator'].includes(chatMember.status)) {
            if (/https?:\/\/|t.me\./i.test(msg.text)) {
                bot.deleteMessage(chatId, msg.message_id)
            }
        }
    }
})

bot.onText(/\/getlinkgrup/, async (msg) => {
    const chatId = msg.chat.id
    const senderId = msg.from.id

    if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') {
        return bot.sendMessage(chatId, 'perintah ini hanya bisa digunakan di grup.')
    }

    const chatMember = await bot.getChatMember(chatId, senderId)
    if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
        try {
            const inviteLink = await bot.exportChatInviteLink(chatId)
            bot.sendMessage(chatId, `link grup: ${inviteLink}`)
        } catch (error) {
            bot.sendMessage(chatId, `gagal mengambil link grup: ${error.message}`)
        }
    } else {
        bot.sendMessage(chatId, 'hanya admin yang bisa menggunakan perintah ini.')
    }
})

bot.onText(/\/msg_hiden (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const text = match[1].trim();
    const userName = msg.from.username || msg.from.first_name;

    if (!text) {
        return bot.sendMessage(chatId, "Silakan masukkan teks setelah perintah /msg_hiden.");
    }

    // Ubah teks menjadi spoiler
    const spoilerText = `||${text}||`;

    bot.sendMessage(chatId, `${spoilerText}\n\n_Dijalankan oleh ${userName}_`, {
        parse_mode: 'MarkdownV2',
        reply_to_message_id: msg.message_id
    }).then(() => {
    
        bot.deleteMessage(chatId, msg.message_id).catch(err => {
            console.error("Gagal menghapus pesan pengguna:", err);
        });
    }).catch(error => {
        console.error("Gagal mengirim pesan spoiler:", error);
        bot.sendMessage(chatId, "Terjadi kesalahan saat mengirim pesan spoiler.");
    });
});

bot.onText(/\/infogc/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const chat = await bot.getChat(chatId);
    const memberCount = await bot.getChatMembersCount(chatId);
    const onlineCount = await bot.getChatAdministrators(chatId);
    const groupName = chat.title;

    const onlineCountEstimate = onlineCount.length;

    const caption = `
    Nama Group: ${groupName}
    Jumlah Anggota: ${memberCount}
    Jumlah Online: ${onlineCountEstimate}
    `;

   const imageUrl = settings.imageurl;
    await bot.sendPhoto(chatId, imageUrl, { caption: caption });

    bot.sendMessage(chatId, "\n");

  } catch (error) {
    console.error('Error saat mengambil informasi grup:', error);
    bot.sendMessage(chatId, 'Terjadi kesalahan saat mengambil informasi grup.');
  }
});

const defaultProfilePicture = './image/menux.gif';
const welcomeMessage = 'Welcomr To My Grup Bro Semoga Betah yah🙏😁';
const goodbyeMessage = 'selamat tinggal bro jangan balik lagi yak🗿😹';

bot.on('new_chat_members', async (msg) => {
    if (!['group', 'supergroup'].includes(msg.chat.type)) return;
    const chatId = msg.chat.id;
    const newMembers = msg.new_chat_members;
    for (const member of newMembers) {
        const photoUrl = defaultProfilePicture;
        bot.sendPhoto(chatId, photoUrl, { caption: welcomeMessage});
    }
});

bot.on('left_chat_member', async (msg) => {
    if (!['group', 'supergroup'].includes(msg.chat.type)) return;
    const chatId = msg.chat.id;
    const leftMember = msg.left_chat_member;
    const photoUrl = defaultProfilePicture;
    bot.sendPhoto(chatId, photoUrl, { caption: goodbyeMessage});
});

bot.onText(/\/gempa/, async (msg) => {
    try {      
    const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
      const SandyDataGempa = response.data.Infogempa.gempa;      
      const message = `<blockquote>╭─ •  「 *Info Gempa Terkini* 」\n│  ◦ *Magnitude*: ${SandyDataGempa.Magnitude}\n│  ◦ *Kedalaman*: ${SandyDataGempa.Kedalaman}\n│  ◦ *Koordinat*: ${SandyDataGempa.Coordinates}, ${SandyDataGempa.Bujur}, ${SandyDataGempa.Lintang}\n│  ◦ *Waktu*: ${SandyDataGempa.Tanggal}, ${SandyDataGempa.Jam}\n│  ◦ *Lokasi*: ${SandyDataGempa.Wilayah}\n│  ◦ *Potensi*: ${SandyDataGempa.Potensi}\n│  ◦ *Dirasakan*: ${SandyDataGempa.Dirasakan}\n╰──── •</blockquote>`;  
      
              
      bot.sendChatAction(msg.chat.id, 'upload_photo');
      
      bot.sendPhoto(msg.chat.id, `https://data.bmkg.go.id/DataMKG/TEWS/${SandyDataGempa.Shakemap}`,
       { caption: message, parse_mode: 'HTML', reply_to_message_id:  msg.message_id });   
       
         } catch (error) {
      console.error(error);      bot.sendMessage(msg.chat.id, 'Maaf, terjadi kesalahan saat mengambil data gempa bumi.');
    } 
  });
  
  const kodams = [
    "Ambatukan", "Jawir", "Ambaruwo", "Masrusdi", "Mas Fais", 
    "Kakangku", "Bundah Rahma", "Jarjit", "Roblox", "Skibidi Toilet", 
    "Kaicenat", "Fanum Tax", "King Riblox", "Skibidi Riz", "Komeng", 
    "Mas Narji", "Fladimir Putin", "Fufufafa", "Ronaldo", "Mesi", 
    "Neymar", "Mbape", "Katak Bizer", "Pelé", "Maradona", 
    "Johan Cruyff", "George Best", "MarkZukerberek", "Lu cinta Luna", 
    "Kiboy", "Baloy", "Kobokanaeru", "Naruto", "Sasuke", 
    "Itachi", "Rahfiahmad", "Denji", "Gojo Satoru", "Anya Forger", 
    "Tanjiro Kamado", "Eren Yeager", "Makima", "Luffy", "Ambalabu", "kodok bancet",
];

// Simpan Kodam user di memori
const userKodamMap = {};

bot.onText(/\/cekkodam (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const name = match[1].trim();

    // Cek apakah user sudah memiliki Kodam
    if (!userKodamMap[name]) {
        // Jika belum, pilih Kodam secara acak
        const randomKodam = kodams[Math.floor(Math.random() * kodams.length)];
        userKodamMap[name] = randomKodam;
    }

    const userKodam = userKodamMap[name];
    bot.sendMessage(chatId, `Halo ${name}, Kodam mu adalah ${userKodam}`);
});

const genAI = settings.gemini;
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('eror bro', error);
    return 'permintaan ke api gagal jir';
  }
}

bot.onText(/\/ai (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const prompt = match[1];

  const responseText = await generateContent(prompt);
  
  bot.sendMessage(chatId, responseText, { parse_mode: 'Markdown' });
});
