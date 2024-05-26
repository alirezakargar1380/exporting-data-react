import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Input, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, {
    RHFTextField,
} from 'src/components/hook-form';
import axiosInstance from "src/utils/axios";

export default function Robot() {
    const methods = useForm<any>({
        defaultValues: {
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
            six: [],
            seven: [],
            eight: [],
            nine: [],
            ten: [],
            eleven: []
        },
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = handleSubmit( async (data) => {
        try {
            await axiosInstance.post('/api/number_generator', data).then(() => {})
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Box>
            <Stack spacing={4}>
                <Box>
                    <Typography variant="h3">
                        Robot Controller
                    </Typography>
                    <Stack direction={'row'} spacing={2}>
                        <Button variant="soft" color="error">Stop Bot</Button>
                        <Button variant="soft" color="success">Rum Robot</Button>
                    </Stack>
                </Box>
                <Box>
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Typography variant="h3">
                            Number Generator
                        </Typography>
                        <Box
                            columnGap={2}
                            rowGap={3}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(4, 1fr)',
                                // md: 'repeat(2, 1fr)',
                            }}
                        >
                            <TextField label="one" variant="filled" onChange={(e: any) => setValue('one', e.target.value.split(','))} />
                            <TextField label="two" variant="filled" onChange={(e: any) => setValue('two', e.target.value.split(','))} />
                            <TextField label="three" variant="filled" onChange={(e: any) => setValue('three', e.target.value.split(','))} />
                            <TextField label="four" variant="filled" onChange={(e: any) => setValue('four', e.target.value.split(','))} />
                            <TextField label="five" variant="filled" onChange={(e: any) => setValue('five', e.target.value.split(','))} />
                            <TextField label="six" variant="filled" onChange={(e: any) => setValue('six', e.target.value.split(','))} />
                            <TextField label="seven" variant="filled" onChange={(e: any) => setValue('seven', e.target.value.split(','))} />
                            <TextField label="eight" variant="filled" onChange={(e: any) => setValue('eight', e.target.value.split(','))} />
                            <TextField label="nine" variant="filled" onChange={(e: any) => setValue('nine', e.target.value.split(','))} />
                            <TextField label="ten" variant="filled" onChange={(e: any) => setValue('ten', e.target.value.split(','))} />
                            <TextField label="eleven" variant="filled" onChange={(e: any) => setValue('eleven', e.target.value.split(','))} />
                        </Box>
                        <LoadingButton loading={isSubmitting} variant="soft" color="info" sx={{ mt: 4 }} type="submit">Generate</LoadingButton>
                    </FormProvider>
                </Box>
            </Stack>
        </Box>

    )
} 