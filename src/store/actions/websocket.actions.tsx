import io from 'socket.io-client';

import { Dispatch } from "redux";
import { store } from "../index"
import { User, Error, Message, Room } from "../types/types"

import { LoginRequest, CreateRoomRequest, JoinRoomRequest, MessageRoomRequest } from "../types/types"

import { LOGIN_SUCCESS, ROOM_MESSAGE, CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS, READY } from "../reducers/websocket.reducer";
import NotificationCenter from '../../global/notification';

const ENDPOINT = "http://localhost:8080/";

const socket = io(ENDPOINT, {
  transports: ['websocket'],
  reconnection: false,
})

socket.on("connect", () => {

  socket.on("ERROR", (error: Error) => {
    NotificationCenter.getInstance().notificationErr(error)
  })

  socket.on(LOGIN_SUCCESS, (user: User) => {
    store.dispatch({ type: LOGIN_SUCCESS, payload: user });
  })

  socket.on(CREATE_ROOM_SUCCESS, (room: Room) => {
    store.dispatch({ type: CREATE_ROOM_SUCCESS, payload: room });
    store.dispatch({ type: JOIN_ROOM_SUCCESS, payload: room });
  })

  socket.on(JOIN_ROOM_SUCCESS, (room: Room) => {
    store.dispatch({ type: JOIN_ROOM_SUCCESS, payload: room });
  })

  socket.on(ROOM_MESSAGE, (msg: Message) => {
    store.dispatch({ type: ROOM_MESSAGE, payload: msg });
  })

  store.dispatch({ type: READY });
})


const Login = (username: string, password: string) => {
  const request: LoginRequest = { username: username, password: password }

  return async () => {
    socket.emit("LOGIN_REQUEST", request)
  };
}

const CreateRoom = (name: string) => {
  const request: CreateRoomRequest = { name: name }

  return async () => {
    socket.emit("CREATE_ROOM_REQUEST", request)
  };
}

const JoinRoom = (name: string) => {
  const request: JoinRoomRequest = { name: name }

  return async () => {
    socket.emit("JOIN_ROOM_REQUEST", request)
  };
}

const MessageRoom = (roomName: string, msg: string) => {
  const request: MessageRoomRequest = { roomName: roomName, msg: msg }

  return async () => {
    socket.emit("MESSAGE_ROOM_REQUEST", request)
  };
}

export const websocketActions = {
  Login,
  CreateRoom,
  JoinRoom,
  MessageRoom
};

