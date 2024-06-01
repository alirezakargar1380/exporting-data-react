import { Box, Button, Typography } from "@mui/material";
import axiosInstance from "src/utils/axios";
import { useSnackbar } from 'src/components/snackbar';

export default function FileView() {
    const handleCreateFile = async () => {
        try {
            await axiosInstance.post('/api/file/create').then(() => { })
            enqueueSnackbar('File Created', {
                variant: 'success',
            });
        } catch (error) {
            enqueueSnackbar('Error for creating file', {
                variant: 'error',
            });
        }
    }

    const { enqueueSnackbar } = useSnackbar();

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h3">File</Typography>
            <Button variant="soft" color="warning" onClick={handleCreateFile}>Create File</Button>
        </Box>
    )
}