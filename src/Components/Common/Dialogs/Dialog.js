import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { colors, theme } from "Helpers/ColorHelper";
import _ from 'lodash';

export default function (props){
    return (
        <Dialog
            {...props}
            open={_.isSet(props.open) ? props.open : true}
            maxWidth={props?.size}
            fullWidth={props?.size || props.fullWidth}
            PaperProps={{
                style: { 
                    borderRadius: 15,
                    backgroundColor: theme.dialog
                }
            }}
        >
            {props.title &&
                <DialogTitle
                ><Typography variant="h4" textAlign={'center'} fontWeight={'bold'} color={colors.black}>{props.title}</Typography></DialogTitle>
            }
            <DialogContent>
                {props.children}
            </DialogContent>
        </Dialog>
    )
}