require("colors");

const config = require("../config");
const sqsConnection = require("./sqs");

const queueUrl = `${config.awsHost}/queue/${config.queueName}`;

function createMessages(numberOfMessages) {
  return Array.from(Array(numberOfMessages).keys()).map(i => ({
    data: "This is a test",
    id: `${i}-${new Date().getTime()}`,
    shouldDie: false //i % 50 === 0
  }));
}

async function createQueues(sqs) {
  return sqs.createQueue({ QueueName: config.queueName }).promise();
}

async function purgeQueue(sqs) {
  sqs
    .purgeQueue({
      QueueUrl: queueUrl
    })
    .promise();
}

async function publishMessages(messages, sqs) {
  return Promise.all(
    messages.map(message =>
      sqs
        .sendMessage({
          MessageBody: JSON.stringify(message),
          QueueUrl: queueUrl
        })
        .promise()
    )
  );
}

async function publish(sqs) {
  const numberOfMessages = 500;
  console.log("Creating Queues".green.bold);
  await createQueues(sqs);
  // await purgeQueue(sqs);

  const messages = createMessages(numberOfMessages);
  console.log(`Publishing ${numberOfMessages} Messages to SQS`.cyan);
  await publishMessages(messages, sqs);
}

publish(sqsConnection);
