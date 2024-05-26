import MainLayout from "src/layouts/main";
import { NumberGenerator } from "../number-generator";


export default function RobotView() {  
    return (
        <MainLayout>
            <NumberGenerator />
        </MainLayout>
    )
}