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
