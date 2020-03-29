// Copyright 2020 Pavan Dittakavi.
// The event registry for the 'EventBright' chatbot.

var botBuilder = require('botbuilder');

const EVENT_TYPE_CONCERT = 'Concerts Cohorts';
const EVENT_TYPE_SPORTS = 'Sports Events';
const EVENT_TYPE_MOVIE = 'Movie Mania';
const EVENT_TYPE_MEETUP = 'MeetUp Activities';
const EVENT_TYPE_FITNESS = 'Fitness & Health'
const EVENT_TYPES = [ EVENT_TYPE_CONCERT, EVENT_TYPE_SPORTS, EVENT_TYPE_MOVIE, EVENT_TYPE_MEETUP, EVENT_TYPE_FITNESS ];

var eventTypeToEventsMap = {};

// We build the data of our interest here. In a realistic usease, this would be coming from a database.
// Build the CONCERT events.
eventTypeToEventsMap[EVENT_TYPE_CONCERT] = [  { eventName: "AQUA - Live In Rotterdam",
eventDate: "27th March 2020",
eventLocation: "15 Saint Pieterslann",
performers: "AQUA",
about: "Aqua is a Danish-Norwegian Europop music group, best known for their 1997 multi-platinum crossover single 'Barbie Girl'. The group formed in 1989 and achieved crossover success around the globe in the late 1990s and early 2000s. The group released three albums: Aquarium in 1997, Aquarius in 2000 and Megalomania in 2011.",
logo: "/images/aqua.jpg",
eventPrice: "12" },
{ eventName: "Coldplay - Eindhoven Connect",
eventDate: "9th April 2020",
eventLocation: "12 Europalaan",
performers: "Coldplay",
about: "Coldplay are a British rock band that was formed in London in 1996.[1][2] Vocalist and pianist Chris Martin, guitarist Jonny Buckland, bassist Guy Berryman, and drummer Will Champion met at University College London and began playing music together from 1996 to 1998, first calling themselves Pectoralz and then Starfish before finally changing their name to Coldplay.",
logo: "/images/coldplay.jpg",
eventPrice: "14" },
{ eventName: "BeeGees - In Memorial @ Hague Beach",
eventDate: "21st April 2020",
eventLocation: "17th Beachlane",
performers: "Various Artists",
about: "The Bee Gees were a pop music group formed in 1958. Their lineup consisted of brothers Barry, Robin, and Maurice Gibb. The trio were especially successful as a popular music act in the late 1960s and early 1970s, and later as prominent performers of the disco music era in the mid-to-late 1970s.",
logo: "/images/beegees.jpg",
eventPrice: "16" },
{ eventName: "Linkin Part - Live In Utrecht",
eventDate: "11th May 2020",
eventLocation: "15 Utrecht Central Tower",
performers: "Linkin Park",
about: "Linkin Park is an American rock band from Agoura Hills, California. The band's current lineup comprises vocalist/rhythm guitarist Mike Shinoda, lead guitarist Brad Delson, bassist Dave Farrell, DJ/keyboardist Joe Hahn and drummer Rob Bourdon, all of whom are founding members.",
logo: "/images/linkinpark.jpg",
eventPrice: "16" }
];

// Build the SPORTS events.
eventTypeToEventsMap[EVENT_TYPE_SPORTS] = [  { eventName: "LaLiga - Barcelona vs Real Madrid",
eventDate: "27th June 2020",
eventLocation: "Santiago Bernabau",
performers: "LaLiga",
about: "The rivalry comes about as Madrid and Barcelona are the two largest cities in Spain, and they are sometimes identified with opposing political positions, with Real Madrid viewed as representing Spanish nationalism and Barcelona viewed as representing Catalan nationalism.[8][9] The rivalry is regarded as one of the biggest in world sport.",
logo: "/images/laliga.jpg",
eventPrice: "120" },
{ eventName: "BPL - Liverpool vs Chelsea",
eventDate: "9th February 2020",
eventLocation: "Anfield",
performers: "BPL",
about: "Liverpool travel to Chelsea for one of only two all Premier League meetings in the FA Cup Fifth Round, and for what is undoubtedly the standout tie. It pits first in the league against fourth, but does so at a time when both sides will have other things on their minds.",
logo: "/images/epl.jpg",
eventPrice: "120" },
{ eventName: "Cricket Ashes - Third Test",
eventDate: "21st May 2020",
eventLocation: "Edgbaston",
performers: "Ashes",
about: "The Ashes score remains at 1-0 after the second Test ended as a draw at Lord’s. The overall arching takeaway from the match was that rain will forever be the enemy of cricket purists. But, it was a relatively even contest between England and Australia, and a draw was invariably a fair result. It makes the third test a crucial match in this years Ashes series.",
logo: "/images/ashescricket.jpg",
eventPrice: "60" },
{ eventName: "French Open - Nadal vs Thiem",
eventDate: "11th June 2020",
eventLocation: "Roland Garris - Paris",
performers: "Tennis",
about: "Nadal is the reigning champion and had set his sights on defending it this year. The French Open would be the culmination of a hectic summer which will see players cram Wimbledon, the Tokyo Olympics, two Masters 1000 events and the US Open into their schedule.",
logo: "/images/frenchopen.jpg",
eventPrice: "250" }
]; 

// Build the MOVIE events.
eventTypeToEventsMap[EVENT_TYPE_MOVIE] = [  { eventName: "Avengers Infinity War",
eventDate: "27th March 2020",
eventLocation: "El Capitan Theater, Hollywood",
performers: "Marvel starcast",
about: "The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan.",
logo: "/images/avengersinfinitywar.jpg",
eventPrice: "18" },
{ eventName: "The Notebook",
eventDate: "9th April 2020",
eventLocation: "Rooftop Cinema Club - Los Angeles",
performers: "Ryan Gosling, Rachel McAdams",
about: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
logo: "/images/thenotebook.jpg",
eventPrice: "12" },
{ eventName: "Zodiac",
eventDate: "21st April 2020",
eventLocation: "17th Beachlane",
performers: "Robert Drowney Jr, Mark Ruffalo",
about: "Robert Graysmith, a cartoonist by profession, finds himself obsessively thinking about the Zodiac killer. He uses his puzzle-solving abilities to get closer to revealing the identity of the killer.",
logo: "/images/zodiac.jpg",
eventPrice: "15" },
{ eventName: "Moonlight",
eventDate: "11th May 2020",
eventLocation: "15 Utrecht Central Tower",
performers: "Mahershala Ali, Barry Jenkins",
about: "Chiron, a young African-American boy, finds guidance in Juan, a drug dealer, who teaches him to carve his own path. As he grows up in Miami, Juan's advice leaves a lasting impression on him.",
logo: "/images/moonlight.png",
eventPrice: "15" }
];

// Build the MEETUP events.
eventTypeToEventsMap[EVENT_TYPE_MEETUP] = [  { eventName: "The Walkers and Joggers Consortium",
eventDate: "12th March 2020",
eventLocation: "Adelaide",
performers: "EventBrite",
about: "This event is the monthly walking/jogging across the heart of Adelaide. We would begin at the Primark shopping complex and end at the riverside course. Interested?. Please join us.",
logo: "/images/walkersclub.jpg",
eventPrice: "6" },
{ eventName: "Python - Drone Programming",
eventDate: "19th April 2020",
eventLocation: "Canberra",
performers: "Meetup",
about: "Interested in Drone Programming?. We will explore the same via Python in this session. Please do not forget to bring your own laptop for the course as we will be using a software simulator during the course.",
logo: "/images/droneprogramming.jpg",
eventPrice: "4" },
{ eventName: "FinTech 2.0",
eventDate: "1st April 2020",
eventLocation: "Sydney",
performers: "Meetup",
about: "Want to invest in the stock market but do not know where to start?. Then this is the course for you. We are providing this first course free of cost to you and you can attend online as well.",
logo: "/images/fintech.jpg",
eventPrice: "4" },
{ eventName: "The Self Improvement Club",
eventDate: "11th May 2020",
eventLocation: "Melbourne",
performers: "WeWork",
about: "Welcome to The Self Improvers’ Club! Get ready to make friends with some really interesting people for great conversations and support on your personal development journey.",
logo: "/images/selfimprovement.jpg",
eventPrice: "6" }
];

// Build the FITNESS events.
eventTypeToEventsMap[EVENT_TYPE_FITNESS] = [  { eventName: "Martinsville 5K Run",
eventDate: "27th August 2020",
eventLocation: "Dallas County, Texas",
performers: "Martinsville Runners Association",
about: "The 5K run is a long-distance road running competition over a distance of five kilometres (3.107 mi). Also referred to as the 5K road race, 5 km, or simply 5K, it is the shortest of the most common road running distances.",
logo: "/images/5krun.jpg",
eventPrice: "15" },
{ eventName: "Run The Hook 10K Run",
eventDate: "9th January 2020",
eventLocation: "Sandy Hook, New Jersey",
performers: "Sandy Hook Runs",
about: "The 10k distance is a healthy challenge for new runners, and a few events will build up serious fitness. Set yourself the challenge of running an event in under an hour for a decent time and a good workout. ",
logo: "/images/10krun.jpg",
eventPrice: "16" },
{ eventName: "Stillwater Half Marathon",
eventDate: "21st May 2020",
eventLocation: "Washington County - Mineapolis",
performers: "Mineapolis Marathoners",
about: "Since its first running in 1977, the Washington County Marathoner’s Hangover Half Marathon & Bill Hogan 3.5-Miler have become a New Year’s Day tradition for runners in Washington, boasting a field of some 200 runners each year for this usually cold-weather race.",
logo: "/images/halfmarathon.jpg",
eventPrice: "17" },
{ eventName: "Boston Marathon",
eventDate: "11th July 2020",
eventLocation: "Boston",
performers: "Boston Running Community",
about: "The Boston Marathon is an annual marathon race hosted by several cities in greater Boston in eastern Massachusetts, United States.",
logo: "/images/marathon.jpg",
eventPrice: "18" }
];

/**
 * Method to get the events that are registered for a given event type.
 * @param  eventType The event type whose events are to be extracted.
 * @return An array of event objects for the given event type.
 */
function getEvents( eventType ) {
    // Return the construted object back to the caller.
    return eventTypeToEventsMap[eventType];
}

/**
 * Method to get the array of HeroCards for the specified event type.
 * @param  session The session for the transaction holding the corresponding event type.
 * @return An array of event objects for the given event type.
 */
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
                    botBuilder.CardImage.create(session, 'http://localhost:3978' + upcomingEvents[iEventCounter].logo )
                ])
                .buttons([
                    botBuilder.CardAction.imBack(session, 'Buy Tickets For ' + upcomingEvents[iEventCounter].eventName, 'Buy Tickets')
                ]));
    }
    return upcomingEventsHeroCards;
}

/**
 * Method to get all the event details for a specific event. The event specific attributes like
 * pricing, date, venue etc, would be registered on the session object in this method.
 * @param  session The session object for the transaction.
 */
function getSelectedEventDetails( session )
{
    var selectedEvent = session.privateConversationData.selectedEvent;
    var allEventsOfSelectedType = getEvents( session.privateConversationData.reservationEventType );
    for( iEventCounter = 0; iEventCounter < allEventsOfSelectedType.length; ++iEventCounter )
    {
        if( allEventsOfSelectedType[iEventCounter].eventName == selectedEvent )
        {
            session.privateConversationData.eventPrice = allEventsOfSelectedType[iEventCounter].eventPrice; 
            session.privateConversationData.eventDate = allEventsOfSelectedType[iEventCounter].eventDate;
            session.privateConversationData.eventLocation = allEventsOfSelectedType[iEventCounter].eventLocation;
        }
    }
}

// We need to export the below methods, constructs to other calling JS modules.
module.exports.getHeroCardsForEvents = getHeroCardsForEvents;
module.exports.getSelectedEventDetails = getSelectedEventDetails;
module.exports.EVENT_TYPES = EVENT_TYPES;