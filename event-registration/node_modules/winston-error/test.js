var expect = require('chai').expect;
var winston = require('winston');
var winstonError = require('./index');

// Add memory output.
winston.add(winston.transports.Memory);

describe('Error helper', function() {
  var logger;

  beforeEach(function () {
    logger = new winston.Logger({
      transports: [
        new winston.transports.Memory({json: true})
      ]
    });

    winstonError(logger);
  });

  it('should log error properly', function() {
    logger.error(new Error('test'));
    var logEntry = JSON.parse(logger.transports.memory.errorOutput[0]);
    expect(logEntry).to.have.deep.property('error.message', 'test');
    expect(logEntry).to.have.deep.property('error.stack');
    expect(logEntry).to.have.deep.property('error.code');
    expect(logEntry).to.have.property('message', 'test');
  });

  it('should keep metada', function() {
    logger.error(new Error('test'), {foo: 'bar'});
    var logEntry = JSON.parse(logger.transports.memory.errorOutput[0]);
    expect(logEntry).to.have.deep.property('error.message', 'test');
    expect(logEntry).to.have.deep.property('error.stack');
    expect(logEntry).to.have.deep.property('error.code');
    expect(logEntry).to.have.property('foo', 'bar');
    expect(logEntry).to.have.property('message', 'test');
  });
});