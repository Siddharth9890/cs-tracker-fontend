// sections
import DashboardLayout from "src/layouts/dashboard/layout";
import UserListView from "src/sections/user/view/user-list-view";

// ----------------------------------------------------------------------

// or Subjects page
export default function ExplorePage() {
  return (
    <>
      <div>
        <title>Explore Subjects</title>
      </div>

      <DashboardLayout>
        <UserListView />
      </DashboardLayout>
    </>
  );
}
