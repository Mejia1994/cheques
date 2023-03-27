import {Col, Row} from "antd";
import TableList from "./TableList/Index/Index.jsx";
import Count from "./Count/Index.jsx";
import {useEffect} from "react";

function App() {

    useEffect(function () {
    }, []);

    return (
        <div className="App">
            <Row>
                <Col span={17} style={{background: "cbcbcbcb", padding: '3rem'}}>
                    <TableList/>
                </Col>
                <Col span={7} style={{padding: '3rem'}}>
                    <Count/>
                </Col>
            </Row>
        </div>
    )
}

export default App
