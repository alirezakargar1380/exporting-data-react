import MainLayout from "src/layouts/main";
import NumberGenerator from "../number-generator";
import Robot from "../robot";

export default function RobotView() {  
    return (
        <MainLayout>
            <Robot />
            <NumberGenerator />
        </MainLayout>
    )
}