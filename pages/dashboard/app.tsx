// sections
import DashboardLayout from "src/layouts/dashboard/layout";
import OverviewAppView from "src/sections/overview/app/view/overview-app-view";

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  return (
    <>
      <div>
        <title> Dashboard: App</title>
      </div>

      <DashboardLayout>
        <OverviewAppView />
      </DashboardLayout>
    </>
  );
}
