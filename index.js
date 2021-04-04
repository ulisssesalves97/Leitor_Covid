const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
const port = 3000;
const logFile = './logs.txt';

const maxTemp = 38;

function guardarLeitura(ok, temp) {
    if (ok !== undefined && temp !== undefined) {
        const leitura = new Date().toISOString() + '\t' + (ok ? 'ok' : 'alto') + '\t' + temp + 'ºC\r\n';
        fs.appendFile(logFile, leitura, 'utf8', (err) => {
            if (err != null) {
                console.log('Erro ao salvar arquivo: ' + err);
            }
        });
    }
}

app.post('/temp', (req, res) => {
    if (req.body !== undefined) {
        if (req.body.temp !== undefined) {
            guardarLeitura((req.body.temp < maxTemp), req.body.temp);
        } else {
            console.log('entrada de dados invalida: ' + req.body);
        }
        res.end();
    } else {
        res.send('Mande um body');
    }

});

app.listen(port, () => console.log('Leitor-de-Covid inicializado na porta ' + port));