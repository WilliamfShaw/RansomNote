var logger = require('morgan');
var bodyParser = require('body-parser')
var Flickr = require('flickrapi'),
  flickrOptions = {
    api_key: process.env.FLICKR_API_KEY,
    secret: process.env.FLICKR_SECRET_KEY
  };

module.exports.controller = function(app) {
  app.use(logger('dev'))

  app.get("/", function(req, res) {
    res.send("")
  })

  app.get('/photos/:letter', function(req, res) {

    var page = {
      "a": "1",
      "b": "1",
      "c": "2",
      "d": "2",
      "e": "3",
      "f": "3",
      "g": "3",
      "h": "3",
      "i": "4",
      "j": "4",
      "k": "4",
      "l": "4",
      "m": "4",
      "n": "5",
      "o": "5",
      "p": "6",
      "q": "6",
      "r": "6",
      "s": "7",
      "t": "7",
      "u": "8",
      "v": "8",
      "w": "8",
      "x": "8",
      "y": "8",
      "z": "8"
    }

    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
      flickr.photosets.getPhotos({
        photoset_id: "72157617336108226",
        user_id: '21450297@N06',
        page: page[req.params.letter]
      }, function(err, result) {
        console.log(req.params.letter)
        var photoArray = []
        result.photoset.photo.forEach(function(photo) {
          if (photo.title.toLowerCase() === req.params.letter) {
            photoArray.push(photo);
          }
        });
        var index = Math.floor(Math.random() * photoArray.length) + 1
        var photoSearch = photoArray[index];
        console.log(photoSearch);
        flickr.photos.getInfo({
          photo_id: photoSearch.id
        }, function(err, result) {
          res.send(result)
        })
      })
    })
  });
}