mvn install
aws s3 cp target/logger-lambda-package-1.0.0-SNAPSHOT.zip s3://aws-logger-deployments/logger-lambda.zip --profile davran
