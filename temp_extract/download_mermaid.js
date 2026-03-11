const fs = require('fs');
const https = require('https');

const mermaidCode = `graph TD
    A[Requirement Gathering] --> B[System Analysis & Design]
    B --> C[Frontend Development - React.js]
    B --> D[Backend Development - Node.js/Express]
    C --> E[Integration]
    D --> E
    E --> F[Testing & Bug Fixing]
    F --> G[Deployment]
    G --> H[Maintenance]

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bfb,stroke:#333,stroke-width:2px
    style D fill:#bfb,stroke:#333,stroke-width:2px
    style E fill:#fbf,stroke:#333,stroke-width:2px
    style F fill:#fbb,stroke:#333,stroke-width:2px
    style G fill:#bff,stroke:#333,stroke-width:2px
    style H fill:#ccc,stroke:#333,stroke-width:2px
`;

const base64Code = Buffer.from(mermaidCode).toString('base64');
const url = 'https://mermaid.ink/img/' + base64Code;

const file = fs.createWriteStream('../overleaf_report/project_pipe.png');
https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
        file.close();
        console.log('Downloaded project_pipe.png');
    });
}).on('error', function (err) {
    console.log('Error: ' + err.message);
});
