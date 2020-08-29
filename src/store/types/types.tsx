export interface User {
  username: string
}
export interface Room {
  name: string
}
export interface Message {
  from: string,
  msg: string,
  time: string,
}

// ERROR
export type Error = string

// REQUEST
export interface LoginRequest {
  username: string
  password: string
}
export interface CreateRoomRequest {
  name: string
}
export interface JoinRoomRequest {
  name: string
}
export interface MessageRoomRequest {
  roomName: string
  msg: string
}