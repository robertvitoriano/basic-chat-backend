import IMessage from "../interfaces/IMessage"
class Messages {

 public generateMessage = (message:string): IMessage => {

    return{
      message,
      timestamp: new Date().getTime()
    }
  }
  
}




export default new Messages()