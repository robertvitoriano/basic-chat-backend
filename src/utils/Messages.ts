import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import IMessage from "../interfaces/IMessage"

class Messages {

  constructor() {
    dayjs.extend(utc)
    dayjs.extend(timezone)
  }

  public generateMessage = (message: string): IMessage => {

    return {
      message,
      timestamp: dayjs().tz('America/Sao_Paulo').format('HH:mm')
    }
  }

}

export default new Messages()