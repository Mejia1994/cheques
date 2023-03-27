import {Button, message, Modal, Pagination, Table} from "antd";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import IndexTable from "./IndexTable.jsx";
import ModalIndex from "../Modal/Index.jsx";
import {fetchList, setIsModalOpen} from "../../store/listSlice.js";
import {useEffect} from "react";

const TableList = function () {

    const dispatch = useDispatch()
    const {dataSource, isModalOpen} = useSelector((state) => state.list)
    const {banco} = useSelector((state) => state.Bancos)

    useEffect(function () {
        if (banco) {
            dispatch(fetchList(banco));
        }
    }, [banco]);

    return (
        <div className="p-4 rounded content-shadow">
            <Button onClick={() => dispatch(setIsModalOpen(true))} size="middle" className="my-2" type="primary" ghost>
                Cargar Cheques
            </Button>
            <IndexTable data={dataSource}/>
            {isModalOpen && <ModalIndex/>}
        </div>
    )
}

export default TableList;