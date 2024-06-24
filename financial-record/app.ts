import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { anonymizeData } from './src/anonymizer';
import { encryptData } from './src/encryption';
import { assessRisk } from './src/riskAssessment';
import { enrichData } from './src/dataEnrichment';
import path from 'path'
import * as fs from 'fs'

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const transaction = JSON.parse(event.body || '{}');
        // Validate input data
        if (!transaction.transactionId || !transaction.userId || !transaction.transactionDetails || !transaction.userDetails) {
            return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid input data' }),
            };
        }
        const anonymizedData = anonymizeData(transaction.userDetails);
        const enrichedTransaction = await enrichData(transaction);
        const riskScore = await assessRisk(enrichedTransaction);

        const anonymizedDataString = JSON.stringify({
            ...transaction,
            userDetails: anonymizedData,
            riskScore,
        })

        const encryptedData = await encryptData(anonymizedDataString);

        const filePath = path.join('/tmp', `${transaction.transactionId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(encryptedData));
        //await s3.putObject({
        //    Bucket: bucketName,
        //    Body: fs.createReadStream(filePath),
        //    Key: `${transaction.transactionId}.json`,
        //    ServerSideEncryption: 'AES256',
        //}).promise();


        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Data processed successfully ' + JSON.stringify(encryptedData) ,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
