// Copyright 2020 Pavan Dittakavi.
// The main source file for the 'EventBright' chatbot built via Microsoft Azure V3 framework.

// BotBuilder is the SDK in NodeJS for building a Bot in Azure.
// We would be using the version 3 of the BotBuilder SDK for this demo.
var botBuilder = require('botbuilder');
var eventRegistry = require('./eventRegistry');

// Get the adaptive card that is needed to receive the user details during ticket reservation.
const enterUserDetails = require('./resources/enteruserdetails.json');

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

server.get('/images/*', restify.plugins.serveStatic({
    directory: __dirname,
  }))

// We would be using the Bot memory storage for this example.
var inMemoryStorage = new botBuilder.MemoryBotStorage();

// This is an event registration application bot.
// We would use the default dialog for welcoming the user.
var bot = new botBuilder.UniversalBot(connector, [
    // Waterfall step 1: Greeting message!.
    function (session) {

        if (session.message && session.message.value) {
            // A Card's Submit Action obj was received
            processSubmitAction(session, session.message.value);
            return;
        }


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

bot.on('conversationUpdate',(message) => {
	if(message.membersAdded) {
		message.membersAdded.forEach(function(identity) {
			if(identity.id == message.address.bot.id){
			    bot.beginDialog(message.address,'greetTheUser');
			}
		})
	}
});

// Dialog to process the purchase of tickets for the selected event.
bot.dialog('buyTickets', [
    function (session) {
        var selectedEvent = session.message.text;
        session.privateConversationData.selectedEvent = selectedEvent.substring( "Buy Tickets For ".length );
        var msg = new botBuilder.Message(session)
                                .addAttachment(enterUserDetails);
        session.send(msg);
        session.endDialog();
    }
]).triggerAction({ matches: /buy\stickets/i });

// Dialog to process the confirmation of tickets for the selected event.
bot.dialog('confirmTickets', [
    function (session) {
        session.send("Your tickets for the event are successfuly reserved!. We will send them shortly to your email " + session.privateConversationData.userEmail + "." );
        session.endDialog();
    }
]).triggerAction({ matches: /final\sconfirmation\sof\stickets/i });

// Dialog to process the confirmation of tickets for the selected event.
bot.dialog('cancelConfirmationOfTickets', [
    function (session) {
        session.send("Hmm, how about browsing our event collection again for a different genre of event?.");
        session.beginDialog( 'askForSelectingAnEventType');
    }
]).triggerAction({ matches: /CancelTicketBooking/i });


// Dialog to greet the user.
bot.dialog('greetTheUser', [
    function (session) {
        session.send( "Greetings!. I am 'EverBright', an automated assistant from 'EventBright' team!." );
        session.endDialog();
    }
]);

// Dialog to ask the user name.
bot.dialog('askForUserName', [
    function (session) {
        botBuilder.Prompts.text( session, "Please tell me your name." );
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

// Dialog to ask the user to pick an event type.
bot.dialog('askForSelectingAnEventType', [
    function (session) {
        botBuilder.Prompts.choice(session,
            'Please select any event type to begin...',
            eventRegistry.EVENT_TYPES,
            { listStyle: botBuilder.ListStyle.button });
        },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

// Dialog to display the list of available events for a given event type for registration.
bot.dialog('listAvailableEvents', [
    function (session) {
        var cards = eventRegistry.getHeroCardsForEvents( session );

        // Create reply with Carousel AttachmentLayout
        var reply = new botBuilder.Message( session )
            .attachmentLayout( botBuilder.AttachmentLayout.carousel )
            .attachments( cards );

        session.send( reply );
        session.endDialog();
    }
]);


function processSubmitAction(session, value) {
    var defaultErrorMessage = 'Unexpected failure encountered, please try again!.';
    switch (value.type) {
        case 'bookTicketsAction':
            // Book tickets!
            session.privateConversationData.userName = value.userName;
            session.privateConversationData.userEmail = value.userEmail;
            session.privateConversationData.userPhoneNumber = value.userPhoneNumber;
            session.privateConversationData.noOfTickets = value.noOfTickets;
            confirmTickets( session );
            break;

        case 'cancelBookingAction':
            // Hotel selection
            session.send('Hmm, how about browsing our event collection again for a different genre of event?.');
            session.beginDialog( 'askForSelectingAnEventType');
            break;

        default:
            // A form data was received, invalid or incomplete since the previous validation did not pass.
            session.send(defaultErrorMessage);
    }
}

/**
 * Method to confirm with the user his preferences opted for a given event. This method also constructs a
 * receipt card containing the same information and displays it to the user.
 * @param  session The session for the current transaction.
 */
function confirmTickets(session) {

    eventRegistry.getSelectedEventDetails( session );
    var totalCost = Number(session.privateConversationData.noOfTickets) * Number(session.privateConversationData.eventPrice);
    var tax = 0.15 * Number(totalCost);
    var totalPayableAmount = Number(totalCost) + Number(tax.toPrecision(4));
    getTicketNumber( session );

    var receiptCard = new botBuilder.ReceiptCard(session)
        .title('Ticket Confirmation: ' + session.privateConversationData.selectedEvent )
        .facts([
            botBuilder.Fact.create(session, session.privateConversationData.ticketNumber, 'Ticket Number'),
            botBuilder.Fact.create(session, '$' + session.privateConversationData.eventPrice, 'Cost per ticket'),
            botBuilder.Fact.create(session, session.privateConversationData.noOfTickets, 'Number of tickets ordered' )
        ])
        .items([
            botBuilder.ReceiptItem.create(session, '$' + totalCost, 'Cost of tickets'),
            botBuilder.ReceiptItem.create(session, '$' + tax, 'Tax'),
            botBuilder.ReceiptItem.create(session, '$' + totalPayableAmount, 'Amount payable')
            .image(botBuilder.CardImage.create(session, 'http://localhost:3978/images/money.jpg')),
        ])
        .buttons([
            botBuilder.CardAction.imBack(session, 'Final Confirmation Of Tickets', 'Confirm Tickets'),
            botBuilder.CardAction.imBack(session, 'CancelTicketBooking', 'Cancel Tickets')
        ]);

        session.endDialog(
            new botBuilder.Message(session)
              .addAttachment(receiptCard));
    }

/**
 * Method to generate a TicketID for the user selection and add the same to session object.
 * @param  session The session for the current transaction.
 */
function getTicketNumber( session )
{
    var ticketNumber = String.fromCharCode(65+Math.floor(Math.random() * 26)) +
                       String.fromCharCode(65+Math.floor(Math.random() * 26)) +
                       Math.floor( Math.random() * 10000 );

    session.privateConversationData.ticketNumber = ticketNumber;
    return;
}