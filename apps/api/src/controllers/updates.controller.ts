import { validateEndpoint } from '@utils';
import type { RequestHandler } from 'express';
import { getUpdatesSchema } from '@types';

export const getUpdates: RequestHandler = validateEndpoint(
  { query: getUpdatesSchema },
  async (req, res) => {
    const { page, limit, status } = req.query;
    return res.json({
      page,
      limit,
      status,
    });
  }
);
