const wrapMiddlewareForSocketIo = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

module.exports = wrapMiddlewareForSocketIo;
