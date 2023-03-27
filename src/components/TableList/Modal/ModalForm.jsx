import {Button, DatePicker, Form, message, Radio} from "antd";
import locale_es from "antd/lib/locale/es_ES.js";
import {useContext, useState} from "react";
import {ModalContext} from "./ModalContext.js";
import {useSelector} from "react-redux";

const validateMessages = {
    required: 'seleccione un rango de fechas.',
}
const ModalForm = function () {

    const [form] = Form.useForm();
    const RangePicker = DatePicker.RangePicker;
    const {setTableData} = useContext(ModalContext);
    const [fetching, setFetching] = useState(false);
    const {banco} = useSelector((state) => state.Bancos);

    const consultarCheques = async function () {
        try {
            await form.validateFields();

            setFetching(true);

            let response = await fetch('/api.insumos/cheques/ConsultarCheques', {
                method: 'POST',
                body: JSON.stringify([...form.getFieldValue("fecha"), banco]),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let data = await response.json();

            setTableData(addKey(data));
        } catch (e) {
            if (!e?.errorFields) message.error("No se pudo obtener los datos solicitados.");

        } finally {
            setFetching(false);
        }
    }

    const addKey = arr => arr.map((elm, index) => {
        elm.key = index;
        return elm;
    })

    return (
        <Form
            form={form}
            className="mb-2"
            layout="vertical"
            validateMessages={validateMessages}
            style={{maxWidth: 600}}>

            <Form.Item name="fecha"
                       rules={[{required: true}]}
                       label={<label className="font-bold text-neutral-500">Fecha.</label>}>
                <RangePicker locale={locale_es}/>
            </Form.Item>

            <div className="flex justify-between items-center ">
                <Button loading={fetching} onClick={consultarCheques} size="small" className="!px-[1rem]" type="primary"
                        ghost>
                    <span>Consular</span>
                </Button>
            </div>
        </Form>
    )
}

export default ModalForm;