import {Button, Modal, Table} from "antd";
import {useContext, useEffect, useState} from "react";
import {EstadoContext} from "./EstadoContext.js";
import {DocumentosModalTableColumns, TableLocale} from "../../../config/config.jsx";
import {useSelector} from "react-redux";

const DocumentosModal = function () {
    const [documentos, setDocumentos] = useState([]);
    const {documentoModalOpen, setDocumentoModalOpen, record} = useContext(EstadoContext);
    const {banco} = useSelector((state) => state.Bancos);

    useEffect(function () {

        fetch(`/api.insumos/cheques/Documentos?id_seguimiento=${record.id_seguimiento_cheque}`)
            .then(response => response.json())
            .then(({data}) => setDocumentos(data.map(function (elm, index) {
                elm.key = index;
                return elm;
            })))

    }, []);

    return (
        <Modal title={<label className="font-bold !text-neutral-600">No. {record.numero_cheque}</label>}
               destroyOnClose={true} open={documentoModalOpen} width="60vw"
               footer={
                   <div className="text-start">
                       <Button key="back" onClick={() => setDocumentoModalOpen(false)} type="text"
                               className="bg-[#00000026]">
                           Cancelar
                       </Button>
                   </div>
               }>

            <Table
                pagination={false}
                bordered striped locale={TableLocale} size={"small"} dataSource={documentos}
                columns={DocumentosModalTableColumns}
            />
        </Modal>
    )
}

export default DocumentosModal;