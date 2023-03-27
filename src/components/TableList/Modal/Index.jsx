import {Button, Modal} from "antd";
import ModalForm from "./ModalForm.jsx";
import {ModalContext} from "./ModalContext.js";
import {useState} from "react";
import ModalTable from "./ModalTable.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addItems, setIsModalOpen} from "../../store/listSlice.js";

const ModalIndex = function () {

    const dispatch = useDispatch();
    const {isModalOpen} = useSelector((state) => state.list);
    const {banco} = useSelector((state) => state.Bancos);


    const [state, setState] = useState({
        tableData: [],
        rowsSelected: []
    });

    const setTableData = (data) => setState(s => ({...s, tableData: data}))
    const setRowsSelected = (n, data) => setState(s => ({...s, rowsSelected: data}))

    const onClickAcceptar = async function () {

        if (state.rowsSelected.length) {

            let response = await fetch("/api.insumos/cheques/Seguimientos/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cheques: state.rowsSelected, banco})
            });

            let {data} = await response.json();

            dispatch(addItems(data));
            dispatch(setIsModalOpen(false));
        }
    }

    return (
        <ModalContext.Provider value={{...state, setTableData, setRowsSelected}}>
            <Modal destroyOnClose={true} title="Cargar Cheques" open={isModalOpen} width="60vw"
                   footer={
                       <div className="text-start">
                           <Button key="submit" onClick={onClickAcceptar} type="primary">
                               Acceptar
                           </Button>
                           <Button key="back" onClick={() => dispatch(setIsModalOpen(false))} type="text"
                                   className="bg-[#00000026]">
                               Cancelar
                           </Button>
                       </div>
                   }>
                <ModalForm/>
                <ModalTable/>
            </Modal>
        </ModalContext.Provider>
    );
}

export default ModalIndex;