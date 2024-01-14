// /* eslint-disable brace-style */
// const { AttachmentBuilder, EmbedBuilder, Events } = require('discord.js');

// module.exports = {
// 	name: Events.MessageCreate,
// 	async execute(message) {
// 		if (message.content.startsWith('!embed')) {
// 			if (message.attachments.size > 0) {
// 				// Ambil attachment pertama
// 				const attachment = message.attachments.first();
			
// 				// Lakukan apa pun yang Anda inginkan dengan URL ini, misalnya mengirimkannya melalui Express.js
// 				// Di sini kami hanya mencetak URL sebagai contoh
// 				console.log('Attachment URL:', attachment);
// 			}
// 			const pathImg = message.content.split(' ')[1];
// 			const file = new AttachmentBuilder(`./app/public/storage/files/${pathImg}`);
// 			const exampleEmbed = new EmbedBuilder()
// 				.setTitle('New File Uploaded')
// 				.setColor('#0099ff')
// 				.setDescription('This is a new file uploaded')

// 				.setTimestamp()

// 			message.channel.send({
// 				embeds: [exampleEmbed],
// 				files: [file],
// 			});
// 		}
// 	},
// };