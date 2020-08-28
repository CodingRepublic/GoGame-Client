import React, { FunctionComponent } from 'react'
import Text from '../components/text';

import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

type props = {
    username: string
};

const HeaderComponent: FunctionComponent<props> = ({ children, username }) => {
    return (
        <Row>
            <Col span={18}>
                <Text style={{ fontSize: "5em", fontWeight: 900, fontFamily: "Montserrat", textShadow: "-3px -3px 0px #ffe0ff" }} icon="✌️">
                    Hello
                </Text>
            </Col>

            <Col span={6} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Text style={{ fontSize: "3em", fontWeight: 900, fontFamily: "Montserrat", textShadow: "-3px -3px 0px #ffe0ff" }} icon="🧑‍💻">
                    {username}
                </Text>
            </Col>
        </Row>
    )
}

export default HeaderComponent;