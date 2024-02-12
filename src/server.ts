import http, { IncomingMessage, ServerResponse } from 'node:http';
import { resolveRoute } from './router';

export const startServer = () => {
  const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      if (req.method === 'OPTIONS') {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200);
        res.end();
        return;
      }

      resolveRoute(req, res);
    },
  );

  server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
  });
};
