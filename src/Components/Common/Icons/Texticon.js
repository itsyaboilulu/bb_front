import { Typography } from "@mui/material";

export default function(props){
    const {text, style, size=25, color, light} = props;
    return (
        <Typography
            style={{
                fontWeight: light ? 'normal' : "bold",
                color: color,
                fontSize: (
                    (
                        ( size === 'xs' && 15 ) ||
                        (
                            ( size === 'sm' && 20 ) ||
                            (
                                ( size === 'md' && 25 ) ||
                                (
                                    ( size === 'lg' && 30 ) ||
                                    (
                                        ( size === 'xl' && 35 ) || 
                                        size
                                    )
                                )
                            )
                        ) 
                    )
                ),
                ...style,
            }}
        >{text}</Typography>
    )
}