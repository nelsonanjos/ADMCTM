const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const fs = require('fs');
const xml2js = require('xml2js');



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

  function writeXTM(concept_list, linking_phrase_list, connection_list) {

    let xtm = '';

        xtm += (
          `<?xml version="1.0"?>
          <!DOCTYPE topicMap PUBLIC "-//TopicMaps.Org//DTD XML Topic Map (XTM) 1.0//EN" "./topics_map.xml">
          <topicMap xmlns='http://www.topicmaps.org/xtm/1.0/' xmlns:xlink='http://www.w3.org/1999/xlink'>`
        );
        
      concept_list.forEach((concept) => {
        xtm += (`
          <topic id="${concept.$.label.replaceAll(' ', '_')}">
            <baseName>
              <baseNameString>${concept.$.label}</baseNameString>
            </baseName>
          </topic>`
        );
      });

      let connection = '';
      let topicTo = [];
      let topicFrom = [];

      linking_phrase_list.forEach((linking) => {

        connection = linking.$.label.replaceAll(' ', '_');
        
        connection_list.forEach((connection) => {
          if(linking.$.id === connection.$.from_id){

            concept_list.forEach((concept) => {
              if(concept.$.id === connection.$.to_id) topicFrom.push(concept.$.label.replaceAll(' ', '_'));
            })
          }
          
          if(linking.$.id === connection.$.to_id){

            concept_list.forEach((concept) => {
              if(concept.$.id === connection.$.from_id) topicTo.push(concept.$.label.replaceAll(' ', '_'));
            })
          }
        });

        

        xtm += (`
          <association id="${connection}">
            <member>
              <roleSpec>
                <topicRef xlink:href="#${topicTo[0]}" />
              </roleSpec>
              <topicRef xlink:href="#${topicFrom[0]}" />
            </member>
          </association>
          `);

      topicTo= [];
      topicFrom= [];

      });

      xtm += '</topicMap>';

      return xtm;
  };


  fs.readFile('mapa_conceitual.xml', (err, data) => {
    if (err) throw new Error(err);

    const parser = new xml2js.Parser();
    parser.parseStringPromise(data)
      .then((res) => {
        const newMap = JSON.parse(JSON.stringify(res.cmap.map[0]).replaceAll('-', '_')); //Tem que alterar os '-' / '_' das chaves

        const concept_list = newMap.concept_list[0].concept;
        const linking_phrase_list = newMap.linking_phrase_list[0].linking_phrase;
        const connection_list = newMap.connection_list[0].connection;


        let xtm = writeXTM(concept_list, linking_phrase_list, connection_list);
        

        fs.writeFile('topics_map.xml', xtm, 
          {
            encoding: 'utf8',
            flag: 'w',
            mode: 0o666,    
          },
          (err) => {
            if(err) throw new Error(err);
          }
        );

      })
      .catch((err) => {
        console.log(err);
      });
  });

});




app.get('/download/topics_map', (_req, res) => {


  res.setHeader('Content-disposition', 'attachment; filename=topics_map.xml');
  res.download('topics_map.xml', (err) => { 
    if (err) console.error(err);
  });

  // res.send({ cod: 200, message: 'Mapa enviado com sucesso!' });
});




app.listen(3333, () => console.log('Server running on port 3333'))

module.exports = app;
