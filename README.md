# financial-record-lambda

This project contains source code and supporting files for a serverless application that anonymizes sensitive financial data, performs risk assessment calculations based on dynamic criteria, and securely stores the results.

- financial-record - Code for the application's Lambda function written in TypeScript.
  - src/anonymizer.ts - encrypts user details
  - src/dataEnrichment.ts - uses various APIs to collect regional data and currency exchange rate
  - src/riskAssessment.ts - uses the data collected in to give a riskScore that ranges from 0 - 10 with 10 having the highest risk
  - src/encryption.ts - uses crypto module to encrypt all the data
  - tests - unit tests for the application code
  - app.ts - contains the lambda funtion for the api
- events - Invocation events that you can use to invoke the function.
- template.yaml - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions and an API Gateway API. These resources are defined in the `template.yaml` file in this project.The AWS Toolkit is an open source plug-in for popular IDEs that uses the SAM CLI to build and deploy serverless applications on AWS.

## Deploy the sample application

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 20](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```
You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
financial-record-lambda$ sam build
```

The SAM CLI installs dependencies defined in `financial-record/package.json`, compiles TypeScript with esbuild, creates a deployment package, and saves it in the `.aws-sam/build` folder.


```bash
financial-record-lambda$ sam local invoke HelloWorldFunction --event events/event.json
```

## Unit tests

Tests are defined in the `financial-record/tests` folder in this project. Use NPM to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
financial-record-lambda$ cd financial-record
financial-record$ npm install
financail-record$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. 

```bash
sam delete --stack-name financial-record-lambda
```