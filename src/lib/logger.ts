'use server';

import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
});

export const Logger = async (message: string) => {
  logger.info(message);
};
