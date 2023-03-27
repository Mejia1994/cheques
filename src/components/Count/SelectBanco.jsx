import {Fragment, useEffect} from "react";
import {Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {fetchBancos, setBanco} from "../store/BancosSlice.js";

const SelectBanco = function () {

    const dispatch = useDispatch()
    const {bancos, banco} = useSelector((state) => state.Bancos);

    useEffect(function () {
        dispatch(fetchBancos()).then(function ({meta}) {
            if (meta.requestStatus !== "rejected") {
                dispatch(setBanco("005-116926"));
            }
        });
    }, []);

    const onChangeBanco = value => dispatch(setBanco(value));

    return (
        <Fragment>
            <label className="font-bold mb-2">Cuenta</label>
            <Select className="w-full mt-2" name="cuenta_banco" value={banco} onChange={onChangeBanco}
                    placeholder="Seleccione una cuenta">
                {
                    bancos.map(function ({cuenta_banco, nombre_banco}, index) {
                        return (
                            <Select.Option selected key={index}
                                           value={cuenta_banco}>{nombre_banco} - {cuenta_banco}</Select.Option>
                        )
                    })
                }
            </Select>
        </Fragment>
    );
}

export default SelectBanco;
