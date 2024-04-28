import { Grid, Box } from '@mui/material';
import PaddedPaper from "Components/Common/Paper/PaddedPaper";
import { colors } from 'Helpers/ColorHelper';

export default function(props){
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
                    xs={12}
                    sm={10}
                    md={7}
                    lg={4}
                >
                    <PaddedPaper
                        style={{
                            backgroundColor: colors.primary,
                            borderColor: colors.white
                        }}
                    >
                        {props.children}
                    </PaddedPaper>
                </Grid>
            </Grid>
        </Box>
    )
}