import {Button, Form, Select} from "antd";
import {EditFilled} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import SelectBanco from "./SelectBanco.jsx";

const Count = function () {
    const {dataSource} = useSelector((state) => state.list)
    const [state, setState] = useState({flotante: 0, banco: 120000, disponible: 0});

    useEffect(function () {

        let flotante = dataSource.reduce(function (ac, cu) {
            return ac + cu.monto;
        }, 0)

        setState(function (s) {
            return {
                ...s,
                flotante: flotante.toFixed(2),
                disponible: (s.banco - flotante).toFixed(2)
            }
        })
    }, [dataSource]);

    return (
        <div className="p-4 rounded content-shadow">
            <SelectBanco/>

            <div className="p-4 bg-white grid place-content-center">
                <p className="text-sm font-bold text-neutral-500">Disponible</p>
                <div className="flex items-center justify-start mb-2">
                    <span className="text-sm font-medium">C$</span>
                    <span className="text-4xl font-bold">{Number(state.disponible).toLocaleString("en-Es")}</span>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <div style={{width: "48%"}} className="rounded-lg py-2.5 px-3 border-2 relative ">
                    <span className="text-sm font-bold text-neutral-500">Banco</span>
                    <div className="flex items-center justify-start mb-2">
                        <span className="text-sm font-medium">C$</span>
                        <span className="text-2xl font-bold">{Number(state.banco).toLocaleString("en-Es")}</span>
                    </div>

                    <div className="backdrop-blur-sm/2 bg-white/90  w-full h-full grid place-content-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Button shape="circle" className="bg-blue-500 hover:bg-blue-500 shadow-lg">
                            <EditFilled style={{display: "inline-flex" ,color: "white"}}/>
                        </Button>
                    </div>
                </div>
                <div style={{width: "48%"}} className="rounded-lg py-2.5 px-3 border-2">
                    <span className="text-sm font-bold text-neutral-500">Flotante</span>
                    <div className="flex items-center justify-start mb-2">
                        <span className="text font-medium">C$</span>
                        <span className="text-2xl font-bold">{Number(state.flotante).toLocaleString("en-Es")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Count