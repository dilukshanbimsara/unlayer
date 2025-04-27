const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path');
const app = express()
app.use(cors())
app.use(express.json())

app.post('/save-template',(req, res) => {
    console.log('SAVE TEMPLATE ')
    const {name, html, design} = req.body
    const data = {name, html, design}
    fs.writeFileSync(`./templates/${name}.json`, JSON.stringify(data,null,2))
    res.json({success: true})
})

app.get('/templates', (req, res) => {
    console.log('FETCH TEMPLATES')
    const templateDir = path.join(__dirname, './templates');
  
    // Read the filenames inside the templates directory
    const files = fs.readdirSync(templateDir); 
    
    // For each file, read its content
    const templates = files.map(file => {
      const content = fs.readFileSync(path.join(templateDir, file), 'utf-8');
      return JSON.parse(content);
    });
  
    res.json(templates);
})

app.listen(4000, () => console.log('Server running on port 4000'))
