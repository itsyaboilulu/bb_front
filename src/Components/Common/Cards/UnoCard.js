import { colors } from "Helpers/ColorHelper";
import AllIcon from "../Icons/AllIcon";
import { Box, Grid } from "@mui/material";

export default function(props){
    const { color, code, icon, preview, height, width, active, onClick, activeClick, inaciveClick} = props;

    let _colors = {
        R: colors.uRed,
        G: colors.uGreen,
        B: colors.uBlue,
        Y: colors.uYellow,
        W: colors.uBlack
    }

    let backgroundColor = active ? _colors[color] : `${_colors[color]}70`;
    let textColor = active ? colors.white : 'grey';

    let cardClick = onClick ?
        onClick : 
        ( active ? activeClick : inaciveClick )
    cardClick = cardClick ? cardClick : ()=>{}

    return (
        <Box
            style={{
                padding: 4,
                backgroundColor: colors.black,
                borderRadius: 5,
                height, width
            }}
            onClick={cardClick}
        >
            <Box
                style={{
                    backgroundColor: backgroundColor,
                    border: `4px solid ${textColor}`,
                    borderRadius: 5,
                    width: 'calc(100% - 8px)',
                    height: 'calc(100% - 8px)',
                }}
            >
                <Grid container
                    justifyContent={'center'}
                    alignContent={'center'}
                    style={{
                        height: '100%',
                    }}
                >
                    <Grid item>
                        <AllIcon
                            icon={icon}
                            size={width / 1.8}
                            color={textColor}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}