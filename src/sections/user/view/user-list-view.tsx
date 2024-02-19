import isEqual from "lodash/isEqual";
import { useState, useCallback } from "react";

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";

import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import { _userList } from "src/_mock/_user";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs/custom-breadcrumbs";

import UserTableRow from "../user-table-row";
import UserTableToolbar from "../user-table-toolbar";
import UserTableFiltersResult from "../user-table-filters-result";
import { TableEmptyRows } from "src/components/table/table-empty-rows";
import { TableHeadCustom } from "src/components/table/table-head-custom";
import { TableNoData } from "src/components/table/table-no-data";
import { TablePaginationCustom } from "src/components/table/table-pagination-custom";
import { useTable } from "src/components/table/use-table";
import { getComparator, emptyRows } from "src/components/table/utils";
import { _roles } from "src/_mock/assets";

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "phoneNumber", label: "Phone Number", width: 180 },
  { id: "company", label: "Company", width: 220 },
  { id: "role", label: "Role", width: 180 },
  { id: "status", label: "Status", width: 100 },
];

const defaultFilters: any = {
  name: "",
  role: [],
  status: "all",
};

export default function UserListView() {
  const table = useTable();

  const [tableData, setTableData] = useState(_userList);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: any) => {
      table.onResetPage();
      setFilters((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading="Subjects List"
          links={[]}
          description="Choose one of the subject to see associated topics inside it."
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: "relative" }}>
            <>
              <Table
                size={table.dense ? "small" : "medium"}
                sx={{ minWidth: 960 }}
              >
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      tableData.length
                    )}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
          />
        </Card>
      </Container>
    </>
  );
}

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: any[];
  comparator: (a: any, b: any) => number;
  filters: any;
}) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== "all") {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
