
import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
import { IncomingMessage, ServerResponse } from 'http'

const publicDir = path.resolve(__dirname, 'public')
const server = http.createServer()

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  // 根据url返回不同的文件
  const requestUrl = request.url || ''
  let pathname = url.parse(requestUrl).pathname || ''
  // 如果是根路径，返回index.html
  if (pathname === '/') {
    pathname = '/index.html'
  }
  if (/\.html$/.test(pathname)) {
    response.setHeader('content-type', 'text/html;charset=utf-8')
  } else if (/\.js$/.test(pathname)) {
    response.setHeader('content-type', 'text/javascript;charset=utf-8')
  } else if (/\.css$/.test(pathname)) {
    response.setHeader('content-type', 'text/css;charset=utf-8')
  }
  fs.readFile(path.resolve(publicDir, pathname.slice(1)), (err, data) => {
    if (err) {
      response.statusCode = 404
      response.end()
    } else {
      response.end(data)
    }
  })
})

server.listen(8888)