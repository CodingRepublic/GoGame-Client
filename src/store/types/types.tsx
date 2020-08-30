export interface user {
  username: string
}
export interface room {
  name: string
}
export interface message {
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
export interface RegisterRequest {
  username: string
  password: string
}
export interface CreateRoomRequest {
  name: string
}
export interface LeaveRoomRequest {
  name: string
}
export interface JoinRoomRequest {
  name: string
}
export interface MessageRoomRequest {
  room_name: string
  msg: string
}