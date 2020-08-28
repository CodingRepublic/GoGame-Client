import React from 'react'

import { Dispatch, AnyAction, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IAppState } from "../store/reducers";

import AuthComponent from "../pageComponents/auth"
import DashboardComponent from "../pageComponents/dashboard"
import AppComponent, { user } from "../pageComponents/app"

import NotificationCenter from "../global/notification"

import Ws from '../websocket/ws'
import HeaderComponent from '../pageComponents/header';

const mapStateToProps = (state: IAppState): IAppState => {
    return {
        commonState: state.commonState,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
    },
    dispatch
);

type state = {
    username: string,
    password: string,
    //
};

type wsState = {
    ready: boolean,
    logged: boolean,

    user: user
};

type IState = {
    state: state,
    wsState: wsState,

    ws: Ws
}

class Home extends React.Component<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            state: {
                username: "",
                password: "",
            },
            ws: new Ws(this.handlerReady),
            wsState: {
                ready: false,
                logged: false,
                user: { username: "" }
            }
        }
    }

    handlerReady = () => {
        this.state.ws.addListener("LOGIN_RESPONSE", (data: any) => {
            console.log(data)
            this.setState({
                wsState: { ...this.state.wsState, logged: true, user: data.data },
            })
        })
        this.state.ws.addListener("ERROR", (data: any) => {
            NotificationCenter.getInstance().notificationErr(data.error)
            console.log(data)
        })
        this.setState({ wsState: { ...this.state.wsState, ready: true } })
    }

    handleUsername = (event: any) => {
        this.setState({ state: { ...this.state.state, username: event.target.value } });
    }
    handlePassword = (event: any) => {
        this.setState({ state: { ...this.state.state, password: event.target.value } });
    }

    handlerSubmit = (event: any) => {
        this.state.ws.login(this.state.state.username, this.state.state.password)
        this.setState({ state: { ...this.state.state, username: "", password: "" } })
        event.preventDefault();
    }

    _handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            this.handlerSubmit(event);
        }
    }

    render() {
        return (
            <>
                {this.state.wsState.ready ?
                    <>
                        <div style={{ width: "100%", paddingLeft: "50px", paddingTop: "50px", paddingRight: "50px" }}>
                            <HeaderComponent username={this.state.wsState.user.username} />
                        </div >
                        <div style={{ position: "absolute", top: "160px", right: "50px" }}>
                            <DashboardComponent />
                        </div >
                        {this.state.wsState.logged ?
                            <>
                                <div style={{ position: "absolute", bottom: "50px", right: "50px" }}>
                                    <AppComponent ws={this.state.ws} user={this.state.wsState.user} />
                                </div >
                            </>
                            :
                            <div style={{ position: "absolute", top: "160px", left: "50px" }}>
                                <AuthComponent username={this.state.state.username} password={this.state.state.password} handlerUsername={this.handleUsername} handlerPassword={this.handlePassword} handlerSubmit={this.handlerSubmit} />
                            </div >
                        }
                    </>
                    :
                    <></>
                }
            </>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);