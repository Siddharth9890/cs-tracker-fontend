// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook/use-param';
// _mock
import { _invoices } from 'src/_mock/_invoice';
// components
import { useSettingsContext } from 'src/components/settings/context/settings-context';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

//
import InvoiceNewEditForm from '../invoice-new-edit-form';

// ----------------------------------------------------------------------

export default function InvoiceEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

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
            name: 'Invoice',
            href: paths.dashboard.invoice.root,
          },
          { name: currentInvoice?.invoiceNumber },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <InvoiceNewEditForm currentInvoice={currentInvoice} />
    </Container>
  );
}
