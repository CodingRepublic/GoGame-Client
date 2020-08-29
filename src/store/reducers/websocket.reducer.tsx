import { User, Room, Message } from "../types/types"

export const READY = "READY"
export interface IREADY {
  type: typeof READY
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export interface ILOGIN_SUCCESS {
  type: typeof LOGIN_SUCCESS
  payload: User
}

export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS"
export interface ICREATE_ROOM_SUCCESS {
  type: typeof CREATE_ROOM_SUCCESS
  payload: Room
}

export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS"
export interface IJOIN_ROOM_SUCCESS {
  type: typeof JOIN_ROOM_SUCCESS
  payload: Room
}

export const ROOM_MESSAGE = "ROOM_MESSAGE"
export interface IROOM_MESSAGE {
  type: typeof ROOM_MESSAGE
  payload: Message
}

type Actions = IREADY
  | ILOGIN_SUCCESS
  | ICREATE_ROOM_SUCCESS
  | IJOIN_ROOM_SUCCESS
  | IROOM_MESSAGE

interface websocketState {
  ready: boolean
  user: User | undefined;
  room: Room | undefined;
  messages: Message[]
};

const websocketState = (
  state: websocketState = {
    ready: false,
    user: undefined,
    room: undefined,
    messages: []
  },
  action: Actions
): websocketState => {
  switch (action.type) {
    case READY:
      return {
        ...state, ready: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state, user: action.payload
      }
    case CREATE_ROOM_SUCCESS:
      return {
        ...state
      }
    case JOIN_ROOM_SUCCESS:
      return {
        ...state, room: action.payload
      }
    case ROOM_MESSAGE:
      return {
        ...state, messages: [...state.messages, action.payload]
      }
    default:
      return {
        ...state
      };
  }
};

export { websocketState };
