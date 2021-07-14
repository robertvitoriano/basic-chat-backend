interface IUser{
  username:string
  id:string
  room:string
}

const users: IUser[] = [{id:'1',username:'robert',room:'12'}]

//add user

const addUser = ({username, id, room}:IUser)=>{

  username  = username.trim().toLowerCase()

  id  = id.trim().toLowerCase()

  room  = room.trim().toLowerCase()

  if( !username || !room) throw new Error('Username and room are required !')

  const existingUser = users.find((user)=>user.room === room && user.username === username )

  if(existingUser) throw new Error("username already in use !");

  const user = {username, id, room}

  users.push(user)

  return user
  
}

// remove user
const removeUser = (id)=>{

  const userToRemoveIndex = users.findIndex(user=> user.id ===id)

  users.splice(userToRemoveIndex, 1)

}
// get user
const getUser = (id)=>{

  const user  = users.find((user)=>user.id==id)

  return user

}

// get users in room
const getUsersInRoom = ({room})=>{

  const usersInRoom = users.filter((user)=>user.room===room)

  return usersInRoom
}
