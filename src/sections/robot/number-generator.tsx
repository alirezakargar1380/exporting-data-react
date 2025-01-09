import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGetOrderCodes } from "src/api/order-codes";
import Label from "src/components/label";
import { IOrderCode } from "src/types/order-code";

export default function NumberGenerator() {
    const { order_codes, refresh } = useGetOrderCodes();

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         refresh();
    //     }, 6000);

    //     // Cleanup function to clear interval when component unmounts
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <Box sx={{ mt: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Checking status</TableCell>
                        <TableCell>Extend</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order_codes.map((code: IOrderCode, i: number) => (
                        <TableRow key={i}>
                            <TableCell>{code.id}</TableCell>
                            <TableCell>{code.order_code}</TableCell>
                            <TableCell>
                                <Label variant="filled" color={
                                    (code.checked_status === false && "error") ||
                                    (code.checked_status === null && "warning") ||
                                    (code.checked_status === true && "primary")
                                    || 'default'
                                }>
                                    {code.checked_status === true && "Checked"}
                                    {code.checked_status === false && "Not Available"}
                                    {code.checked_status === null && "Not Checked Yet"}
                                </Label>
                            </TableCell>
                            <TableCell>
                                {code.extend || '-' }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}