import React from 'react'

import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IAppState } from "../store/reducers";
import { commonState } from "../store/reducers/common.reducer";

import AuthComponent from "../pageComponents/auth"
import DashboardComponent from "../pageComponents/dashboard"

import NotificationCenter from "../global/notification"

import HeaderComponent from '../pageComponents/header';
import AppComponent from '../pageComponents/app';
import { Row, Col } from 'antd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { websocketState } from '../store/reducers/websocket.reducer';

const mapStateToProps = (state: IAppState): IAppState => { return { ...state, }; };
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
  },
  dispatch
);

interface props {
  commonState: commonState,
  websocketState: websocketState
}

const RoomPage: React.FC<props> = ({ commonState, websocketState }) => {
  let { id } = useParams();

  return (
    <>
      {id}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);