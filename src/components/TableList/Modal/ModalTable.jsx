import {Table} from "antd";
import {useContext} from "react";
import {ModalContext} from "./ModalContext.js";
import {TableLocale, TableModalColumns} from "../../../config/config.jsx";

const ModalTable = function () {

    const {tableData, setRowsSelected} = useContext(ModalContext)

    const rowSelection = {
        onChange: setRowsSelected,
        getCheckboxProps(fila) {
            return {
                disabled: false,
            }
        }
    }

    return (
        <Table
            className="mt-3"
            scroll={{y: 280}}
            rowSelection={rowSelection}
            pagination={false} bordered striped locale={TableLocale} size={"small"} dataSource={tableData}
            columns={TableModalColumns}/>
    )
}

export default ModalTable;