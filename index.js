const aws = require('aws-sdk');
const s3 = new aws.S3();
const athenaClient = require('./awsClient');
const dotenv = require('dotenv');
dotenv.config();


// Add new query
// Add database of ctr files
// Place query result in S3 buckt for ODBC connection
// Check if a file is in the S3 bucket and if so then delete before adding the new file

// const athenaQueryExecuter = async() => {
module.exports.athenaQueryExecuter = async() => {
    const DATABASE = process.env.DATABASE; 
    const QUERY = process.env.QUERY;
    const OUTPUT = process.env.OUTPUT;

    const bucketParams = {
        Bucket: "athena-contact-lens-results",
    };

    try {
        const response = await s3.listObjects(bucketParams).promise();
        console.log('=====list bucket=====', response)
    } catch(error) {
        console.log('=====list bucket error=====', error)
    }

    // const athenaParams = {
    //     QueryString: QUERY,
    //     QueryExecutionContext: {'Database': DATABASE},
    //     ResultConfiguration: {'OutputLocation': OUTPUT}
    // }

    // try {
    //     const response = await athenaClient.startQueryExecution(athenaParams).promise();
    //     console.log('=====athena response=====', response)
    // } catch(error) {
    //     console.log('=====error=====', error)
    // }

    // return
}
// athenaQueryExecuter();