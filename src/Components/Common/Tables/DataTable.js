import SideDataTable from './SideDataTable'
import CommonDataTable from './CommonDataTable'

export default function ({...props}){
    if (props.side){
        return (
            <SideDataTable {...props} />
        )
    }
    return <CommonDataTable {...props} />
}