import { Box } from "@mui/material"
import { colors } from "Helpers/ColorHelper";

export default function (props){
    return (
        <Box
            style={{border: `1px solid ${colors.divider}`, borderRadius: 5, padding: 15, marginTop: 15, position: 'relative', ...props.style}}
        >
            {props.title && 
                <span
                    style={{
                        position: 'absolute',
                        top: 0,
                        marginTop: '-10px',
                        backgroundColor: colors.white,
                        fontWeight: 'bold',
                        fontSize: '17px',
                        paddingLeft: 4,
                        paddingRight: 4,
                    }}
                >{props.title}</span>
            }
            {props.children}
        </Box>
    )
}