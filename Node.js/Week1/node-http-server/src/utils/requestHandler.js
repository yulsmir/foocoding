import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { getRequestData } from './getRequestData.js'
import { IncomingMessage, ServerResponse } from 'http'

/**
 * This function manage a HTTP request
 *
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
export const requestHandler = async (request, response) => {
  const { headers, method, url } = request
  const { address, port } = request.socket.server.address()
  const fullEndpoint = `http://${address}:${port}${url}`

  console.log(url)
  const path = url.split('/')[1]

  switch (path) {
    case 'users': {
      const usersPattern = new URLPattern({ pathname: '/users/:id' })
      const usersEndpoint = usersPattern.exec(fullEndpoint)
      const id = usersEndpoint?.pathname?.groups?.id

      switch (method) {
        case 'POST':
          const body = await getRequestData(request)

          break

        case 'GET':
          if (id) {
            console.log(`Getting An User By Id: ${id}`)
          } else {
            console.log('Getting All Users')
          }
        default:
          break
      }

      break
    }

    case 'posts': {
      const body = await getRequestData(request)
      const postsPattern = new URLPattern({ pathname: '/posts/:id' })
      const postsEndpoint = postsPattern.exec(fullEndpoint)
      const id = postsEndpoint?.pathname?.groups?.id

      console.log(`dealing with posts - id: ${postsEndpoint.pathname.groups.id}`)

      break
    }
  }

  const data = {
    error: ReasonPhrases.OK,
    message: 'sucess'
  }

  response.setHeader('Content-Type', 'application/json')
  response.statusCode = StatusCodes.OK

  response.write(JSON.stringify(data))
  response.end()
}