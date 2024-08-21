'use server';

import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
});

export const Logger = async (message: string) => {
  logger.info(message);
};
