// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _jobs } from 'src/_mock/_job';
// components
import { useParams } from 'src/routes/hook/use-param';
import { useSettingsContext } from 'src/components/settings/context/settings-context';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

//
import JobNewEditForm from '../job-new-edit-form';

// ----------------------------------------------------------------------

export default function JobEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentJob = _jobs.find((job) => job.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Job',
            href: paths.dashboard.job.root,
          },
          { name: currentJob?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <JobNewEditForm currentJob={currentJob} />
    </Container>
  );
}
