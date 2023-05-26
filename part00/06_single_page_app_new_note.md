```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    
    Note right of browser: Payload: content, date

    activate server
    server-->>browser: 201 Created - "note created"
    deactivate server

    Note right of browser: After POST, the page is not redrawn with a redirect. New note is sent to server and added locally to the list.
 
```