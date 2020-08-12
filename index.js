const aws = require('aws-sdk');
const axios = require('axios');

const serviceName = process.env.SERVICE_NAME;
// url of a service to test
const url = process.env.URL;

// CloudWatch client
const cloudwatch = new aws.CloudWatch();

exports.handler = async event => {
  let endTime;
  let isRequestSuccessful;

  const startTime = timeInMs();

  try {
    await axios.get(url);
    isRequestSuccessful = true;
  } catch (err) {
    isRequestSuccessful = false;
  } finally {
    // get endTime regardless of success
    endTime = timeInMs();
  }

  const totalTime = endTime - startTime;

  await cloudwatch
    .putMetricData({
      MetricData: [
        {
          MetricName: 'Success',
          Dimensions: [
            {
              Name: 'ServiceName',
              Value: serviceName,
            },
          ],
          Unit: 'Count',
          Value: isRequestSuccessful ? 1 : 0,
        },
      ],
      Namespace: 'MM/Serveless',
    })
    .promise();

  await cloudwatch
    .putMetricData({
      MetricData: [
        {
          MetricName: 'Latency',
          Dimensions: [
            {
              Name: 'ServiceName',
              Value: serviceName,
            },
          ],
          Unit: 'Milliseconds',
          Value: totalTime,
        },
      ],
      Namespace: 'MM/Serveless',
    })
    .promise();
};

function timeInMs() {
  return new Date().getTime();
}
