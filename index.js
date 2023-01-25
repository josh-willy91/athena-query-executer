const AWS = require('aws-sdk');
// const s3 = new AWS.S3();
// const athena = new AWS.Athena();
const { athenaClient, s3Client } = require('./awsClient');
const dotenv = require('dotenv');
dotenv.config();



// const athenaQueryExecuter = async() => {
module.exports.athenaQueryExecuter = async() => {
    console.log('=====Start Function=====')
    const DATABASE = process.env.DATABASE; 
    const QUERY = process.env.QUERY;
    const OUTPUT = process.env.OUTPUT;
    const OUTPUT_BUCKET = process.env.OUTPUT_BUCKET;


    const listBucketParams = {
        Bucket: OUTPUT_BUCKET,
        Prefix: "combinedData"
    };


    try {
        // list objects in S3 location "athena-contact-lens-results/combinedData"
        const response = await s3Client.listObjects(listBucketParams).promise();
        console.log('=====list bucket=====', response)

        // Loop through objects listed and delete each one
        if(response.Contents) {
            response.Contents.forEach(async(file) => {
                const deleteParams = {
                    Bucket: OUTPUT_BUCKET,
                    Key: file.Key
                };
                
                console.log(deleteParams, '=====deleteParams=====')

                try {
                    // Deleting object in bucket
                    const deleteObject = await s3Client.deleteObject(deleteParams).promise();
                    console.log(deleteObject, '=====deletedObject=====')
                } catch(error) {
                    console.log(error, '=====deletedObject error=====')
                }
            });
        }
    } catch(error) {
        console.log('=====list bucket error=====', error)
    }


    const athenaParams = {
        QueryString: QUERY,
        QueryExecutionContext: {'Database': DATABASE},
        ResultConfiguration: {'OutputLocation': OUTPUT}
    }


    try {
        const response = await athenaClient.startQueryExecution(athenaParams).promise();
        console.log('=====athena response=====', response)
    } catch(error) {
        console.log('=====startQueryExecution error=====', error)
    }


    console.log('=====End Function=====')
    return
}
// athenaQueryExecuter();