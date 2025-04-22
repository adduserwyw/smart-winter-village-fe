# Smart Winter Village FE

This is a React Native/Expo application designed primarily for TV platforms. It allows users to interact with features like mood-based music generation and potentially weather information, connecting to a backend API for dynamic content.

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [License](#license)
- [Contact](#contact)

## Features

-   **Weather Display:** Fetches and displays current weather information. 
-   **Mood-Based Music Generation:** Select a vibe (Fun, Energetic, Romantic, Calm) to generate AI-powered music via a backend API.  
-   **Frozen Path Monitoring:** Displays real-time path temperature and ice warnings from an API .
-   **Aurora Forecast:** Shows Aurora Borealis forecast details including KP index, visibility, and viewing tips.
-   **Guest Service Requests:** Allows users to request services (Room Service, Housekeeping, Concierge, Maintenance), view existing requests, and submit new ones via an API.
-   **Property Information:** Presents a detailed list of property amenities grouped by category in an accordion interface.
-   **TV Optimized UI:** Built with React Native and Expo, suitable for TV displays.
-   **Audio Visualization:** Includes a simple visualization component when music is playing.
-   **API Integration:** Connects to a backend service for data.


## Prerequisites

-   [Node.js](https://nodejs.org/) (LTS recommended)
-   [Yarn](https://yarnpkg.com/) 
-   [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli` or `yarn global add expo-cli`)
-   A compatible TV device/emulator or web browser.


## Getting Started

To set up the project locally, follow these steps:

- **Clone the Repository:**  
  ```
    git clone https://github.com/adduserwyw/smart-winter-village-fe.git
  ```

- **Install Dependencies:**  
  Use yarn (preferred) or npm to install the required packages.  
  ```
    yarn install
  ```  
  or  
  ```
    npm install
  ```
- **Configure API Endpoint:**

  Change the API address in `config.js` to your backend api address.  
  ```
  const ENV = {
        development: {
                apiUrl: 'api_address',
        },
        production: {
                apiUrl: 'api_address',
        }
    };
  ```

- **Run Prebuild Script:**  
  Before starting the application, run the prebuild script to ensure everything is set up correctly.  
  ```
    yarn prebuild
  ```

- **Run the Application:**  
  Launch the development server using the following command:  
  ```
    yarn android
  ```
  This command starts the Metro bundler, letting you run the app on an emulator or a connected device.

## Project Structure

The repository is structured as follows:

| Folder/File           | Description                                  |
| --------------------- |----------------------------------------------|
| `__tests__/`         | Unit tests and test configuration files      |
| `assets/`             | Static assets (images, icons, etc.)          |
| `public/`             | Publicly available resources                 |
| `src/`                | Main source code for the application         |
| `App.tsx`             | Primary entry point of the application       |
| `package.json`        | Project metadata and dependency settings     |
| `babel.config.js`     | Babel configuration for transpiling code     |
| `metro.config.js`     | Metro bundler configuration for React Native |
| `jest.config.js`      | Jest configuration for running tests         |
| `tsconfig.json`       | TypeScript compiler configuration            |

## Available Scripts

Here are some key scripts for working with the project:

| Script          | Description                                           |
|-----------------|-------------------------------------------------------|
| `yarn test`     | Runs the Jest test suite                              |
| `yarn prebuild` | Builds the application for development and production |
| `yarn android`  | Starts the development server and Metro bundler       |

## Testing

The project is set up for testing with Jest. To run the tests, execute:

```
yarn test
```

Test files are located in the `__tests__/` directory and follow the configuration outlined in `jest.config.js`.

## License

This project does not currently include a license file. Please add one to clarify usage and distribution rights.

## Contact

For any questions or further information, please open an issue on this repository.
