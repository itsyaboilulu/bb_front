import { IconButton, Tooltip } from "@mui/material";
import FaIcon from "./FaIcon"
import Texticon from "./Texticon"
import { colors } from "Helpers/ColorHelper";

const FIcon = props => {
    let _props = {...props}
    if (!_props.variant){
        _props.variant = 'fas'
        if (_props.light) _props.variant = 'fal';
        if (_props.regular) _props.variant = 'far';
    }
    return <FaIcon {..._props} />
}

const Icon = props => {
    if (props.icon.includes('textToIcon:')){
        return <Texticon {...props} text={props.icon.replace('textToIcon:','')} />
    } else {
        return <FIcon {...props} />
    }
}

const ButtonIcon = props => {
    return (
        <IconButton
            onClick={props?.onClick}
            disabled={props.disabled}
        >
            <Icon {...props}/>
        </IconButton>
    )
}

const ToolTipIcon = props => {
    return (
        <Tooltip title={props.toolTip} placement="top-start">
            <ButtonIcon {...props} />
        </Tooltip>
    )
}

export default function AllIcon(props) {

    if (props?.disabled){
        props = {
            ...props,
            color: colors.background
        }
    }

    if (props.toolTip)
        return (
            <ToolTipIcon {...props}/>
        )
    if (props.onClick) 
        return (
            <ButtonIcon {...props} />
        );
    return <Icon {...props} />
}