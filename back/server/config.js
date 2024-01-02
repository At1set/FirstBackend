let config = {
  PORT: 8000,
  HOST: "192.168.0.191",
}

MYSQL_CONFIG = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'main',
  table: 'first_backend',
}

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.txt': 'text/plain; charset=utf-8',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'woff': 'application/font-woff',
    'woff2': 'application/font-woff2',
    'ttf': 'application/font-ttf',
    'eot': 'application/vnd.ms-fontobject',
    'otf': 'application/font-otf',
    'swf': 'application/x-shockwave-flash',
    'wasm': 'application/wasm',
}

module.exports = {
  config,
  MYSQL_CONFIG,
  mimeTypes,
}