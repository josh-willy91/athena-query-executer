const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

// Set the AWS Region.
const REGION = process.env.REGION

const CREDENTIALS = {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
};
// sessionToken: process.env.SECURITY_TOKEN,

// configure client region
AWS.config.update({region: REGION, credentials: CREDENTIALS});

// create ddb client
const athenaClient = new AWS.Athena()
const s3Client = new AWS.S3()


module.exports = {
    athenaClient, 
    s3Client
};
// module.exports = s3Client;