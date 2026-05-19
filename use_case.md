#Діаграма прецедентів (Use Case Diagram)

```mermaid
graph LR
    subgraph Система YesCite
        UC1(Автентифікація)
        UC2(Створити цитування)
        UC3(Згенерувати список літератури)
        UC4(Експортувати список)
        UC5(Керувати стилями цитування)
        UC6(Блокувати користувача)

        UC2 -.->|include| UC1
        UC3 -.->|include| UC1
        UC4 -.->|extend| UC3
    end

    User((Користувач))
    Admin((Адміністратор))

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4

    Admin --> UC1
    Admin --> UC5
    Admin --> UC6
