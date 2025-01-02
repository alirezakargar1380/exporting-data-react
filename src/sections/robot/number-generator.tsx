import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useGetOrderCodes } from "src/api/order-codes";
import Label from "src/components/label";
import { IOrderCode } from "src/types/order-code";

export default function NumberGenerator() {
    const { order_codes } = useGetOrderCodes();

    // console.log(order_codes)

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
                                    (code.checked_status !== false && "primary")
                                    || 'default'
                                }>
                                    {code.checked_status ? "Checked" : "Not checked"}
                                </Label>
                            </TableCell>
                            <TableCell>
                                {code.extend || '-'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}