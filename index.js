const athenaClient = require('./awsClient');
const dotenv = require('dotenv');
dotenv.config();


const athenaQueryExecuter = async() => {
    const DATABASE = process.env.DATABASE; 
    const QUERY = process.env.QUERY;
    const OUTPUT = process.env.OUTPUT;

    const athenaParams = {
        QueryString: QUERY,
        QueryExecutionContext: {'Database': DATABASE},
        ResultConfiguration: {'OutputLocation': OUTPUT}
    }

    try {
        const response = await athenaClient.startQueryExecution(athenaParams).promise();
        console.log('=====athena response=====', response)
    } catch(error) {
        console.log('=====error=====', error)
    }

    return
}
athenaQueryExecuter();