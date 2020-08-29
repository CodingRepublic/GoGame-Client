import React, { FunctionComponent } from 'react'
import Text from '../components/text';
import Card from '../components/card';

import 'antd/dist/antd.css';
import Input from '../components/input';
import Message, { message } from '../components/message';

import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import ChatComponent, { user } from './chat';

type props = {

};

const AppComponent: FunctionComponent<props> = ({ children }) => {
  return (
    <Card radius={"10px"} minHeight={"100%"} minWidth={"100%"} bgColor={"#E0C3FC"} boxShadow={"7px 7px 3px #bea6d6, -7px -7px 3px #ffe0ff"}>
      {/* <ChatComponent  /> */}
    </Card>
  )
}

export default AppComponent;