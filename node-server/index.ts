
import * as http from "http"
import { Buffer } from 'buffer'
import { IncomingMessage, ServerResponse } from 'http'

const server = http.createServer()

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  console.log("request received")
  console.log(request.method)
  console.log(request.url)
  console.log(request.headers)
  // get post data
  const postData: Buffer | string | any = []
  request.on('data', chunk => {
    postData.push(chunk);
  })
  request.on('end', () => {
    const body = Buffer.concat(postData).toString();
    console.log(body)
    response.setHeader('Content-Type', 'application/json')
    response.statusCode = 404
    response.write('404 Not Found\n')
    response.end(JSON.stringify({
      data: 'Hello World!'
    }))
  })
})

server.listen(8888)