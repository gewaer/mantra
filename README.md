# Mantra

Mantra is a model-based tool to automate common frontend tasks such as components organization, data management and API communication in a single-page application.

## :mag_right: What's In This Document

- [Description](#-description)
- [Prerequisite](#-prerequisite)
- [Development setup](#-development-setup)
- [License](#-license)

## :book: Description

Mantra's goal is to reduce the development time of your project by abstracting and automating common tasks in SPAs, leaving you with more time to work on the UI experience, business logic and custom features.

To achieve the abstractions, we [mantra team] decided to make Mantra an interpreter of configuration files that will opinionate Mantra's processes. The configuration files allows to customize processes like the fetching, storing and distributioning of data within your single-page application.

## :warning: Prerequisite

- **Git** installed: See how to [set up git](https://help.github.com/en/github/getting-started-with-github/set-up-git)

- **Node.js** latest LTS installed: [Install Node](https://nodejs.org/en/download/)

- Verify that **npm** is installed: [See how to verify npm](https://www.npmjs.com/get-npm)

### :exclamation: Recommendations

- Use **SSH key** with Mantra (See how to [configure an ssh](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent))

## :computer: Development setup

To start working on Mantra you need to do the following steps:

1. **Clone repository**

    Using **HTTPS**

    ```bash
    git clone https://github.com/Gewaer/mantra.git
    ```

    Using **SSH**: ***(Recommended)***

    ```bash
    git clone git@github.com:Gewaer/mantra.git
    ```

2. **Install project dependencies**

    ```bash
    npm install
    ```

3. **Symlink Mantra to your local PC**

    ```bash
    npm link
    ```

4. **Symlink Mantra to your local project**

    Mantra as a tool needs an external project to develop it. With this command you are locally referencing mantra as a npm dependency of your project.

    ```bash
    npm link mantra
    ```

    **¿Want to know more about this step?** See this [document](https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557).

<br/>

<details>
    <summary>FAP (Frequently asked problems)</summary>

- If you **run your project** with Mantra linked as a dependency and the **bundling fails** because of `"Unknown plugin ..."` error.
  - _Must do_: In occasions like this, the **Mantra team must determine** the right solution for the scenario *(whether it is to install the dependencies or find another solution)*.
  - _Possible solution_: When that error occurs is because **new dependencies** needs to be **added to Mantra**.

</details>

## :memo: License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, Mctekk