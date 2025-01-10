"use client"

import { AuthGuard } from 'src/auth/guard';
import RobotView from 'src/sections/robot/view/robot-view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <AuthGuard>
      <RobotView />
    </AuthGuard>
  );
}
