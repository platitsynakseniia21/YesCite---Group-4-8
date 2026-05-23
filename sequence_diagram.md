# Крок 5. Діаграма послідовності (Sequence Diagram) — Створення цитування (FR-02)

```mermaid
sequenceDiagram
    autonumber
    actor User as Користувач
    participant UI as Інтерфейс (UI)
    participant Ctrl as CitationController
    participant DB as База Даних

    activate User
    User->>UI: Вводить дані джерела (Автор, Назва, Рік) та тисне "Створити"
    activate UI
    UI->>Ctrl: POST /citations (дані)
    activate Ctrl
    
    alt Дані валідні
        Ctrl->>DB: saveCitation(data, projectId)
        activate DB
        DB-->>Ctrl: citation_id (Успіх)
        deactivate DB
        Ctrl-->>UI: HTTP 201 Created (Об'єкт цитування)
        UI-->>User: Відображення готового посилання
    else Дані неповні
        Ctrl-->>UI: HTTP 400 Bad Request
        UI-->>User: Повідомлення про помилку заповнення
    end
    
    deactivate Ctrl
    deactivate UI
    deactivate User
