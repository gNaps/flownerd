# FLOWNERD

## Overview

Flownerd is an Angular application that enables users to manage their videogames library. Users can add games to their personalized dashboard, called FLOW, and assign each game a status such as "To Buy," "To Play," "In Progress," "Completed," or "100%"

The application uses the RAWG API for video game searches and saves data locally in the browser's IndexedDB using web APIs.

## Getting Started

Follow these steps to run the project locally:

1. **Install Dependencies:**

   ```bash
   yarn install
   ```

2. **Set the api key:**

   Update the file src/environments/environments.ts with the real secret key of RAWG.

3. **Run the Application:**

   ```bash
   yarn start
   ```

   The application will be accessible at `http://localhost:4200/`.

## Running Tests

To execute tests, use the following command:

```bash
yarn test
```

## Figma mockups

https://www.figma.com/file/DfFjDb0ELpibYKVmZBWwwo/FLOWNERD?type=design&node-id=0%3A1&mode=design&t=p2hwWwntJ5332JeH-1
