const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.cjs':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const port = Number(process.env.PORT || 8001);
http.createServer((req,res)=>{
  let pathname = decodeURIComponent((req.url || '/').split('?')[0]);
  if (pathname === '/') pathname = '/index.html';
  const file = path.join(root, pathname.replace(/^\/+/, ''));
  fs.readFile(file, (error, data)=>{
    if (error) { res.statusCode = 404; res.end('Not found'); return; }
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
}).listen(port, '127.0.0.1');
