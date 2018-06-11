/**
 * This code is modeled off of a sample lambda function from the alexa-cookbook github repository
* https://github.com/alexa/alexa-cookbook
 **/


'use strict';
var stateList = ["Alabama", "Alaska", "Arizona", "Arkansas", "california", "Colorado", "Connecticut"
                , "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana"
                , "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts"
                , "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada"
                , "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota"
                , "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina"
                , "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington"
                , "West Virginia", "Wisconsin", "Wyoming"];
// This variable (states) is an array that stores the name of all of the United States. 

var risk = ["low", "very high", "low", "medium", "very high", "medium", "low", "very low", "very low", "very low", "medium"
              , "medium", "low", "low", "very low", "medium", "low", "low", "low", "low", "very low", "low", "low", "low", "low"
              , "medium", "low", "high", "low", "very low", "medium", "low", "low", "low", "low", "very high", "low", "very low"
              , "very low", "low", "low", "low", "medium", "medium", "very low", "low", "medium", "low", "very low", "high"];
              
// This variable (risk) is an array that stores the eartquake risk of every state in the states array
var handlers = {
  'LaunchRequest': function () { this.emit(':tell', "No intent by that name"); 
//This will run when the user responds to Alexa and their response has no intent 
  },
  'introintent': function () {
      this.response.speak("Hi, what state would you like to know the risk of a Earthquake?").listen("Hi, what state would you like to know the risk of an Earthquake?");
      this.emit(':responseReady');},
// This intent is what begins the conversation when you open the skill. 
// When you call to the conversation this is what Alexa will ask.       
    'list_states': function () {
     let list = "";
      for(let i = 0; i < stateList.length; i++) {
          if(i < stateList.length - 1) {
            list += stateList[i] + ", ";
          }
          else {
            list += " and " + stateList[i];
          }
        }
      this.response.speak("The states are " + list).listen("What state?");
      this.emit(':responseReady');},
// This above intent is what a user can call for if they want a list of the states. 
// The loop takes all the states in the array and will print them out together.       
    'choose_state' : function () {
      var temp = -1;
      let s1 = this.event.request.intent.slots.state.value;
      for(let i = 0; i < stateList.length; i++)
      {
        if(s1 == stateList[i])
        {
          temp = i;
        }
      }
      let s2 = risk[temp];
      if(temp == -1)
      {
        this.response.speak(s1 + " is not a state, please tell me a valid state name").listen("state");
        this.emit(':responseReady');
      }
      this.response.speak("The risk of an Earthquake in " + s1 + " is " + s2 + ".");
      this.emit(':responseReady');
    },
// This above intent is used when the user responds to Alexa with the nam of a state. 
// The for loop finds where the state is inside the states array and uses that location
// to also get the risk value for the said state. Once the two pieces of information
// are taken out of the arrays, Alexa will respond to the user with a sentence using those values.  

};


// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Include the AWS Alexa Library.
  const Alexa = require("alexa-sdk");

  // Create an instance of the Alexa library and pass it the requested command.
  var alexa = Alexa.handler(event, context);

  // Give our Alexa instance instructions for handling commands and execute the request.
  alexa.registerHandlers(handlers);
  alexa.execute();
};
