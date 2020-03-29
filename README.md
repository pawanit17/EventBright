# EventBright
A Bot that is built on Microsoft Bot Framework V3.0 that serves as a means for booking tickets for events like sports, meetup, movies etc.

## Introduction
My inspirations for this project are EventBrite (https://www.eventbrite.com/), MeetUp ( www.meetup.com ), BookMyShow ( www.bookmyshow.com ) which are websites for browsing and registering for different events/movies that are happening.screening in your area. I extended the same and created this bot, named it - 'EverBright' ( name of the project is EventBright, but the bot is named EverBright ), capable of making a reservation for different sort of events, activities etc.

The project is built on top of Microsfot Botframework V3, with NodeJS as the backend. Following are some really good examples of understanding these Bots and their underlying framework in more depth.

Conversational Flow:
https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-dialog-manage-conversation-flow?view=azure-bot-service-3.0

Principles of Bot Design:
https://docs.microsoft.com/en-us/azure/bot-service/bot-service-design-principles?view=azure-bot-service-3.0

Key concepts:
https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-concepts?view=azure-bot-service-3.0

## Using the project
Feel free to re-use the project and its contents as per your convenience. I only made this for exploring the bot framework myself.

## Starting the project
NodeJs: I used v12.12.0 for building this bot. So there you go: https://nodejs.org/en/download/
Bot Emulator: Download the latest Bot Emulator software from here: https://github.com/Microsoft/BotFramework-Emulator/releases

- ### Clone the repository
   Follow the instructions here: https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository
   ```bash
   git clone https://github.com/pawanit17/EventBright.git
   ```
    
- ### Install modules

    Navigate to the cloned repository and issue the below command.
    ```bash
    npm install
    ```

- ### Start the bot

    ```bash
    node app.js
    ```

## Project Execution Flow
### Happy Flow
This is the execution flow where the user successfully orders a ticket for a given event.
![](documentation/Happy%20Flow.png)

### Unhappy Flow
This depicts the flow where the user chose to not register for an event halfway through. The bot then asks the user if he is interested
in any other type of events by prompting the event options dialog again.
![](documentation/Unhappy%20Flow.png)

In this project, we have mainly used the following constructs from the Bot Framework V3.

#### User Prompts
The prompts are used to gather inputs from the user. Example of such a construct is 
```bash 
botBuilder.Prompts.text( session, "Please tell me your name." )
```
#### List Card
The list of option prompts are used to ask the user which event type he would like to book a ticket for.
```bash
botBuilder.Prompts.choice(session,
            'Please select any event type to begin...',
            eventRegistry.EVENT_TYPES,
            { listStyle: botBuilder.ListStyle.button })
```
#### A carousal of Hero Cards
A Hero Card is presented for each type of event that is avaialble for an event type - Sports, Movies, MeetUps etc. For a such event type having the cards displayed beside each other constitutes the carousal of Hero Cards.
```bash
        var cards = eventRegistry.getHeroCardsForEvents( session );

        // Create reply with Carousel AttachmentLayout
        var reply = new botBuilder.Message( session )
            .attachmentLayout( botBuilder.AttachmentLayout.carousel )
            .attachments( cards )
        session.send( reply )
```

#### Adaptive Card
To get the user details like name, email id, credit card details and the number of tickets for preparing the purchase of the tickets.
```bash        
        var selectedEvent = session.message.text;
        session.privateConversationData.selectedEvent = selectedEvent.substring( "Buy Tickets For ".length );
        var msg = new botBuilder.Message(session)
                                .addAttachment(enterUserDetails)
        session.send(msg)
```        
#### Receipt Card
To display the uesr selections along with the total price, we are using a Receipt Card.
```bash
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
        ])

        session.endDialog(
            new botBuilder.Message(session)
              .addAttachment(receiptCard))
 ```
