// Виносимо стилі та логіку у словник (вирішує зауваження Тімофея №4, №5 та ідею Злати)
const BIBLIOGRAPHY_FORMATTERS = {
    APA: (citation) => `${citation.author} (${citation.year}). ${citation.title}.`,
    MLA: (citation) => `${citation.author}. ${citation.title}. ${citation.year}.`,
    DSTU: (citation) => `${citation.author}. ${citation.title} / ${citation.author} // ${citation.year}.`
};

class CitationManager {
    // Виносимо магічні числа (вирішує зауваження Тімофея №1)
    static MIN_YEAR = 1400;
    static MAX_YEAR = 2030;

    constructor() {
        this.citations = [];
    }

    addCitation(author, title, year) {
        if (!author || !title) {
            throw new Error("Author and title cannot be empty");
        }
        
        if (year < CitationManager.MIN_YEAR || year > CitationManager.MAX_YEAR) {
            throw new Error("Invalid year of publication");
        }

        // Додали перевірку автора (зауваження №2) та змінили 'c' на 'citation' (зауваження №3)
        const isDuplicate = this.citations.some(
            citation => citation.title === title && citation.year === year && citation.author === author
        );
        
        if (isDuplicate) return false;

        this.citations.push({ author, title, year });
        return true;
    }

    generateBibliography(style) {
        // Використовуємо Strategy Pattern
        if (!BIBLIOGRAPHY_FORMATTERS[style]) {
            throw new Error(`Unsupported style: ${style}`);
        }

        if (this.citations.length === 0) return [];

        return [...this.citations]
            .sort((a, b) => a.author.localeCompare(b.author))
            .map(citation => BIBLIOGRAPHY_FORMATTERS[style](citation));
    }

    getCitationsCount() {
        return this.citations.length;
    }
}

module.exports = CitationManager; 
