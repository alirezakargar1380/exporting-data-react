

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Input, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, {
    RHFTextField,
} from 'src/components/hook-form';
import axiosInstance, { endpoints } from "src/utils/axios";
import { useSnackbar } from 'src/components/snackbar';
import { useState } from "react";
import Label from "src/components/label";
import { useGetSettings } from "src/api/settings";

export default function Robot() {
    const [biggerThan, setBiggerThan] = useState<string>('0')

    const { settings } = useGetSettings()

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

    const { enqueueSnackbar } = useSnackbar();

    const values = watch();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axiosInstance.post(endpoints.number_generator.generate, data).then(() => { })
            enqueueSnackbar("Numbers have been generated", {
                variant: 'info'
            })
        } catch (error) {
            console.error(error);
        }
    });

    const handleDeleteAllOrderCodes = async () => {
        try {
            await axiosInstance.delete(endpoints.order_codes.delete_all).then(() => { })
            enqueueSnackbar('All order codes have been deleted', {
                variant: 'success',
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleRunRobot = async () => {
        try {
            await axiosInstance.post('/api/bot/run/' + biggerThan).then(() => { })
            enqueueSnackbar('Robot has been run', {
                variant: 'success',
            });
        } catch (error) {
            console.error(error);
        }
    }

    const requestStopBot = async () => {
        await axiosInstance.post(endpoints.settings.stop).then(() => {
            settings.stop_bot_request = true
            enqueueSnackbar('Robot will be stoped...', { variant: 'error' })
        })
    }

    return (
        <Box>
            <Stack spacing={4}>
                <Box>
                    <Typography variant="h3">
                        Robot Controller
                    </Typography>
                    <Stack spacing={2} mt={2}>
                        <Box display={'flex'} gap={2}>
                            <Typography variant="h6">
                                status:
                            </Typography>
                            {settings.bot_status ? (
                                <Label variant="soft" color="success">is running</Label>
                            ) : (
                                <Label variant="soft" color="error">stoped</Label>
                            )}
                        </Box>
                        {/* <Box display={'flex'} gap={2}>
                            <Typography variant="h6">
                                Stop Request:
                            </Typography>
                            <Label variant="soft" color="warning">waiting...</Label>
                            <Label variant="soft" color="success">normal</Label>
                        </Box> */}

                        {settings.stop_bot_request ? (
                            <Button variant="contained" color="error" size="large" disabled>Wait To Robot Stoped...</Button>
                        ) : (
                            <Button variant="contained" color="error" onClick={requestStopBot} size="large">Stop The Bot</Button>
                        )}

                    </Stack>
                    <TextField label="run code with ids that are bigger than?" value={biggerThan} variant="filled" sx={{ width: 1, my: 3 }} onChange={(e: any) => setBiggerThan(e.target.value)} />
                    <Stack direction={'row'} spacing={2}>
                        <Button variant="soft" color="success" onClick={handleRunRobot}>Rum Robot</Button>
                        <Button variant="soft" color="error" onClick={handleDeleteAllOrderCodes}>Delete All Order Codes</Button>
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
                                xs: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)',
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