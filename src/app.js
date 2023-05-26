const express = require('express');
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

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});