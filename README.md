# Hack&Stock - trading and educational platform

<img src="readme-src/homepage.png" style="border: 2px solid black">

[![All Contributors](https://img.shields.io/github/contributors/hackkosice/i-demoed-hk24?style=flat-square)](https://github.com/hackkosice/i-demoed-hk24/graphs/contributors)
[![Activity](https://img.shields.io/github/commit-activity/m/hackkosice/i-demoed-hk24?style=flat-square)](https://github.com/hackkosice/i-demoed-hk24/pulse)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![first-timers-only Friendly](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](http://www.firsttimersonly.com/)

## Introduction

This is a project created in a hackathon [Hack Kosice 2024](https://hackkosice.com/2024/) as a 24h challenge for [Tatra banka](https://www.tatrabanka.sk/) - the golden sponsor of the event. The instruction were, overall, to create an investing application with the focus of educating the client and to conviently use some AI-powered features.

We wanted to build a simple web app, that could **make a impact** for the people, that have little or no experience in investing or trading. We believe that with some knowledge, the trading can be **available for everyone**, no matter their budget, so we wanted to make it **more accessible** and to **educate** people about this activity.

Hack&Stock currently provides the mock trading with NASDAQ stocks. It also consists of a fun Snake game, where the client can receive tips on trading and points, for which the client can get a bunch of shares. As an extra educational feature, the app had got implemented a small quiz for training your knowledge about trading and investing.

Additionally it provides AI-generated tips based on the user's activity, portfolio and provided personal information.

## Tech stack

**Frontend** part is written React, TypeScript and pure CSS, all built with Vite.

While we use a few API services (OpenAI API, FinancialModelingPrep), they are being fetched in the Flask framework files. Next to the JavaScript, which is used in the Snake game implementation, these technologies are a part of the **backend** part.

We chose the Google Firebase as a **database** solution.

## How to launch it
Move to the root directory ``hack-kosice-24`` and run the script ``npm install``.
Then, run ``npm run dev`` and open a localhost on the port, which the latest command outputs.
*By default it should be http://localhost:5173/.*

To get the stock prices running, get the correct API key on financialmodelingprep.com website.

<!-- TODO - how to actually set up Firebase? xd-->
And finally, to run the database, the Firebase account...

## Contributors
**The Hack Kosice 2024 TBC team members are:**
[Alex Choi](https://github.com/alexechoi>)
[Andrii Popovych](https://github.com/andrek13)
[Nicol Fedurcová](https://github.com/NicolFedurcova)
[Zdeněk Vychodil](https://github.com/ZirkonCZ)
