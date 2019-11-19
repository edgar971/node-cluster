const cluster = require("cluster");
const numOfProcesses = require("os").cpus().length;
var emoji = require("node-emoji");
require("colors");

const subscribeToSqs = require("./consumer");

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();
}

function masterProcess() {
  console.log(
    `${emoji.get("coffee")} Creating ${numOfProcesses} processes`.green.bold
  );

  // Log status every 3s
  setInterval(() => {
    console.log(
      `${Object.keys(cluster.workers).length} processes running`.yellow
    );
  }, 3000);

  // Create the initial worker processes
  for (let i = 0; i < numOfProcesses; i++) {
    cluster.fork();
  }

  // Create new worker process
  cluster.on("exit", worker => {
    console.log(
      `Worker ${worker.process.pid} ${emoji.get("skull")} died. Creating new one...`
        .cyan
    );
    cluster.fork();
  });
}

function childProcess() {
  const info = {
    pid: process.pid,
    isMaster: cluster.isMaster,
    isWorker: cluster.isWorker
  };
  console.log(
    `Created ${emoji.get("baby")} Child Process ${JSON.stringify(info)}`.yellow
  );
  subscribeToSqs(handleMessage);
}

async function handleMessage({ Body, MessageId }) {
  console.log(`Message ${MessageId} consumed by pid: ${process.pid}`.green);
  const message = JSON.parse(Body);
  if (message.shouldDie) {
    process.exit();
  }
}
