const { Consumer } = require("sqs-consumer");

const sqsConnection = require("./sqs");
const config = require("../config");

const queueUrl = `${config.awsHost}/queue/${config.queueName}`;

module.exports = function subscribe(handler) {
  const app = Consumer.create({
    queueUrl,
    sqs: sqsConnection,
    handleMessage: handler
  });

  app.start();
};
