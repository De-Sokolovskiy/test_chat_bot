const { Telegraf, session, Scenes: { WizardScene, Stage }, Markup } = require("telegraf")
require('dotenv').config() //Необходимо для запуска токена из файла указанного ниже

const bot = new Telegraf(process.env.TOKEN)

const inline_keyboard = [
    [
        {
            text: 'Forward',
            callback_data: 'forward'
        }
    ]
]

bot.on('callback_query', query => {

    const {chat, message_id, text} = query.message 
    

    switch (query.data) {
        case 'forward':
            //куда, откуда, что     
            bot.forwardMessage(from_chat_id, chat.id, message_id)
            break
    }   
    bot.answerCallbackQuery({
        callback_query_id: query.id
    })
})



bot.command('/start', async (ctx) => {
    try{

        await ctx.replyWithHTML('Посмотреть наши посты в соц.сети можно здесь', {
            reply_markup: {
                inline_keyboard
            }
        }

        )

    }catch(e) {
        console.error(e) //если выскакивает ошибка, то она появляется в консоли
    }

})  


bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


