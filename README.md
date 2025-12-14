# 💰 Currency Exchange App

This is a money convertor app builded with **React, TypeScript e Vite.**

You can see this application running [here](https://currency-exchange-theta-one.vercel.app/)

## 🛠️ Configs & Building Local

To execute this project in your pc, follow the steps below:

### Requirements

- **Node.js**: Version 21 or higher.
- **API Key**: A valid api-key to access the API.

### Configuring Enviroments

Before running the application, you must configure your API KEY.

1. Create a file named `.env` on the root of project.
2. Follow the example on `.env.example` file.
3. Add ur KEY on the file:

```bash
VITE_CURRENCY_API_KEY=MY_API_KEY
```

## 🏃 Running the Project

After cloning the repository, open a terminal on the root of project and execute the following commands:

| Command    | Description                          |
| :--------- | :----------------------------------- |
| `yarn`     | Install all dependencies of project. |
| `yarn dev` | Start the development server.        |

After finishing running the commands, you can see the application running on:
http://localhost:5173/

## 🧪 Unit Tests

This project uses [Jest testing library](https://jestjs.io/docs/getting-started) to write unit tests. You can run them and change as desired.

### Executing the tests

- **Run all tests:**

```bash
yarn test
```

- **Run tests on a specific component:**
  you can provided the path of the component to execute a specific test case:

```bash
yarn test <path/of/component>
```

**Example:** To run test case of only `Autocomplete` component:

```bash
yarn test ./src/components/Autocomplete
```
