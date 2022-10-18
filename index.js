import TelegramApi from "node-telegram-bot-api";
const token = "5394665974:AAFglx3cR1CN1NpNq6qpo__R0oDg_Il1e5s";
const bot = new TelegramApi(token, { polling: true });

const langOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Қазақ", callback_data: "Қазақ" },
        { text: "Русский", callback_data: "Русский" },
      ],
    ],
  }),
};

const kazOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Команданы тіркеу", callback_data: "Команданы тіркеу" },
        { text: "Хакатон туралы", callback_data: "Хакатон туралы" },
        { text: "Тәртібі және ережесі", callback_data: "Тәртібі және ережесі" },
      ],
      [
        {
          text: "Дайындық бойынша ұсыныстар",
          callback_data: "Дайындық бойынша ұсыныстар",
        },
        { text: "Сұрақ қою", callback_data: "Сұрақ қою" },
        { text: "Кері қайту", callback_data: "Кері қайту" },
      ],
    ],
  }),
};
const q_a_id = -1001442335250;
const hackathon_text_kz = `
📌 
2022 жыл Қазақстан Республикасындағы «Балалар жылы» аясында 4-5 қараша күндері қалалық “IT-хакатон” сайысы өтеді. Хакатон ұйымдастырушылары Өскемен “Білім-Инновация” лицейі, “Шығыс” облыстық әдістемелік орталығы және Д. Серікбаев атындағы Шығыс Қазақстан техникалық университеті(ШҚТУ). 

Сайыс мақсаты мектеп оқушыларын IT саласына баулу.

Сайыс форматы: сайыс күні берілген тақырыпқа байланысты топпен бірге сайт немесе телефонға қолданба жасау. 

Сайыс күндері қатысушылар түскі ас, кешкі ас және жеңіл аспен(шәй, печенье) қамтамасыз етіледі. 

Қатысу тегін. 

Сайыс ШҚТУ ғимаратында өткізіледі. Мекен-жай: Серікбаев көшесі, 19. 
`;
const rules_kz = `
Сайыс 2 кезеңнен тұратын болады:
I кезең (техникалық кезең): сайт(қолданба) сайыстың техникалық тапсырмасының минималды талаптарына сай болу керек. Техникалық тапсырма сайыс күні беріледі. Техникалық тапсырманың талаптары орындалуы негізінде қатысушылар екінші кезеңге өте алады. 

II кезең (презентация): алдыңғы кезеңнен өткен топтар өз жобаларын презентация арқылы қорғайды. Презентация жобаның экономикалық тиімділігін және практикалық құндылығын негіздеу керек(мысалы бизнес план). 

Ескерту: екінші кезеңге сайысқа қатысқан топтардың 50% ғана өтеді. 


Қазылар алқасы келесі критерийлер бойынша нәтижелерді шығарады:
•  Код тиімділілігі және техникалық тапсырмаға сәйкестігі
•  Қолданушы интерфейсі
•  Жұмысты қорғау(презентация)

Сайыс ережелері:
1. Cайыс күні берілген тақырыпқа байланысты топпен бірге сайт немесе телефонға қолданба жасау. 

2. Топ 3 кісіден тұруы қажет.

3. Сайыс күні қатысушылар өз ноутбуктарын(компьютерлерін) және интернеттерін қолдану қажет.

4.Сайт немесе қосымшаларды жасаушы платформаларды (Tilda, Google Sites, Bubble және т.б.) пайдалануға тиім салынады.
`;
const usynystar = `
Алдыңғы хакатон:
Хакатонда жақсы нәтиже көрсету үшін алдыңғы хакатонның техникалық тапсырмасы мен бағалау критерийлерімен танысу маңызды:

Техникалық тапсырма.pdf

Бағалау критерийлері.pdf


Хакатонда жақсы нәтиже көрсету үшін келесі курстарды бітірген жөн көреміз:

https://youtube.com/playlist?list=PLM6XATa8CAG4F9nAIYNS5oAiPotxwLFIr

https://stepik.org/course/38218/promo

Немесе өзіңізді қалуыңызша кез-келген frontend бойынша курс

`;

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Ботты қосу / Включить бота" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Тілді таңдаңыз / Выберите язык",
        langOptions
      );
    } else if (text && text.endsWith("?")) {
      await bot.sendMessage(q_a_id, `Сұрақ / вопрос: ${text}`);
      await bot.sendMessage(
        chatId,
        "Жауапты осы жерден табасыз / ответ вы найдете здесь: https://t.me/oskemen_hackathon_chat "
      );
      await bot.sendMessage(
        chatId,
        "Тілді таңдаңыз / Выберите язык",
        langOptions
      );
    } else {
      await bot.sendMessage(
        chatId,
        "Соңында сұрақ белгісі міндетті болуы тиіс / Знак вопроса в конце обязателен!"
      );
    }
  });

  bot.on("polling_error", console.log);

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data == "Қазақ") {
      await bot.sendMessage(chatId, "Таңдаңыз:", kazOptions);
    } else if (data == "Русский") {
      await bot.sendMessage(chatId, "Not currently available function!");
    }
    if (data == "Команданы тіркеу") {
      await bot.sendMessage(chatId, "https://forms.gle/WrfqMje2bwpGYy578");
    } else if (data == "Хакатон туралы") {
      await bot.sendMessage(chatId, hackathon_text_kz);
    } else if (data == "Тәртібі және ережесі") {
      await bot.sendMessage(chatId, rules_kz);
    } else if (data == "Дайындық бойынша ұсыныстар") {
      await bot.sendMessage(chatId, usynystar);
    } else if (data == "Сұрақ қою") {
      await bot.sendMessage(
        chatId,
        "Ботта жоқ информация туралы сұрағаңызды жазыңыз (соңында сұрақ белгісі міндетті болуы тиіс)"
      );
    } else if (data == "Кері қайту") {
      await bot.sendMessage(
        chatId,
        "Тілді таңдаңыз / Выберите язык",
        langOptions
      );
    }
  });
};
start();
