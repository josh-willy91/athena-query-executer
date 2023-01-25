

# Athena Query Executer Lambda
- Build: Node.js Serverless Lambda
- Runtime: 14.x

### Deployment
- To deploy this lambda, go to the config folder and update the file with the corresponding environment you want to deploy.  An example would be, if you want to deploy the lambda to a clients dev environment then update the "dev.yml" file in the config folder.  
- This lambda deploys all resources needed so it doesn't require you to create anything within the console prior to deploying this lambda.
- The below scripts can be used to deploy the lambda once the config folder is updated.  

### Deployment Script
- sls deploy --stage dev --aws-profile riverside-dev
- sls deploy --stage prod --aws-profile riverside-prod

### Config yml variables
- accountId: 111111111111
- region: us-east-1
- DATABASE: "contact-lens-analysis"
- QUERY: 'SELECT * FROM "AwsDataCatalog"."contact-lens-analysis".contactlens
- OUTPUT: "s3://thisIsAnS3Location"
- OUTPUT_BUCKET: "another-s3-location"

### Run Locally
- In order to run the this project locally for testing, you will need to comment in/out several sections in the index file.  All areas that will need commenting in/out have notes by them.  You can search for the word "Comment" to find all areas that will need adjusting.  You will also need to make sure the awsClient.js file is accurate.  Once all this is done then you can run locally with the below command.

- Run locally command: node index.js
