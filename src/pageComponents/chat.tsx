import React from 'react'
import Card from '../components/card';
import 'antd/dist/antd.css';
import Input from '../components/input';
import Message, { message } from '../components/message';
import { ArrowRightOutlined } from '@ant-design/icons'
import { List } from 'antd';

export type user = {
  username: string
}

type state = {
  message: string
  messages: message[]
  messagesEndRef: any
};

type props = {
  readonly user: user
};

class ChatComponent extends React.Component<props, state> {
  constructor(props: props) {
    super(props)

    this.state = {
      message: "",
      messages: [],
      messagesEndRef: React.createRef()
    }
    // this.props.ws.addListener("JOIN_ROOM_RESPONSE", (data: any) => {
    // })
    // this.props.ws.addListener("MESSAGE_ROOM_RESPONSE", (data: any) => {
    // })
    // this.props.ws.joinRoom("demo")
    // this.props.ws.addListener("MESSAGE_ROOM", (data: message) => {
    //   this.setState({
    //     messages: [...this.state.messages, data],
    //   })
    //   this.state.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    // })
  }


  handlerMessage = (event: any) => {
    this.setState({ message: event.target.value });
    event.preventDefault();
  }
  handlerSubmit = (event: any) => {
    // this.props.ws.sendToRoom("demo", this.state.message)
    this.setState({
      message: ""
    })
    event.preventDefault();
  }

  render() {
    return (
      <Card radius={"10px"} minWidth={"100%"} bgColor={"#ffe0ff"} boxShadow={"7px 7px 3px #bea6d6, -1px -1px 1px #E0C3FC"}>
        <List
          split={false}
          style={{ height: "200px", overflow: "auto" }}
          itemLayout="horizontal"
          dataSource={this.state.messages}
          renderItem={(item: message, index: number) => (
            <>
              <List.Item style={item.from === this.props.user.username ? { padding: "0px", float: "right" } : { padding: "0px", float: "left" }}>
                <Message oldMessage={this.state.messages[index - 1]} message={item} me={item.from === this.props.user.username} />
              </List.Item>
              <div className="fix"></div>
            </>
          )}
        >
          <div ref={this.state.messagesEndRef} />
        </List>

        <Input value={this.state.message}
          handlerSubmit={this.handlerSubmit}
          onKeyDown={(event: any) => {
            if (event.key === 'Enter') {
              this.handlerSubmit(event)
            }
          }}
          float={"right"}
          onChange={this.handlerMessage}
          height={40}
          width={300}
          placeholder="Write ..."
          icon={<ArrowRightOutlined style={{ paddingRight: "10px", paddingLeft: "10px", fontSize: '2em', verticalAlign: "middle" }} />} />
      </Card>
    )
  }

}

export default ChatComponent;