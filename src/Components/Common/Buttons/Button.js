import { Button } from "@mui/material";

export default function(props){
    return (
        <Button
            variant="contained"
            color="primary"
            {...props}
        >
            <b>{props.children}</b>
        </Button>
    )
}