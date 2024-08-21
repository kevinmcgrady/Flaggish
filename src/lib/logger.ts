'use server';

import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
});

type LoggerArgs = {
  message: string;
  journey: string;
  method?: string;
};

export const info = async ({ message, journey, method }: LoggerArgs) => {
  logger.info(`INFO::${message}`, { journey, method });
};

export const error = async ({ message, journey, method }: LoggerArgs) => {
  logger.error(`ERROR::${message}`, { journey, method });
};
