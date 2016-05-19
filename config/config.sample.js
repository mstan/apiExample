/*
    This is a config file where we can store sensitive information that we don't want to expose directly in our 
    code if we are making it public. 

    API keys, for instance?

    By convention, we distribute <NAME>.sample.js with our github repositories with all the sensitive info stripped out
    What you should do is rename this file to <NAME>.js and add your sensitive info for your own use.
*/  

//Make an object here to add all our sensitive info to
var data = {
    apiKey: '<YOUR API KEY GOES HERE>'
}


//export this so it can be used by other files in our system
module.exports = data;