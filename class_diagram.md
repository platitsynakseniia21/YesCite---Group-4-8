# Крок 4. Діаграма класів (Class Diagram)

```mermaid
classDiagram
    class User {
        +int id
        +string email
        +string password
        +login(string email, string password) bool
    }
    class Admin {
        +int accessLevel
        +blockUser(int userId) void
        +addStyle(CitationStyle style) bool
    }
    class Project {
        +int projectId
        +string title
        +exportList(string format) File
    }
    class Citation {
        +int citationId
        +string sourceData
        +string author
        +generateText() string
    }
    class CitationStyle {
        +int styleId
        +string name
        +string templateFormat
        +applyFormat(Citation c) string
    }
    class AuthService {
        +authenticate(string login, string pwd) bool
    }

    User <|-- Admin : Наслідування
    User "1" --> "*" Project : Створює
    Project "1" *-- "*" Citation : Композиція
    Citation "*" --> "1" CitationStyle : Використовує
    User ..> AuthService : Залежність
