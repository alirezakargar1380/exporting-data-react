import { Box, Table, TableBody, TableCell, TableHead, Typography } from "@mui/material";
import { useGetOrderCodes } from "src/api/order-codes";
import Label from "src/components/label";
import { IOrderCode } from "src/types/order-code";



export function NumberGenerator() {
    const { order_codes } = useGetOrderCodes();

    console.log(order_codes)

    return (
        <Box>
            <Typography sx={{ py: 3 }}>Number Generator</Typography>
            <Table>
                <TableHead>
                    <TableCell>Id</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Checking status</TableCell>
                </TableHead>

                {order_codes.map((code: IOrderCode) => (
                    <TableBody>
                        <TableCell>{code.id}</TableCell>
                        <TableCell>{code.order_code}</TableCell>
                        <TableCell>
                            <Label variant="filled" color={
                                (code.checked_status === "false" && "error") ||
                                (code.checked_status !== "false" && "primary")
                                || 'default'
                            }>
                                {code.checked_status}
                            </Label>
                        </TableCell>
                    </TableBody>
                ))}

            </Table>
        </Box>
    )
}