// BotBuilder is the SDK in NodeJS for building a Bot in Azure.
// We would be using the version 3 of the BotBuilder SDK for this demo.
var botBuilder = require('botbuilder');

const InputNumbersCard = require('./resources/InputNumbers.json');

// 'Restify' - the server that we are going to use.
var restify = require('restify');
const server = restify.createServer({
    name: 'EventBright',
    version: '1.0.0'
  });

server.listen( process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening on %s', server.name, server.url );
  });

  // ChatConnector class connect the Bot with the BotFramework service.
  // We just use the demo version and as such do not connect with Azure and so
  // this is just left blank, meaning, we use Microsoft Bot Emulator for testing.
var connector = new botBuilder.ChatConnector({
});

// All our transactions happen via this end point.
server.post('/api/messages', connector.listen());

// We would be using the Bot memory storage for this example.
var inMemoryStorage = new botBuilder.MemoryBotStorage();

const EVENT_TYPE_CONCERT = 'Concert';
const EVENT_TYPE_SPORTS = 'Sports';
const EVENT_TYPE_MOVIE = 'Movie';
const EVENT_TYPE_MEETUP = 'MeetUp';
const EVENT_TYPE_FITNESS = 'Fitness'
const EVENT_TYPES = [ EVENT_TYPE_CONCERT, EVENT_TYPE_SPORTS, EVENT_TYPE_MOVIE, EVENT_TYPE_MEETUP, EVENT_TYPE_FITNESS ];

// This is an event registration application bot.
// We would use the default dialog for welcoming the user.
var bot = new botBuilder.UniversalBot(connector, [
    // Waterfall step 1: Greeting message!.
    function (session) {
        session.send( "Greetings!. I am 'EverBright', an automated assistant from 'EventBright' team!." );
        session.beginDialog('askForUserName');
    },
    // Waterfall step 2: Prompting the selection options!.
    function (session, results) {
        session.privateConversationData.reservedBy = results.response;
        session.send( `Hi ${session.privateConversationData.reservedBy}, good to have you here!.` );
        session.beginDialog( 'askForSelectingAnEventType');
    },
    // Waterfall step 3: Processing the selected option!.
    function (session, results) {
        session.privateConversationData.reservationEventType = results.response.entity;
        session.send( `Ok ${session.privateConversationData.reservedBy}, let me check the options for ${session.privateConversationData.reservationEventType}.` );
        session.beginDialog( 'listAvailableEvents' );
    },
    // Waterfall step 4: Get the list of upcoming events for the selected event type!.
    function (session, results) {
        session.privateConversationData.upcomingEvents = results.response;

        session.endDialog();
    }

]).set( 'storage', inMemoryStorage ); // Register in-memory storage. 

// Dialog to ask the user name.
bot.dialog('askForUserName', [
    function (session) {
        botBuilder.Prompts.text( session, "Please tell me who I am booking this reservation for?." );
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

// Dialog to ask the user to pick an event type.
bot.dialog('askForSelectingAnEventType', [
    function (session) {
        botBuilder.Prompts.choice(session,
            'What is on your mind?',
            EVENT_TYPES,
            { listStyle: botBuilder.ListStyle.button });
        },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

// Dialog to display the list of available events for registration.
bot.dialog('listAvailableEvents', [
    function (session) {

        var cards = getHeroCardsForEvents( session );

        // Create reply with Carousel AttachmentLayout
        var reply = new botBuilder.Message( session )
            .attachmentLayout( botBuilder.AttachmentLayout.carousel )
            .attachments( cards );

        session.send( reply );
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

function getEvents( eventType ) {    
    var upcomingEvents;
    switch( eventType )
    {
        case EVENT_TYPE_CONCERT:

            upcomingEvents = [  { eventName: "AQUA - Live In Rotterdam",
                                eventDate: "27th March 2020",
                                eventLocation: "15 Saint Pieterslann",
                                performers: "AQUA",
                                about: "Aqua is a Danish-Norwegian Europop music group, best known for their 1997 multi-platinum crossover single 'Barbie Girl'. The group formed in 1989 and achieved crossover success around the globe in the late 1990s and early 2000s. The group released three albums: Aquarium in 1997, Aquarius in 2000 and Megalomania in 2011.",
                                bandLogo: "./images/aqua.jpg" },
                                { eventName: "Coldplay - Eindhoven Connect",
                                eventDate: "9th April 2020",
                                eventLocation: "12 Europalaan",
                                performers: "Coldplay",
                                about: "Coldplay are a British rock band that was formed in London in 1996.[1][2] Vocalist and pianist Chris Martin, guitarist Jonny Buckland, bassist Guy Berryman, and drummer Will Champion met at University College London and began playing music together from 1996 to 1998, first calling themselves Pectoralz and then Starfish before finally changing their name to Coldplay.",
                                bandLogo: "./images/coldplay.jpg" },
                                { eventName: "BeeGees - In Memorial @ Hague Beach",
                                eventDate: "21st April 2020",
                                eventLocation: "17th Beachlane",
                                performers: "Various Artists",
                                about: "The Bee Gees were a pop music group formed in 1958. Their lineup consisted of brothers Barry, Robin, and Maurice Gibb. The trio were especially successful as a popular music act in the late 1960s and early 1970s, and later as prominent performers of the disco music era in the mid-to-late 1970s.",
                                bandLogo: "./images/beegees.jpg" },
                                { eventName: "Linkin Part - Live In Utrecht",
                                eventDate: "11th May 2020",
                                eventLocation: "15 Utrecht Central Tower",
                                performers: "Linkin Park",
                                about: "Linkin Park is an American rock band from Agoura Hills, California. The band's current lineup comprises vocalist/rhythm guitarist Mike Shinoda, lead guitarist Brad Delson, bassist Dave Farrell, DJ/keyboardist Joe Hahn and drummer Rob Bourdon, all of whom are founding members.",
                                bandLogo: "./images/linkinpark.jpg" }
                            ];
            break;
        case EVENT_TYPE_SPORTS:

            upcomingEvents = [  { eventName: "LaLiga - Barcelona vs Real Madrid",
                                eventDate: "27th June 2020",
                                eventLocation: "Santiago Bernabau",
                                performers: "LaLiga",
                                about: "The rivalry comes about as Madrid and Barcelona are the two largest cities in Spain, and they are sometimes identified with opposing political positions, with Real Madrid viewed as representing Spanish nationalism and Barcelona viewed as representing Catalan nationalism.[8][9] The rivalry is regarded as one of the biggest in world sport.",
                                bandLogo: "./images/aqua.jpg" },
                                { eventName: "BPL - Liverpool vs Chelsea",
                                eventDate: "9th February 2020",
                                eventLocation: "Anfield",
                                performers: "BPL",
                                about: "Liverpool travel to Chelsea for one of only two all Premier League meetings in the FA Cup Fifth Round, and for what is undoubtedly the standout tie. It pits first in the league against fourth, but does so at a time when both sides will have other things on their minds.",
                                bandLogo: "./images/coldplay.jpg" },
                                { eventName: "Cricket Ashes - Third Test",
                                eventDate: "21st May 2020",
                                eventLocation: "Edgbaston",
                                performers: "Ashes",
                                about: "The Ashes score remains at 1-0 after the second Test ended as a draw at Lord’s. The overall arching takeaway from the match was that rain will forever be the enemy of cricket purists. But, it was a relatively even contest between England and Australia, and a draw was invariably a fair result. It makes the third test a crucial match in this years Ashes series.",
                                bandLogo: "./images/beegees.jpg" },
                                { eventName: "French Open - Nadal vs Thiem",
                                eventDate: "11th June 2020",
                                eventLocation: "Roland Garris - Paris",
                                performers: "Tennis",
                                about: "Nadal is the reigning champion and had set his sights on defending it this year. The French Open would be the culmination of a hectic summer which will see players cram Wimbledon, the Tokyo Olympics, two Masters 1000 events and the US Open into their schedule.",
                                bandLogo: "./images/linkinpark.jpg" }
                            ];            
            break;
        case EVENT_TYPE_MOVIE:
            upcomingEvents = [  { eventName: "Avengers Infinity War",
                                eventDate: "27th March 2020",
                                eventLocation: "El Capitan Theater, Hollywood",
                                performers: "Marvel starcast",
                                about: "The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan.",
                                bandLogo: "./images/aqua.jpg" },
                                { eventName: "The Notebook",
                                eventDate: "9th April 2020",
                                eventLocation: "Rooftop Cinema Club - Los Angeles",
                                performers: "Coldplay",
                                about: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
                                bandLogo: "./images/coldplay.jpg" },
                                { eventName: "Zodiac",
                                eventDate: "21st April 2020",
                                eventLocation: "17th Beachlane",
                                performers: "Various Artists",
                                about: "Robert Graysmith, a cartoonist by profession, finds himself obsessively thinking about the Zodiac killer. He uses his puzzle-solving abilities to get closer to revealing the identity of the killer.",
                                bandLogo: "./images/beegees.jpg" },
                                { eventName: "Moonlight",
                                eventDate: "11th May 2020",
                                eventLocation: "15 Utrecht Central Tower",
                                performers: "Linkin Park",
                                about: "Chiron, a young African-American boy, finds guidance in Juan, a drug dealer, who teaches him to carve his own path. As he grows up in Miami, Juan's advice leaves a lasting impression on him.",
                                bandLogo: "./images/linkinpark.jpg" }
                            ];
            break;
        case EVENT_TYPE_MEETUP:
            upcomingEvents = [  { eventName: "The Walkers and Joggers Consortium",
                                eventDate: "12th March 2020",
                                eventLocation: "Adelaide",
                                performers: "EventBrite",
                                about: "This event is the monthly walking/jogging across the heart of Adelaide. We would begin at the Primark shopping complex and end at the riverside course. Interested?. Please join us.",
                                bandLogo: "./images/aqua.jpg" },
                                { eventName: "Drone Programming Via Python User Group",
                                eventDate: "19th April 2020",
                                eventLocation: "Canberra",
                                performers: "Meetup",
                                about: "Interested in Drone Programming?. We will explore the same via Python in this session. Please do not forget to bring your own laptop for the course as we will be using a software simulator during the course.",
                                bandLogo: "./images/coldplay.jpg" },
                                { eventName: "FinTech 2.0",
                                eventDate: "1st April 2020",
                                eventLocation: "Sydney",
                                performers: "Meetup",
                                about: "Want to invest in the stock market but do not know where to start?. Then this is the course for you. We are providing this first course free of cost to you and you can attend online as well.",
                                bandLogo: "./images/beegees.jpg" },
                                { eventName: "The Self Improvement Club",
                                eventDate: "11th May 2020",
                                eventLocation: "Melbourne",
                                performers: "WeWork",
                                about: "Welcome to The Self Improvers’ Club! Get ready to make friends with some really interesting people for great conversations and support on your personal development journey.",
                                bandLogo: "./images/linkinpark.jpg" }
                            ];
            break;
        case EVENT_TYPE_FITNESS:
                upcomingEvents = [  { eventName: "Martinsville 5K Run",
                                    eventDate: "27th August 2020",
                                    eventLocation: "Dallas County, Texas",
                                    performers: "Martinsville Runners Association",
                                    about: "The 5K run is a long-distance road running competition over a distance of five kilometres (3.107 mi). Also referred to as the 5K road race, 5 km, or simply 5K, it is the shortest of the most common road running distances.",
                                    bandLogo: "./images/aqua.jpg" },
                                    { eventName: "Run The Hook 10K Run",
                                    eventDate: "9th January 2020",
                                    eventLocation: "Sandy Hook, New Jersey",
                                    performers: "Sandy Hook Runs",
                                    about: "The 10k distance is a healthy challenge for new runners, and a few events will build up serious fitness. Set yourself the challenge of running an event in under an hour for a decent time and a good workout. ",
                                    bandLogo: "./images/coldplay.jpg" },
                                    { eventName: "Stillwater Half Marathon",
                                    eventDate: "21st May 2020",
                                    eventLocation: "Washington County - Mineapolis",
                                    performers: "Mineapolis Marathoners",
                                    about: "Since its first running in 1977, the Washington County Marathoner’s Hangover Half Marathon & Bill Hogan 3.5-Miler have become a New Year’s Day tradition for runners in Washington, boasting a field of some 200 runners each year for this usually cold-weather race.",
                                    bandLogo: "./images/beegees.jpg" },
                                    { eventName: "Boston Marathon",
                                    eventDate: "11th July 2020",
                                    eventLocation: "Boston",
                                    performers: "Boston Running Community",
                                    about: "The Boston Marathon is an annual marathon race hosted by several cities in greater Boston in eastern Massachusetts, United States.",
                                    bandLogo: "./images/linkinpark.jpg" }
                            ];
            break;
    }

    // Retturn the construted object back to the caller.
    return upcomingEvents;
}

function getHeroCardsForEvents(session) {

    // Get the list of upcoming events.
    var upcomingEvents = getEvents( session.privateConversationData.reservationEventType );

    var upcomingEventsHeroCards = [];
    for( iEventCounter = 0; iEventCounter < upcomingEvents.length; ++iEventCounter ){

        upcomingEventsHeroCards.push(
            new botBuilder.HeroCard(session)
                .title( "[" + upcomingEvents[iEventCounter].eventDate + "]" + " " + upcomingEvents[iEventCounter].eventName)
                .subtitle('By ' + upcomingEvents[iEventCounter].performers )
                .text( upcomingEvents[iEventCounter].about )
                .images([
                    botBuilder.CardImage.create(session, upcomingEvents[iEventCounter].bandLogo )
                ])
                .buttons([
                    botBuilder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/storage/', 'Register')
                ]));
    }
    return upcomingEventsHeroCards;
}


// TODO: Welcome message
// TODO: Image
// TODO: Adaptive cards to book a registration.