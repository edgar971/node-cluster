const { SQS } = require("aws-sdk/clients/all");

const config = require("../config");

module.exports = new SQS({
  endpoint: config.awsHost,
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey",
  region: "region"
});
