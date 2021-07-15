interface IUser {
  username: string
  id: string
  room: string
}

class Users {

  private users: IUser[] = []

  public addUser = ({ username, id, room }: IUser) => {

    username = username.trim().toLowerCase()

    id = id.trim().toLowerCase()

    room = room.trim().toLowerCase()

    if (!username || !room) throw new Error('Username and room are required !')

    const existingUser = this.users.find((user) => user.room === room && user.username === username)

    if (existingUser) throw new Error("username already in use !");

    const user = { username, id, room }

    this.users.push(user)

    return user

  }


  public removeUser = ({ id }) => {

    const userToRemoveIndex = this.users.findIndex(user => user.id === id)

   const  user = this.users.splice(userToRemoveIndex, 1)
   
   return user[0]
  }

  public getUser = ({ id }) => {

    const user = this.users.find((user) => user.id == id)

    return user

  }

  public getUsersInRoom = ({ room }) => {

    const usersInRoom = this.users.filter((user) => user.room === room)

    return usersInRoom
  }

}

export default new Users()