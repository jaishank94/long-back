 require('dotenv').config()
 
const express = require("express");
const app = express();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appsMLN3TXdJClc2r')
const port = 4000;
var cors = require('cors')
 
app.use(cors())

app.get("/", (req, res) => {
  const drugs = base('Drugs')
  const all = drugs.select({view:"Grid view"})

all.firstPage((error,records)=>{
  const names = records.map(record =>record.get("Name"))
  const othernames = records.map(record =>record.get("Other names"))
  const level = records.map(record =>record.get("Level of evidence"))
  const administration = records.map(record =>record.get("Administration"))
  const alsogoodfor = records.map(record =>record.get("Also good for"))
  var items = names.map((name, index) => {
    return {
      // id: id,
      name: names[index],
      othername: othernames[index],
      level : level[index],
      administration:administration[index] ,
      alsogoodfor : alsogoodfor[index]
    }
  });
  res.json(items)

})
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});




