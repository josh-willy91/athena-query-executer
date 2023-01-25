const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const athena = new AWS.Athena();
const athenaClient = require('./awsClient');
const s3Client = require('./awsClient');
const dotenv = require('dotenv');
dotenv.config();



const athenaQueryExecuter = async() => {
// module.exports.athenaQueryExecuter = async() => {
    const DATABASE = process.env.DATABASE; 
    const QUERY = process.env.QUERY;
    const OUTPUT = process.env.OUTPUT;

    // console.log('=====s3 client=====', s3Client)

    const bucketParams = {
        Bucket: "athena-contact-lens-results",
        Prefix: "combinedData"
    };

    try {
        // list objects in S3 location "athena-contact-lens-results/combinedData"
        const response = await s3Client.listObjects(bucketParams).promise();
        console.log('=====list bucket=====', response)

        // Loop through objects listed and delete each one
        if(response.Contents) {
            response.Contents.forEach(async(file) => {
                const deleteParams = {
                    Bucket: "athena-contact-lens-results",
                    Key: file.Key
                };
                
                console.log(deleteParams, '=====deleteParams=====')

                try {
                    // Deleting object in bucket
                    // const deleteObject = await s3Client.deleteObject(deleteParams).promise();
                    // console.log(deleteObject, '=====deletedObject=====')
                } catch(error) {
                    console.log(error, '=====deletedObject error=====')
                }
            });
        }
    } catch(error) {
        console.log('=====list bucket error=====', error)
    }


    // try {
    //     const response = await s3.listObjects(bucketParams).promise();
    //     console.log('=====list bucket=====', response)
    // } catch(error) {
    //     console.log('=====list bucket error=====', error)
    // }

    const athenaParams = {
        QueryString: QUERY,
        QueryExecutionContext: {'Database': DATABASE},
        ResultConfiguration: {'OutputLocation': OUTPUT}
    }

    // try {
    //     const response = await athenaClient.startQueryExecution(athenaParams).promise();
    //     console.log('=====athena response=====', response)
    // } catch(error) {
    //     console.log('=====error=====', error)
    // }

    try {
        const response = await athenaClient.startQueryExecution(athenaParams).promise();
        console.log('=====athena response=====', response)
    } catch(error) {
        console.log('=====startQueryExecution error=====', error)
    }


    return
}
athenaQueryExecuter();