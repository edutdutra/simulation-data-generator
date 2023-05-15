import {SyntheticEvent, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";

import {Uniform} from "./pages/Uniform";
import {Triangulate} from "./pages/Triangulate";
import {Exponential} from "./pages/Exponential";
import {Normal} from "./pages/Normal";
import {Simulator} from "./pages/Simulator";


function App() {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange} sx={{bgcolor: '#b0bec5', borderRadius: 50}}>
                <Tab label="Simulador"/>
                <Tab label="Uniforme"/>
                <Tab label="Triangular"/>
                <Tab label="Exponencial"/>
                <Tab label="Normal"/>
            </Tabs>

            <Box paddingY={4}>
                <Box hidden={value !== 0}>
                    <Simulator />
                </Box>

                <Box hidden={value !== 1}>
                    <Uniform/>
                </Box>

                <Box hidden={value !== 2}>
                    <Triangulate/>
                </Box>

                <Box hidden={value !== 3}>
                    <Exponential/>
                </Box>

                <Box hidden={value !== 4}>
                    <Normal/>
                </Box>
            </Box>
        </div>
    )
}

export default App