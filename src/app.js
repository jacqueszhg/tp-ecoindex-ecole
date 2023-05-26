const express = require('express');
const https = require('https');
const fs = require('fs');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 8080;
const trads = require("./data-trad.json");
const oneDay = 86400000;

app.use(express.static('src/public', {
    maxAge: oneDay,
}));

app.get("/api", (req, res) => {
    res.send({msg: "hello world"})
})

app.get("/api/:lang/:id", (req, res) => {
    const {lang, id} = req.params
    res.send(trads[lang]?.[id] || trads.fr[id] || "")
})

app.get("/api/:lang", (req, res) => {
    const {lang, id} = req.params
    res.send({...trads.fr, ...trads[lang]})
})

const options = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('certificate.crt')
};

https.createServer(options, app).listen(port, () => {
    console.log('Server app listening on port ' + port);
});