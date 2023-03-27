import {Tag} from "antd";

export const TableLocale = {
    emptyText: (
        <span>
            Sin datos para mostrar.
        </span>
    )
}

export const TableModalColumns = [
    {
        title: 'No. Cheque',
        dataIndex: 'numero_cheque',
        width: "12%",
    },
    {
        title: 'Beneficiario',
        dataIndex: 'beneficiario',
        width: "25%"
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcion',
    },
    {
        title: "Categoria",
        dataIndex: "categoria",
        width: '9%'
    },
    {
        title: 'Monto',
        dataIndex: 'monto',
        width: "9%",
        align: "right",
        render(monto) {
            return Number(monto?.toFixed(2))?.toLocaleString("en-Es")
        }
    },
]

export const IndexTableColumns = [
    {
        title: 'No. Cheque',
        dataIndex: 'numero_cheque',
        width: "11%",
    },
    {
        title: 'Beneficiario',
        dataIndex: 'beneficiario',
        className: "truncate line-clamp-1",
        width: "25%"
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcion',
        className: "truncate line-clamp-1"
    },
    {
        title: "Estado",
        dataIndex: "estado",
        width: "10%",
        render(estado) {
            return (
                <Tag color="blue" key={estado} className="w-full">
                    {estado.toUpperCase()}
                </Tag>
            )
        }
    },
    {
        title: 'Monto',
        dataIndex: 'monto',
        width: "9%",
        align: "right",
        render(monto) {
            return Number(monto?.toFixed(2))?.toLocaleString("en-Es")
        }
    }
]


export const DocumentosModalTableColumns = [
    {
        title: "No. Documento",
        dataIndex: "numero_documento",
        width: "15%"
    },
    {
        title: "Tipo",
        dataIndex: "tipo"
    },
    {
        title: "Descripción",
        dataIndex: "descripcion",
    },
    {
        title: "USD",
        dataIndex: "dolar",
        width: "10%",
        align: "right",
        render(monto, r) {
            return Number(monto?.toFixed(2))?.toLocaleString("en-Es")
        }
    },
    {
        title: "NIO",
        dataIndex: "cordoba",
        width: "10%",
        align: "right",
        render(monto) {
            return Number(monto?.toFixed(2))?.toLocaleString("en-Es")
        }
    }
]