'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.6d7e6002-bca1-4c71-a261-72229389e994';

const languageStrings = {
    'en': {
        translation: {
            Goldbook: [
                '$$$Don\'t Criticize, Condemn or Complain### Criticizing another person not only damages that person\'s reputation, but puts a dent in our own',
                '$$$Give Honest, sincere appreciation### Appreciation builds our image faster than any other practice. After all, the success of every job demands cooperation and effort from others. People contribute to our success as much as we contribute to theirs.',
                '$$$Arouse in the other person an eager want### As professionals, we are constantly selling our ideas. But people consent to help for their own reasons, not ours. If we make it clear how our ideas will benefit them, there is no limit to the cooperation we could receive.',
                '$$$Become genuinely interested in other people### Regardless of the physical or financial assets an organization may have, its the people who make it successful. Theyt are an organization\'s key asset, and getting to know them should be as high a priority as learning the technical aspects of one\'s job. The key is to be genuine. Don\'t get a reputation for only being interested when you want something. Getting to know others should always be mutually beneficial.',
                '$$$Smile### Whether or not we are pleasant to be around depends less on the situation than on our own behavior. Professional rapport is fueled by seemingly minor considerations, such as friendly, accessible demeanor and a welcoming smile.',
                '$$$Remember that a person\'s name is to that person the sweetest and most important sound in any language### Using a person\'s name is crucial, especially when meeting those we don\'t see very often. Respect and acceptance stem from simple acts, such as remembering a person\'s name and using it whenever appropriate.',
                '$$$Be a good listener### Encourage others to talk about themselves. Organizations run on information, so what better way to learn what\'s going on than following this principle? We must listen with everything we\'ve got. How we listen says volumes about how we think. Be focused, engaged and sincere.',
                '$$$Talk in terms of the other person\'s interests### Truth be told, we spend most of our time thinking about ourselves. Why not create strong professional relationships by putting away our own concerns and talking about what others are interested in for a while?',
                '$$$Make the other person feel important - and do it sincerely### In our dealings with others, building them up shows we appreciate their contribution. The bond that results can help us withstand the pressures of our own day-to-day struggles.',
                '$$$The only way to get the best of an argument is to avoid it### An argument is 90% of emotion and 10% nonsense. A mature professional avoids arguments. ',
				'$$$Show respect for the other person\'s opinion. Never say, \'you are wrong\'### Avoid making others defensive. It shrinks the channels of communication. Simply ask why they feel the way they do.',
				'$$$If you\'re wrong, admit it quickly and emphatically### This disarms conflict and opens up lines of communication.',
				'$$$Begin in a friendly way### If we aren\'t open and friendly, winning people to our way of thinking is nearly impossible',
				'$$$Get the other person saying \'yes, yes, yes\' immediately### It\'s important to begin by agreeing on something. Then the challenging ideas are more easily accepted.',
				'$$$Let the other person do a great deal of the talking### Not only will the person share information, but he or she might \'talk themselves\' into cooperating.',
				'$$$Let the other person feel that the idea is his or hers### What is right, not who is right, is most important. By following this principle, we build another person\'s confidence and willingness to share ideas and strengthen the team.',
				'$$$Try honestly to see things from the other person\'s point of view### The other person\'s point of view may be clearer than ours. Learn what you can from other\'s point of view.',
				'$$$Be sympathetic with the other person\'s ideas and desires### Being understanding and sympathetic is a sure way of keeping channels of communication open.',
				'$$$Appeal to the nobler motives### Most people will work very hard for ideals and the higher aims of the organization if they know what they are and how they apply in a particular situation.',
				'$$$Dramatize your ideas### A unique idea should have a unique package. Use creative approaches to help sell your ideas. Remember - Your TONE, ACTION and WORDS are the key',
				'$$$Throw down a challenge### Most of us have a competitive side. Challenging others to action, often produces unexpected positive results.',
				'$$$Begin with praise and honest appreciation### When we acknowledge the value a person has to our organization, we establish a positive tone for open communication.',
				'$$$Call attention to people\'s mistakes indirectly### This creates an environment that keeps others from becoming defensive.',
				'$$$Talk about your own mistakes before criticizing the other person### This concept eliminates barriers and helps others to be more open to our coaching',
				'$$$Ask questions instead of giving direct orders### This allows the individual to take increasing ownership of both the problem and potential solutions.',
				'$$$Let the other person save face### Our goal is to deal with the inappropriate behavior and still maintain the dignity of the associate.',
				'$$$Praise the slightest improvement and praise every improvement. Be \'hearty in your approbation and lavish in your praise\'### There is no better way to increase the productivity, efficiency, and commitment of others than praise. We must notice and give recognition to our colleagues.',
				'$$$Give the other person a fine repuation to live upto### When we set high expectations, we help others achieve their full potential.',
				'$$$Use encouragement. Make the fault seem easy to correct### By expressing our belief in the other person\'s ability to correct the fault, we give him or her confidence to improve their performance.',
				'$$$Make the other person happy about doing the thing you suggest### By encouraging a person\'s desire to improve performance, we can help develop the attitudes and behaviors that are most productive.',
				'$$$Did you ever wondered what to say when you were recognized for your contributions?### Welcome to TOUT formula. First, say THANK YOU. Second, tell who you OWE the award to. Third, How your are going to USE the award. Fourth, THANK YOU again!'
            ],
            SKILL_NAME: 'Dale Carnegie Gold Book',
            GET_Goldbook_MESSAGE: "Here's what Dale Carnegie says: ",
            HELP_MESSAGE: 'You can say tell me a Gold book, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetGoldbook');
    },
    'GetGoldbookIntent': function () {
        this.emit('GetGoldbook');
    },
    'GetGoldbook': function () {
        // Get a random space Goldbook from the space Goldbooks list
        // Use this.t() to get corresponding language data
        const GoldbookArr = this.t('Goldbook');
        const GoldbookIndex = Math.floor(Math.random() * GoldbookArr.length);
        const randomGoldbook = GoldbookArr[GoldbookIndex];
        
        // Create card display text
        const cardDisplayText = GoldbookArr[GoldbookIndex].replace("$$$","\"").replace("###","\"  -  ");

        // Create speech output
        const speechOutput = this.t('GET_Goldbook_MESSAGE') + GoldbookArr[GoldbookIndex].replace("$$$", "<p><prosody volume=\"x-loud\" pitch=\"medium\">").replace("###","</prosody></p><p>") + "</p>";

        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), cardDisplayText);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.dynamoDBTableName = 'DaleCarnegieGoldBook';
    alexa.registerHandlers(handlers);
    alexa.execute();
};