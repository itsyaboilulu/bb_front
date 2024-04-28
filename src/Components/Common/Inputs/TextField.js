import { TextField } from "@mui/material"
import { colors } from "Helpers/ColorHelper"
export default function(props) {
    return (
        <TextField
            {...props}
            InputProps={{
                ...props.inputProps,
                style:{
                    backgroundColor: colors.white,
                    fontWeight: 'bold',
                    ...props?.inputProps?.style
                }
            }}
           
        />
    )
}