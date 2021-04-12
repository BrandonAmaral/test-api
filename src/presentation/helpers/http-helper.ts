import { HttpResponse } from '@/presentation/protocols';

export const ok = (data: any): HttpResponse => ({
  body: data,
  statusCode: 200,
});

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400,
});
