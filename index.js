var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer')
const upload = multer() // multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  let fileName = req.file.originalname
  let fileType = req.file.mimetype
  let fileSize = req.file.size
  let jsonResponseObject = {
    name: fileName,
    type: fileType,
    size: fileSize
  }
  res.json(jsonResponseObject)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
