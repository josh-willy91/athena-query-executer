const AWS = require('aws-sdk');
// Uncomment imports below before deploying
const S3 = new AWS.S3();
const Athena = new AWS.Athena();
// Uncomment import below to test locally
// const { Athena, S3 } = require('./awsClient');
const dotenv = require('dotenv');
dotenv.config();


// Comment out "const athenaQueryExecuter" to deploy and comment out "module.exports.athenaQueryExecuter" to test locally
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
        const response = await S3.listObjects(listBucketParams).promise();
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
                    const deleteObject = await S3.deleteObject(deleteParams).promise();
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
        const response = await Athena.startQueryExecution(athenaParams).promise();
        console.log('OutputLocation:', OUTPUT, '=====athena response=====', response)
    } catch(error) {
        console.log('=====startQueryExecution error=====', error)
    }


    console.log('=====End Function=====')
    return
}
// Uncomment to test locally
// athenaQueryExecuter();