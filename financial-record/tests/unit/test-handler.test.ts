import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { expect, describe, it } from '@jest/globals';

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
            httpMethod: 'post',
            body: '{    \"transactionId\": \"TXN123456789\",    \"userId\": \"USER98765\",    \"transactionDetails\": {        \"amount\": 250.00,        \"currency\": \"USD\",        \"transactionDate\": \"2024-04-18T12:34:56Z\",        \"paymentMethod\": \"CreditCard\",        \"merchantDetails\": {            \"merchantId\": \"MERCHANT12345\",            \"name\": \"Example Merchant\",            \"category\": \"Electronics\",            \"countryCode\": \"US\"        }    },    \"userDetails\": {        \"firstName\": \"John\",        \"lastName\": \"Doe\",        \"email\": \"john.doe@example.com\",        \"phone\": \"+11234567890\",        \"billingAddress\": {            \"street\": \"123 Elm St\",            \"city\": \"Anytown\",            \"state\": \"CA\",            \"postalCode\": \"90210\",            \"country\": \"USA\"        }    },    \"additionalInfo\": {        \"deviceIp\": \"192.168.1.1\",        \"userAgent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\"    }}',
            headers: {},
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '/process',
            pathParameters: {},
            queryStringParameters: {},
            requestContext: {
                accountId: '123456789012',
                apiId: '1234',
                authorizer: {},
                httpMethod: 'post',
                identity: {
                    accessKey: '',
                    accountId: '',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    clientCert: {
                        clientCertPem: '',
                        issuerDN: '',
                        serialNumber: '',
                        subjectDN: '',
                        validity: { notAfter: '', notBefore: '' },
                    },
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '',
                    user: '',
                    userAgent: '',
                    userArn: '',
                },
                path: '/hello',
                protocol: 'HTTP/1.1',
                requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
                requestTimeEpoch: 1428582896000,
                resourceId: '123456',
                resourcePath: '/process',
                stage: 'dev',
            },
            resource: '',
            stageVariables: {},
        };
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
    });
});
