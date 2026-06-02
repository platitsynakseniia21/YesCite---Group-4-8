const CitationManager = require('./citationManager');

describe('CitationManager Tests', () => {
    // --- Тести для addCitation ---
    test('1. EP (Позитивний): Додавання валідного цитування', () => {
        const manager = new CitationManager(); // Arrange
        const result = manager.addCitation("Smith", "Physics", 2020); // Act
        expect(result).toBe(true); // Assert
        expect(manager.getCitationsCount()).toBe(1);
    });

    test('2. EP (Негативний): Додавання з порожнім автором', () => {
        const manager = new CitationManager();
        expect(() => {
            manager.addCitation("", "Physics", 2020);
        }).toThrow("Author and title cannot be empty");
    });

    test('3. BVA (Межа): Рік видання на нижній межі (1400)', () => {
        const manager = new CitationManager();
        expect(manager.addCitation("Author", "Title", 1400)).toBe(true);
    });

    test('4. BVA (Межа -1): Рік видання нижче межі (1399)', () => {
        const manager = new CitationManager();
        expect(() => manager.addCitation("A", "T", 1399)).toThrow("Invalid year");
    });

    test('5. BVA (Межа): Рік видання на верхній межі (2030)', () => {
        const manager = new CitationManager();
        expect(manager.addCitation("Author", "Title", 2030)).toBe(true);
    });

    test('6. BVA (Межа +1): Рік видання вище межі (2031)', () => {
        const manager = new CitationManager();
        expect(() => manager.addCitation("A", "T", 2031)).toThrow("Invalid year");
    });

    test('7. EP (Позитивний): Додавання дублікату', () => {
        const manager = new CitationManager();
        manager.addCitation("Smith", "Physics", 2020);
        const result = manager.addCitation("Smith", "Physics", 2020);
        expect(result).toBe(false);
        expect(manager.getCitationsCount()).toBe(1);
    });

    // --- Тести для generateBibliography ---
    test('8. EP (Позитивний): Генерація стилю APA', () => {
        const manager = new CitationManager();
        manager.addCitation("Smith", "Physics", 2020);
        const result = manager.generateBibliography("APA");
        expect(result).toEqual(["Smith (2020). Physics."]);
    });

    test('9. EP (Негативний): Генерація невідомого стилю', () => {
        const manager = new CitationManager();
        expect(() => {
            manager.generateBibliography("UNKNOWN");
        }).toThrow("Unsupported style");
    });

    test('10. EP (Граничний стан): Генерація з порожнього списку', () => {
        const manager = new CitationManager();
        const result = manager.generateBibliography("MLA");
        expect(result).toEqual([]);
    });
});
