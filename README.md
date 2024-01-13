# BMI & Currency calculators

## Overview

This repository contains a simple website with two main functions: BMI (Body Mass Index) calculator, and a currency converter converts PLN to various other currencies. The currency conversion rates are fetched from the NBP (National Bank of Poland) API. The web application is written in Vue 3 and localized in Polish.

## Live Demo

Live version here: [BMI & Currency calculators](https://bascio.usermd.net)

# Screenshots

### BMI Calculator Tab
![BMI Calculator Tab screenshot](https://bascio.usermd.net/readme_assets/bmi-currency_calcualtors/tab_bmi.png)

### Currency Converter Tab
![Currency Converter Tab screenshot](https://bascio.usermd.net/readme_assets/bmi-currency_calcualtors/tab_currencies.png)

## Features

- **BMI Calculator**: This tool allows users to enter their weight, height, gender and age to calculate their Body Mass Index. After providing the necessary information, the BMI is displayed numerically and positioned within a BMI range scale to help users better understand their result in the context of health standards.
- **Currency Converter**: This feature allows users to convert amounts from PLN to various other currencies. Up-to-date exchange rates get directly from the NBP (National Bank of Poland) API.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## API Reference

This application uses the NBP API to retrieve currency exchange rates. You can learn more about the API [here](http://api.nbp.pl/).

## Localization

The site is entirely in Polish because I study in Polish :}
