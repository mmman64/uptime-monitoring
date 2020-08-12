# What?

- Makes use of AWS Lambda Function and CloudWatch to generate custom metrics (similar to pingdom.com):
  - Successful response
  - Latency

# Why?

- An exercise to familiarise myself with Serverless

# How?

- `yarn install` to download packages
- `yarn package` to zip the code
- Upload it to a Lambda Function
- Configure the environment variables (URL and SERVICE_NAME)
- Configure CloudWatch Events (schedule interval)
- Configure the permissions for the Lambda Function's IAM role to include:

```
{
  "Effect": "Allow",
  "Action": "cloudwatch:PutMetricData",
  "Resource": "*"
}
```
