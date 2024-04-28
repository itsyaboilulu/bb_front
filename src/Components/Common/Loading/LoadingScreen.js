import SlimLayout from "../Layouts/SlimLayout";
import Loading from './LOADING.png'
import { Grid, Box } from "@mui/material";
import { colors } from "Helpers/ColorHelper";
import PaddedPaper from "Components/Common/Paper/PaddedPaper";

export default function () {

    return (
        <Box
            component='main'
            style={{
                padding: '2em',
                height: 'calc(100% - 4em)',
                width:'calc(100% - 4em)',
            }}
        >
            <Grid
                container
                justifyContent={'center'}
                alignItems={'center'}
                style={{height: '100%'}}
            >
                <Grid
                    item 
                >
                    <PaddedPaper
                        style={{
                            backgroundColor: colors.primary,
                            borderColor: colors.white
                        }}
                    >
                         <img src={Loading}/>
                    </PaddedPaper>
                </Grid>
            </Grid>
        </Box>
    )
}