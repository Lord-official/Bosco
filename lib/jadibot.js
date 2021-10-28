
let { WAConnection, MessageType, Mimetype} = require('@adiwajshing/baileys')
let qrcode = require('qrcode')
const fs = require('fs')

listjadibot = [];

const jadibot = async(reply,client,id) => {
	conn = new WAConnection()
    conn.logger.level = 'warn'
    conn.version = [2, 2123, 8]
    conn.browserDescription = [ 'Bosco', '', '3.0' ]
    conn.on('qr', async qr => {
    	let bot = await qrcode.toDataURL(qr, { scale: 8 })
    	let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64')
       	bot = await client.sendMessage(id,buffer,MessageType.image,{caption:'*Scan this QR to become a temporary bot!*\n1. *Click the three dots in the top right corner*\n2. *Tap WhatsApp Web*\n3. *Scan this QR*\n\n*QR Expires in 30 seconds*'})
    	setTimeout(() => {
       	client.deleteMessage(id, bot.key)
       },30000)
    })
    conn.on('connecting', () => {
    })
    conn.on('open', () => {
    	reply(`*Successfully connected with WhatsApp* - mu.\n\n*Device*:\n\n ${JSON.stringify(conn.user,null,2)}`)
    })
    await conn.connect({timeoutMs: 30 * 1000})
    listjadibot.push(conn.user)
    conn.on('chat-update', async (message) => {
        require('../Bosco.js')(conn, message)
    })
}

const stopjadibot = (reply) => {
	conn = new WAConnection();
	conn.close()
reply('Oke')
conn.close()
}


module.exports = {
	jadibot,
	stopjadibot,
	listjadibot
}