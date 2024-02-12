import { ServerResponse } from 'http';
import { RouteHandler, GetUserInfoRequest, RouteParams } from 'models';

function isParam(part: string): boolean {
  return part.startsWith('{') && part.endsWith('}');
}

const routes: { [key: string]: RouteHandler } = {};

const addRoute = (
  method: string,
  path: string,
  handler: RouteHandler,
): void => {
  routes[method + ' ' + path] = handler;
};

const resolveRoute = (req: GetUserInfoRequest, res: ServerResponse) => {
  try {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const path = url.pathname || '';

    const route = Object.keys(routes).find((route) => {
      const [method, routePath] = route.split(' ');
      const params: RouteParams = {};
      if (!routePath) {
        return false;
      }
      const routeParts = routePath.replace(/^\/|\/$/g, '').split('/');
      const urlParts = path.replace(/^\/|\/$/g, '').split('/');

      if (method !== req.method || routeParts.length !== urlParts.length) {
        return false;
      }

      for (let i = 0; i < routeParts.length; i++) {
        const routePart = routeParts[i];
        const urlPart = urlParts[i];

        if (!routePart || !urlPart) return false;

        if (routePart !== urlPart && !isParam(routePart)) return false;
        if (isParam(routePart)) params[routePart.slice(1, -1)] = urlPart;
      }

      req.params = params;
      return true;
    });

    if (route) {
      const handler = routes[route];
      if (handler) {
        handler(req, res);
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
};

export { addRoute, resolveRoute };
