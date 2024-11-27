import React from "react";
import { Box, CircularProgress, Typography, LinearProgress } from "@mui/material";

interface CustomLoaderProps {
    status: string | undefined;
}

const CustomLoader = (props: CustomLoaderProps) => {
    const status = props.status;
    if (status)
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 2 }}>
            {status === "loading" && (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {status === "generating" && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        Your response is being generated...
                    </Typography>
                    <LinearProgress sx={{ width: "100%", maxWidth: 400 }} />
                    {/*<Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>*/}
                    {/*    <CircularProgress size={50} sx={{ animation: "spin 2s linear infinite" }} />*/}
                    {/*</Box>*/}
                </Box>
            )}
        </Box>
    );
};

export default CustomLoader;
