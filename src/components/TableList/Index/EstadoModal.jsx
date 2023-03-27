import {Button, Form, Modal, Radio, Select} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import {useContext, useEffect} from "react";
import {EstadoContext} from "./EstadoContext.js";
import {updateItems} from "../../store/listSlice.js";
import {useDispatch} from "react-redux";

const EstadoModal = function () {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {estadoModalOpen, setEstadoModalOpen, record} = useContext(EstadoContext);

    const btnActualizarEstadoClick = async function () {

        const response = await fetch('/api.insumos/cheques/Seguimientos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_seguimiento_cheque: record.id_seguimiento_cheque,
                ...form.getFieldsValue(),
            })
        });

        const {data} = await response.json();
        dispatch(updateItems({
            ...data,
            id_seguimiento_cheque: record.id_seguimiento_cheque,
            observacion: form.getFieldsValue().observacion
        }));
        setEstadoModalOpen(false);
    }

    return (
        <Modal title={<label className="font-bold !text-neutral-600">No. {record.numero_cheque}</label>}
               destroyOnClose={true} open={estadoModalOpen} width="40vw"
               footer={
                   <div className="text-start">
                       <Button type="primary" size="small" className="!px-[1rem] w-auto"
                               onClick={btnActualizarEstadoClick}>
                           <span>Actualizar Estado</span>
                       </Button>
                       <Button key="back" onClick={() => setEstadoModalOpen(false)} type="text"
                               className="bg-[#00000026]">
                           Cancelar
                       </Button>
                   </div>
               }>

            <Form
                form={form}

                className="flex flex-col"
                layout="vertical">

                <Form.Item name="id_estado" initialValue={record.id_estado}
                           label={<label className="font-bold text-neutral-500">Estado Cheque.</label>}>
                    <Select placeholder="Seleccione un estado">
                        <Select.Option value={1}>Emitido</Select.Option>
                        <Select.Option value={2}>Entregado</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="observacion" initialValue={record.observacion}
                           label={<label className="font-bold text-neutral-500">Observación</label>}>
                    <TextArea rows={4} placeholder="Ingrese una observación"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EstadoModal;