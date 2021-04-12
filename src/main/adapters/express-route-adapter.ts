import { Request, Response } from 'express';

import { Controller } from '@/presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest = {
      ...(request.body || {}),
      ...(request.params || {}),
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
