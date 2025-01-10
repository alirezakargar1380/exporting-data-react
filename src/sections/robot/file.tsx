import { Box, Button, Link, Typography } from "@mui/material";
import axiosInstance, { endpoints } from "src/utils/axios";
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';

export default function FileView() {
    const router = useRouter();

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
            <Button variant="soft" color="warning" LinkComponent={Link} target="_blank" href={endpoints.file.download}>Download File</Button>
        </Box>
    )
}