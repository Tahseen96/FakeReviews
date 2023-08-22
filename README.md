# Puppeteer Automation with Apify

This repository contains a script that automates the process of filling out a product review form on a specific website using Puppeteer in conjunction with Apify.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Code Explanation](#code-explanation)
6. [Important Notes](#important-notes)

## Overview

The script performs the following operations:

- Initializes the Apify actor.
- Retrieves review records using a helper function.
- Launches a Puppeteer browser instance and navigates to the target review URL.
- Fills out the review form using provided record data.
- Captures a screenshot of the filled-out form.
- Saves the screenshot to Apify's default key-value store.
- Gracefully closes the browser and exits the actor.

## Prerequisites

- Node.js
- Apify SDK
- Crawlee package (for Puppeteer utility functions)

## Installation

1. **Clone the Repository**:


```bash
# Clone the repository:
git clone [repository_link]
cd [repository_name]

# Install dependencies:
npm install
```

## Usage

1. Set up necessary environment variables, especially if using API keys or accessing external services.
2. Execute the script:

```bash
# To run the script:
node [script_name].js
```

3. Upon completion, review the default key-value store for the captured screenshot.

## Code Explanation

- **`getRecords()` Function**: Retrieves review data records utilized in form completion.
- **Navigation**: The script directs the browser to a designated URL hosting the review form.
- **Form Completion**: Using XPath selectors, the script locates and fills in various input fields and buttons, using data from the `records`.
- **Screenshot**: After populating the form, a screenshot gets captured and subsequently saved to the default key-value store.

## Important Notes

Ensure the proper environment setup and requisite permissions to interface with external services.

