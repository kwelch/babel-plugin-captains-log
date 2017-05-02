let logger = console;
logger.warn(a);
logger = customLogger();
logger.log(b);

const { warn, log } = console;
warn(a);
log(b);
