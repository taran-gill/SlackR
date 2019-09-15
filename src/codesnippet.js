var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "7ef0d333",
  application_key: "91c89f80b8e77c6e6252eeae377dfba6"
});

text1 = ["I chose the title because it seems to touch on so much of what’s exciting and what’s threatening, too, about blogging and all the other changes that we call, collectively, the digital revolution. “Say everything”: the phrase suggests the thrill of the universal project the Web sometimes seems to be, in which everyone gets to contribute to a vast collective conversation and pool of knowledge. “Say everything” also raises all kinds of questions about this new world. If we say everything, how will we have time to listen? And, “Aren’t some things better left unsaid?” So these are some of the things I’m going to look at today."]

textapi.summarize({
    /*'url': 'http://www.lemonde.fr/sport/article/2015/03/06/euro-d-athletisme-triple-inedit-pour-le-60-m-haies-francais_4589005_3242.html',
    */'text': text1,
    'title': 'stuff',
    'sentences_number': 3
}, function(error, response) {
    if (error === null) {
      console.log(response);
    }
});