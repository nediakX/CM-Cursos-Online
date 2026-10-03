/**
 * Vercel Function: recibe todas las peticiones a /api/* (ver vercel.json) y
 * las entrega al router de server/app.ts.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { atender } from '../server/app.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { __path, ...resto } = req.query;
  const ruta = typeof __path === 'string' ? __path : new URL(req.url ?? '/', 'http://x').pathname.replace(/^\/api/, '');
  const query = Object.fromEntries(Object.entries(resto).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));
  const auth = req.headers.authorization;

  const r = await atender({
    method: req.method ?? 'GET',
    path: `/${ruta.replace(/^\/+/, '')}`,
    query,
    body: req.body,
    token: auth?.startsWith('Bearer ') ? auth.slice(7) : null,
  });

  res.setHeader('Cache-Control', 'no-store');
  if (r.status === 204) res.status(204).end();
  else res.status(r.status).json(r.body);
}
