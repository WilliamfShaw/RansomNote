$(function() {
  $("#create-note").on('click', makeWord)
  $("#open-note").on('click', appendToPage)
})

var wordLetters;

var makeWord = function() {
  console.log("clicked")
  var searchTerm = $("#ransom-note").val();
  var splitWords = searchTerm.split(" ")
  wordLetters = splitWords.map(function(word) {
    return word.split("")
  })
  var imageArray = []
  for (var i = 0; i < wordLetters.length; i++) {
    var currentWord = wordLetters[i]
    for (var j = 0; j < currentWord.length; j++) {
      getImage(currentWord[j])
    }
  }
}

var getImage = function(letter) {
  $.ajax({
    url: "/photos/" + letter,
    method: 'get',
    dataType: "json"
  }).done(reassemble)
}

var reassemble = function(data) {
  for (var i = 0; i < wordLetters.length; i++) {
    var currentWord = wordLetters[i]
    for (var j = 0; j < currentWord.length; j++) {
      var index = currentWord.indexOf(data.photo.title._content.toLowerCase())
      if (index != -1) {
        currentWord[index] = ["https://c4.staticflickr.com/", data.photo.farm, "/", data.photo.server, "/", data.photo.id, "_", data.photo.secret, ".jpg"].join('')
      }
    }
  }
}

var appendToPage = function() {
  for (var i = 0; i < wordLetters.length; i++) {
    var currentWord = wordLetters[i];
    var wordDiv = $("<div>").addClass("word").attr('id', "word" + i.toString());
    $("body").append(wordDiv)
    for (var j = 0; j < currentWord.length; j++) {
      var div = $("#word" + i.toString())
      var image = $("<img>").attr("src", currentWord[j]).css('height', '150px')
      $(div).append(image)
    }
  }
}