# Playboxd Frontend Documentation

Welcome to the Playboxd frontend documentation. This document provides an overview of the project setup, key features, including Storybook, and instructions on how to set up and run the project.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Key Features](#key-features)
- [Running Storybook](#running-storybook)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Contact](#contact)

## Introduction

This is a portfolio project to showcase what I learned as a fullstack developer. The frontend is built with Next.js and is part of a larger application inspired by Letterboxd, featuring UI components, authentication, and various interactive elements. Later on I will provide the figma file for the logos.

## Getting Started

### Prerequisites
- Node.js (version 18.0 or later)
- Yarn or npm

### Installation
0. Fork the repo

1. Install dependencies:
    ```sh
    yarn install or npm install
    ```

2. Create a `.env` file in the root directory and configure your environment variables as described in the [Environment Variables](#environment-variables) section.

3. Start the development server:
    ```sh
    yarn dev or npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Environment Variables

The following environment variables need to be configured in your `.env` file:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=google-client-secret
```
### Key Features

**Storybook**

Storybook is a development environment for UI components. It allows you to browse a component library, excellent choice for coordination in a big team

**OAuth Authentication**

The application supports OAuth authentication with Google.

**State Sync with URL**
The application synchronizes the UI state with the URL, ensuring a consistent experience and easy sharing of application states.

**UI Components and Design System*
The project includes a comprehensive set of UI components and a design system, making it easy to build and maintain a cohesive interface. Still needs a lot of improvments


### Running Storybook
To run Storybook and view the component library:

***Start Storybook:***

```
yarn storybook or npm run storybook
```
Open your browser and navigate to http://localhost:6006 to access Storybook.

### Running Tests

Currently only unit tests are available

```
yarn test or npm run test
```
### Deployment
The frontend is deployed on Vercel for more details refer to their documentation.

### Contact
Hit me at:

- **Email:** [paroniyan@gmail.com](mailto:your.email@example.com)
- **GitHub Repository:** [Playboxd Backend](https://github.com/YanParoni/backend-portfolio)
- **LinkedIn:** [Yan](https://www.linkedin.com/in/yan-paroni/)





