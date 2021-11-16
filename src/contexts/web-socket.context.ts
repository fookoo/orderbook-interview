import { Websocket, WebsocketBuilder } from 'websocket-ts'

let instance: Promise<Websocket>

const getInstance = (): Promise<Websocket> => {
  if (!instance) {
    instance = new Promise<Websocket>((success, fail) => {
      const ws = new WebsocketBuilder('wss://www.cryptofacilities.com/ws/v1')
        .onOpen(() => {
          success(ws)
        })
        .onError(fail)

        .build()
    })
  }
  return instance
}

export const WebSocketInstance = getInstance
