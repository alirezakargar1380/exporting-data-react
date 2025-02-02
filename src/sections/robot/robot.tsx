

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Divider, Input, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import FormProvider, {
    RHFTextField,
} from 'src/components/hook-form';
import axiosInstance, { endpoints } from "src/utils/axios";
import { useSnackbar } from 'src/components/snackbar';
import { useEffect, useState } from "react";
import Label from "src/components/label";
import { useGetSettings } from "src/api/settings";
import { ConfirmDialog } from "src/components/custom-dialog";
import { useBoolean } from "src/hooks/use-boolean";
import { useGetOrderCodes } from "src/api/order-codes";

export default function Robot() {
    const [run, setRun] = useState<boolean>(false);
    const [biggerThan, setBiggerThan] = useState<string>('0');
    const [time, setTime] = useState<string>('5');

    const confirm = useBoolean();
    const emergency = useBoolean();

    const { settings, refreshSetting } = useGetSettings();
    const { order_codes } = useGetOrderCodes();

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

    useEffect(() => {
        const interval = setInterval(() => {
            refreshSetting();
        }, 4000);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (settings.bot_status) setRun(true)
    }, [settings.bot_status])

    const handleDeleteAllOrderCodes = async () => {
        try {
            await axiosInstance.delete(endpoints.order_codes.delete_all).then(() => { })
            enqueueSnackbar('All order codes have been deleted', {
                variant: 'success',
            });

            confirm.onFalse()
        } catch (error) {
            console.error(error);
        }
    }

    const handleResetSettings = async () => {
        try {
            await axiosInstance.patch(endpoints.settings.reset).then(() => { })
            enqueueSnackbar('robot setting has been reset', {
                variant: 'success',
            });

            emergency.onFalse()
        } catch (error) {
            console.error(error);
        }
    }

    const handleRunRobot = async () => {
        try {
            if (+time > 60 || +time <= 3)
                return enqueueSnackbar('time must be less than 60 and bigger than 3', {
                    variant: 'error',
                });

            setRun(true);
            // enqueueSnackbar('wait until get notif for running robot', {
            //     variant: 'info',
            // });
            await axiosInstance.post('/api/bot/run/' + biggerThan + `/${time}`).then(() => { });
            enqueueSnackbar('Robot has been run', {
                variant: 'success',
            });
        } catch (error) {
            console.error(error);
        }
    }

    const requestStopBot = async () => {
        await axiosInstance.post(endpoints.settings.stop).then(() => {
            enqueueSnackbar('Robot will be stoped...', { variant: 'error' })
        })
    }

    return (
        <Box>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={handleDeleteAllOrderCodes}>
                        Delete
                    </Button>
                }
            />

            <ConfirmDialog
                open={emergency.value}
                onClose={emergency.onFalse}
                title="Warning!"
                content="do this just when bot has been crashed"
                action={
                    <Button variant="contained" color="error" onClick={handleResetSettings}>
                        reset setting
                    </Button>
                }
            />

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
                            {(settings.bot_status) ? (
                                <Label variant="soft" color="success">is running</Label>
                            ) : (
                                <Label variant="soft" color="error">stoped</Label>
                            )}
                        </Box>

                        <Divider />

                        <Box display={'flex'} gap={2}>
                            <Typography variant="h6">
                                bigger than:
                            </Typography>
                            <Label variant="soft" color="warning">{settings.bigger_than}</Label>
                        </Box>

                        <Box display={'flex'} gap={2}>
                            <Typography variant="h6">
                                current id:
                            </Typography>
                            <Label variant="soft" color="info">{settings.id_current}</Label>
                        </Box>

                        <Box display={'flex'} gap={2}>
                            <Typography variant="h6">
                                time:
                            </Typography>
                            <Label variant="soft" color="warning">{settings.time + " " + "seconds"}</Label>
                        </Box>

                        <Divider />

                        {(settings.bot_status) && (
                            <Box>
                                <Box display={'flex'} gap={2}>
                                    <Typography variant="h6">
                                        code left:
                                    </Typography>
                                    <Label variant="soft" color="error">{(order_codes[order_codes.length - 1]?.id - +settings?.id_current)}</Label>
                                </Box>
                                <Box display={'flex'} gap={2}>
                                    <Typography variant="h6">
                                        time to finish:
                                    </Typography>
                                    <Label variant="soft" color="success">{"About " + ((order_codes[order_codes.length - 1]?.id - +settings?.id_current) * (+settings?.time - 2) / 60).toFixed(0) + " Minutes Left"}</Label>
                                </Box>
                            </Box>
                        )}

                        {(settings.stop_bot_request) ? (
                            <Button variant="contained" color="error" size="large" disabled>Wait To Robot Stoped...</Button>
                        ) : (
                            <Button variant="contained" color="error" onClick={requestStopBot} size="large">Stop The Bot</Button>
                        )}

                    </Stack>
                    <TextField label="run code with ids that are bigger than?" value={biggerThan} variant="filled" sx={{ width: 1, my: 3 }} onChange={(e: any) => setBiggerThan(e.target.value)} />
                    <TextField label="enter time (seconds) you want run each code" value={time} variant="filled" sx={{ width: 1, mb: 3 }} onChange={(e: any) => setTime(e.target.value)} />
                    <Stack direction={'row'} spacing={2}>
                        <Button variant="soft" color="success" onClick={handleRunRobot} disabled={settings.bot_status}>Rum Robot</Button>
                        <Button variant="soft" color="error" onClick={() => confirm.onTrue()}>Delete All Order Codes</Button>
                        <Button variant="soft" color="error" onClick={() => emergency.onTrue()}>Emergency</Button>
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