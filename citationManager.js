class CitationManager {
    constructor() {
        this.citations = [];
        this.validStyles = ["APA", "MLA", "DSTU"];
    }

    addCitation(author, title, year) {
        if (!author || !title) {
            throw new Error("Author and title cannot be empty");
        }
        if (year < 1400 || year > 2030) {
            throw new Error("Invalid year of publication");
        }
        
        // Перевірка на дублікати
        const isDuplicate = this.citations.some(
            c => c.title === title && c.year === year
        );
        if (isDuplicate) return false;

        this.citations.push({ author, title, year });
        return true;
    }

    generateBibliography(style) {
        if (!this.validStyles.includes(style)) {
            throw new Error(`Unsupported style: ${style}`);
        }
        if (this.citations.length === 0) return [];

        const result = [];
        // Сортування за алфавітом
        const sorted = [...this.citations].sort((a, b) => a.author.localeCompare(b.author));

        for (const c of sorted) {
            if (style === "APA") {
                result.push(`${c.author} (${c.year}). ${c.title}.`);
            } else if (style === "MLA") {
                result.push(`${c.author}. ${c.title}. ${c.year}.`);
            } else if (style === "DSTU") {
                result.push(`${c.author}. ${c.title} / ${c.author} // ${c.year}.`);
            }
        }
        return result;
    }

    getCitationsCount() {
        return this.citations.length;
    }
}

module.exports = CitationManager;
