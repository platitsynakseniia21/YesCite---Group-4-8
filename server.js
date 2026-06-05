const express = require('express');
const CitationManager = require('./citationManager');

const app = express();
// Порт, який видасть Render, або 3000 для локальної перевірки
const port = process.env.PORT || 3000;

// Створюємо екземпляр нашого класу
const manager = new CitationManager();

// Додаємо кілька тестових цитат, щоб API не було порожнім одразу після запуску
manager.addCitation("Martin Fowler", "Refactoring", 1999);
manager.addCitation("Robert C. Martin", "Clean Code", 2008);

// Дозволяємо серверу розуміти JSON у тілі запитів
app.use(express.json());

// 1. GET /health - вимога базового завдання (перевірка працездатності)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Citation API is running successfully' 
    });
});

// 2. GET /styles - додаткова вимога Варіанту 2 (список допустимих параметрів)
app.get('/styles', (req, res) => {
    res.status(200).json({
        available_styles: ["APA", "MLA", "DSTU"],
        description: "Use these styles as a query parameter, e.g., /bibliography?style=APA"
    });
});

// 3. GET /bibliography - основний endpoint для отримання результату
app.get('/bibliography', (req, res) => {
    // Беремо стиль з URL або ставимо APA за замовчуванням
    const style = req.query.style || 'APA'; 
    
    try {
        const result = manager.generateBibliography(style);
        res.status(200).json({ 
            requested_style: style, 
            total_citations: manager.getCitationsCount(),
            data: result 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
