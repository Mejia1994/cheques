import {Table} from "antd";
import {Fragment, useEffect, useState} from "react";
import {IndexTableColumns, TableLocale} from "../../../config/config.jsx";
import PopupTable from "./PopupTable.jsx";
import EstadoModal from "./EstadoModal.jsx";
import {EstadoContext} from "./EstadoContext.js";
import DocumentosModal from "./DocumentosModal.jsx";

const IndexTable = function ({data}) {

    const [state, setState] = useState({
        popup: {
            visible: false,
            x: 0, y: 0
        }
    });

    const [contextState, setContextState] = useState({estadoModalOpen: false, record: null, documentoModalOpen: false});
    const setEstadoModalOpen = (estadoModalOpen) => setContextState(s => ({...s, estadoModalOpen}))
    const setDocumentoModalOpen = (documentoModalOpen) => setContextState(s => ({...s, documentoModalOpen}))
    const setRecordModal = (record) => setContextState(s => ({...s, record}))

    return (
        <Fragment>
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onContextMenu: (event) => {
                            event.preventDefault();

                            if (!state?.visible) {
                                document.addEventListener(`click`, function onClickOutside() {
                                    setState({popup: {visible: false}})
                                    event.target.parentNode.classList.remove('ant-table-row-selected');
                                    document.removeEventListener(`click`, onClickOutside)
                                });
                            }

                            setState({
                                popup: {
                                    record,
                                    visible: true,
                                    x: event.pageX,
                                    y: event.pageY
                                }
                            })

                            event.target.parentNode.classList.add('ant-table-row-selected');
                        }
                    };
                }}
                pagination={true} bordered striped locale={TableLocale} size={"small"} dataSource={data}
                columns={IndexTableColumns}/>

            <EstadoContext.Provider
                value={{...contextState, setEstadoModalOpen, setRecordModal, setDocumentoModalOpen}}>
                <PopupTable {...state.popup}/>
                {contextState.estadoModalOpen && <EstadoModal/>}
                {contextState.documentoModalOpen && <DocumentosModal/>}
            </EstadoContext.Provider>
        </Fragment>
    );
}

export default IndexTable;