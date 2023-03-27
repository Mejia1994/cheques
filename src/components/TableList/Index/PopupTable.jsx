import {List} from "antd";
import {useContext} from "react";
import {ModalContext} from "../Modal/ModalContext.js";
import {EstadoContext} from "./EstadoContext.js";

const PopupTable = function ({record, visible, x, y}) {

    const {setEstadoModalOpen, setRecordModal, setDocumentoModalOpen} = useContext(EstadoContext);

    const PopupTableIndex = [
        {
            name: "Estado Cheque",
            cat: ['CB', 'CP'],
            event: function () {
                setRecordModal(record);
                setEstadoModalOpen(true);
            }
        },
        {
            name: "Documentos Pagados",
            cat: ['CP'],
            event: function () {
                setRecordModal(record);
                setDocumentoModalOpen(true)
            }
        }
    ]

    return (
        visible && <List
            className="absolute bg-white content-shadow pr-5"
            style={{left: `${x}px`, top: `${y}px`}}
            size="small"
            bordered
            dataSource={PopupTableIndex}
            renderItem={function (item, index) {
                const cp = item.cat.includes(record.categoria);

                return (
                    cp && <List.Item onClick={item.event} key={index}
                                     className="cursor-pointer font-bold !text-neutral-600">
                        {item.name}
                    </List.Item>
                );
            }}
        />
    );
}

export default PopupTable;