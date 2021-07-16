import React from 'react'
import './Table.scss'
import organizeData from '../../utils/organizedDataForTable'
import Button from '../Button'
//import withPermission from '../../utils/HOC/withPermission'

export interface TableHeader {
  key: string
  value: string
  right?: boolean
}
declare interface TableProps {
  headers: TableHeader[]
  data: any[]

  enableActions?: boolean
  
  onDelete?: (item : any) => void
  onDetail?: (item : any) => void
  onEdit?: (item : any) => void
}

const Table: React.FC<TableProps> = (props) => {
  const [organizedData, indexedHeaders] = organizeData(props.data, props.headers)

  return <table className="AppTable">
    <thead>
      <tr>
        {
          props.headers.map(header =>
            <th
              className={header.right ? 'right' : ''}
              key={header.key}
            >
              {header.value}
            </th>
          )
        }
        {
          props.enableActions
            && <th className="right">
              Actions
            </th>
        }
      </tr>
    </thead>
    <tbody>
      {
        organizedData.map((row, i) => {
          return <tr key={i}>
            {
              Object
                .keys(row)
                .map((item, i) =>
                  item !== '$original'
                    ? <td
                        key={row.$original._id + i}
                        className={indexedHeaders[item].right ? 'right' : ''}
                      >
                        { row[item] }
                      </td>
                    : null
                )
            }

            {
              props.enableActions
                && <td className="actions right">
                  {
                    props.onEdit &&
                      <Button
                      // NOTA PARA MIM: A arrow function no onClick impede de executar na renderização a todo momento
                        onClick={() => props.onEdit && props.onEdit(row.$original)}
                      >
                        Edit
                      </Button>
                  }
                  {
                    props.onDetail &&
                      <Button
                      // NOTA PARA MIM: A arrow function no onClick impede de executar na renderização a todo momento
                        onClick={() => props.onDetail && props.onDetail(row.$original)}
                      >
                        Detail
                      </Button>
                  }
                  {
                    props.onDelete &&
                      <Button
                      // NOTA PARA MIM: A arrow function no onClick impede de executar na renderização a todo momento
                        onClick={() => props.onDelete && props.onDelete(row.$original)}
                      >
                        Delete
                      </Button>
                  }
                </td>
            }
          </tr>
        })
      }
    </tbody>
  </table>
}

//export default withPermission(['customer', 'admin'])(Table)
export default Table