var _ = require('lodash');

/**
 * Expose module.
 */

module.exports = function errorLoggerWrapper(logger) {
  var originalErrorLogger = logger.error;

  logger.error = function errorRewriter(message, metadata) {
    if (! (message instanceof Error))
      return originalErrorLogger.apply(logger, arguments);

    var error = message;

    // Keep original metadata safe.
    metadata = _.clone(metadata || {});

    // Set the code to null by default.
    error.code = _.isUndefined(error.code) ? null : error.code;

    // Add error in metadata.
    metadata.error = _.pick(error, 'message', 'stack', 'code');

    // Replace message by error message.
    message = error.message;

    // Log error.
    var args = [message, metadata].concat(_.rest(arguments, 2));
    originalErrorLogger.apply(logger, args);
  };
};