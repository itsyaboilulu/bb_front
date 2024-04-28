import React from "react";
import {Box} from '@mui/material'
import { theme } from "Helpers/ColorHelper";

class LayoutHeader extends React.Component {

    render() {

        return (
            <Box
                style={{
                    borderBottom: `1px solid ${theme.divider}`
                }}
            >
                title
            </Box>
        )
    }

}

export default LayoutHeader;