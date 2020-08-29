import React, { FunctionComponent, useState } from 'react'

import Card from '../components/card';
import Input from "../components/input"

import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IAppState } from "../store/reducers";
import { websocketActions } from "../store/actions/websocket.actions";


import { ArrowRightOutlined } from '@ant-design/icons'

import { Space } from 'antd';
import 'antd/dist/antd.less';

const mapStateToProps = (state: IAppState): IAppState => { return { ...state, }; };
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    login: (username: string, password: string) => websocketActions.Login(username, password)
  },
  dispatch
);

type props = {
  login: (username: string, password: string) => void
};

const defaultState = (): {
  usernameField: string
  passwordField: string
} => {
  return {
    usernameField: "",
    passwordField: ""
  }
}

const AuthComponent: FunctionComponent<props> = ({ children, login }) => {
  const [state, setState] = useState(defaultState())

  const handlerUsername = (event: any) => {
    setState({ ...state, usernameField: event.target.value });
  }
  const handlerPassword = (event: any) => {
    setState({ ...state, passwordField: event.target.value });
  }

  const handlerSubmit = (event: any) => {
    login(state.usernameField, state.passwordField)
    setState({ ...state, usernameField: "", passwordField: "" })

    event.preventDefault();
  }

  return (
    <Card bgColor={"#E0C3FC"} boxShadow={"7px 7px 3px #bea6d6, -7px -7px 3px #ffe0ff"}>
      <form onSubmit={handlerSubmit}>
        <Space size="middle" direction="vertical">
          <Input value={state.usernameField}
            onChange={handlerUsername}
            handlerSubmit={handlerSubmit}
            onKeyDown={(event: any) => {
              if (event.key === 'Enter') {
                handlerSubmit(event)
              }
            }}
            height={50}
            placeholder="Username" />

          <Input value={state.passwordField}
            handlerSubmit={handlerSubmit}
            onKeyDown={(event: any) => {
              if (event.key === 'Enter') {
                handlerSubmit(event)
              }
            }}
            onChange={handlerPassword}
            type="password" height={50}
            placeholder="Password"
            icon={<ArrowRightOutlined style={{ paddingRight: "10px", paddingLeft: "10px", fontSize: '2em', verticalAlign: "middle" }} />} />
        </Space >
      </form>
    </Card>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);



