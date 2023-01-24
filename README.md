




# Athena Query Executer Lambda
- Build: Node.js Serverless Lambda
- Runtime: 14.x

### Deployment
- To deploy this lambda, go to the config folder and update the file with the corresponding environment you want to deploy.  An example would be, if you want to deploy the lambda to a clients dev environment then update the "dev.yml" file in the config folder.  
- This lambda deploys all resources needed so it doesn't require you to create anything within the console prior to deploying this lambda.
- The "table" variable in the dev, test, and prod yaml files will be used as the name of the dynamodb table. The serverless.yml file references the "table" variable and appends the stage to the end of it to create the name. An example of this would be if you set the "table" variable to "blocked-numbers" and deploy the dev stage, the dyanmodb table name will be "blocked-numbers-dev"
- The below scripts can be used to deploy the lambda once the config folder is updated.  

### Deployment Script
- sls deploy --stage dev --aws-profile riverside-dev
- sls deploy --stage prod --aws-profile riverside-prod

### Config yml variables
- accountId: 111111111111
- region: us-east-1
- table: blocked-numbers
