/*
    These variables are known as modules. They are functions written and available on Github
    for Node.JS. They exist to help us not re-invent the wheel
*/
var request = require('request'); //This is an HTTP request module. I'm binding it to the var "request"

/*
    Import our config here. This is a way to import sensitive stuff without directly exposing it to people on github
    (like API keys)
*/
var config = require('./config/config.js');

/*
    We want to make a variable for banned users that lives as long as the program exists. So we declare it 
    here, outside of any functions. If I declared a variable inside of a function, it would die and not 
    exist once the function is done
*/
var bannedUsersArray = []; //It's empty for now. We haven't asked UGC who is banned yet.

/*
    Let's call on that new request function we have. It takes two arguments.

    #1) - The URL. In this case, our API request. 

    #2) - a callback function. Something to handle what the #1 argument gave us. 
        This callback function has three arguments.

       #1) - We are given an error (could be empty -- no error)
       #2) - A response, this is status information (did it fail? Was the API key bad and connection refused?)
       #3) - A body, the content of the site itself. In this case, JSON object

*/
request('http://www.ugcleague.com/api/api.php?key=' + config.apiKey + '&ban_list', function(error,response,body) {
    //error case. We could write code to handle a not null error here

    //response case. Did we get something weird? Handle those here

    //The body is our JSON. Let's make that JSON into a JavaScript object so we can use code to handle it
    var bannedUsersObj = JSON.parse(body);
    /*
        /!\ /!\ /!\

        This above variable was declared WITHIN the scope of function(error,response,body){ }. This is BAD! Once this function
        is DONE, it is going to clean up this variable and then we just won't have that list at ALL. If we try to call it,
        our system is going to error and say "Hey! That doesn't even exist!"
    */

    /*
        I want to preserve this list to cross-check with my own API later. I don't want an object, I JUST want an array.
        In our API call, we have { steam64: <arr> } within an object. I really only want that array, so I'm going to call
        on just the array. I can do this by calling <obj>.<key>. In this case? bannedUsersObj.steam64
    */

    bannedUsersArray = bannedUsersObj.steam64;

    /*
        Cool! Now we have our array saved outside of this function. It is now in "global scope", so it will exist as long
        as this program is alive. To clarify

        bannedUsersArray = bannedUsersObj.steam64;

        "bannedUsersArray" is the object we declared in line 12. We don't use "var" here because we are talking about
        an object that already exists. We want to update it. That's why we use ' = bannedUsersObj.steam64 ' which
        literally means. "Take bannedUsersAarray and set it equal to whatever bannedUsersObj.steam64 is"

    */

    console.log(bannedUsersArray);
});

/*

    We are outside of our function scope! That's awesome! Now that we made the request in this file, as long as it
    is alive, we can kind of just sit here and take requests from our plugins, and those plugins can ask us for 
    a list of banned users. Now all we have to do is pass them bannedUsersArray, which is loaded into memory.

    We would write all those functions here, ultimately.
*/


