import { useMemo } from "react";
// routes
import { paths } from "src/routes/paths";
// locales
// components
import Label from "src/components/label/label";
import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon("ic_job"),
  blog: icon("ic_blog"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  tour: icon("ic_tour"),
  order: icon("ic_order"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  product: icon("ic_product"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: "overview",
        items: [
          { title: "app", path: paths.dashboard.root, icon: ICONS.dashboard },
          {
            title: "ecommerce",
            path: paths.dashboard.general.ecommerce,
            icon: ICONS.ecommerce,
          },
          {
            title: "analytics",
            path: paths.dashboard.general.analytics,
            icon: ICONS.analytics,
          },
          {
            title: "banking",
            path: paths.dashboard.general.banking,
            icon: ICONS.banking,
          },
          {
            title: "booking",
            path: paths.dashboard.general.booking,
            icon: ICONS.booking,
          },
          {
            title: "file",
            path: paths.dashboard.general.file,
            icon: ICONS.file,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: "management",
        items: [
          // USER
          {
            title: "user",
            path: paths.dashboard.user.root,
            icon: ICONS.user,
            children: [
              { title: "profile", path: paths.dashboard.user.root },
              { title: "cards", path: paths.dashboard.user.cards },
              { title: "list", path: paths.dashboard.user.list },
              { title: "create", path: paths.dashboard.user.new },
              { title: "edit", path: paths.dashboard.user.demo.edit },
              { title: "account", path: paths.dashboard.user.account },
            ],
          },
        ],
      },

      // DEMO MENU STATES
    ],
    []
  );

  return data;
}
