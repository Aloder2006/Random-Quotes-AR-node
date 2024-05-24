
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const fs = require('fs');

app.use(cors()); // Prevents CORS error


app.get('/api', function(req, res) {

    if (req.url === '/favicon.ico') {
        res.end();
    } 
    // Ends request for favicon without counting

    const json = fs.readFileSync('count.json', 'utf-8');
    const obj = JSON.parse(json);

    obj.pageviews = obj.pageviews+1;
    
    // Updates pageviews and visits (conditional upon URL param value)

    const newJSON = JSON.stringify(obj);
    // Converts result to JSON

    fs.writeFileSync('count.json', newJSON);
    res.send(newJSON);
    // Writes result to file and sends to user as JSON

})


app.use(express.static(path.join(__dirname, 'vc')));

app.use(function(req, res) {
  res.status(400);
  return res.send(`404 Error: Resource not found`);
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
})
