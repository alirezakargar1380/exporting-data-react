import MainLayout from "src/layouts/main";
import NumberGenerator from "../number-generator";
import Robot from "../robot";
import FileView from "../file";

export default function RobotView() {
    return (
        <MainLayout>
            <FileView />
            <Robot />
            <NumberGenerator />
        </MainLayout>
    )
}