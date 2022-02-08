const logger = require("./server");

function logWS(socket, next) {
  let user;

  try {
    user = socket.request.user || { email: "visitor" };
  } catch (err) {}
  logger.info({
    message: `Connection Established`,
    user: user.email,
    namespace: socket.nsp.name,
    timestamp: new Date().toString(),
  });

  next();
}

module.exports = logWS;
