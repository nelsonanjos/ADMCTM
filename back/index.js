var express = require('express');
var path = require('path');
const cors = require('cors');
const multer = require('multer');



var app = express();
app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname)
  },
  filename: (req, file, cb) => {
    cb(null, 'mapa_conceitual.xml');
  }
});
const upload = multer({ storage });



app.post('/enviar/mapa_conceitual', upload.single('FILE'), (_req, res) => {
  res.send({ cod: 200, message: 'Arquivo recebido! Aguarde convertendo...' })
});




app.get('/download/topics_map', (_req, res) => {
  const readline = require('readline')
  const fs = require('fs')
  const readble = fs.createReadStream('topicsmap.xml')

  const rl = readline.createInterface({
    input: readble,
  })

  res.setHeader('Content-disposition', 'attachment; filename=topicsmap.xml');
  res.download("topicsmap.xml")
  res.send({ cod: 200, message: 'Arquivo convertido! Verifique seus Downloads.' })
});




app.listen(3333, () => console.log('Server running on port 3333'))

module.exports = app;
