"use client";
import { useState, useCallback } from "react";
import { alpha } from "@mui/material/styles";
import {
  Tabs,
  Card,
  Table,
  Button,
  Container,
  TableBody,
  TableContainer,
} from "@mui/material";

import TableFiltersResult from "./table/table-filter-result";
import { routes } from "@/routes/routes";
import QuestionTableRow from "./table/table-row";
import { TableEmptyRows } from "./table/table-empty-rows";
import { TableHeadCustom } from "./table/table-head-custom";
import { TableNoData } from "./table/table-no-data";
import { TablePaginationCustom } from "./table/table-pagination-custom";
import { useTable } from "./table/use-table";
import { getComparator, emptyRows } from "./table/utils";
import CustomBreadcrumbs from "./custom-breadcrumbs/custom-breadcrumbs";
import Scrollbar from "./scrollbar/scrollbar";
import { Question, Topic } from "@/types";

const TABLE_HEAD = [
  { id: "", width: 88 },
  { id: "question-name", label: "Question Name" },
  { id: "link", label: "Link" },
  { id: "note", label: "Note" },
  { id: "book-mark", label: "Book Mark" },
  { id: "revision-date", label: "Revision Date" },
];

const defaultFilters: any = {
  name: "",
  role: [],
  status: "all",
};

export default function TopicListView({ topic }: { topic: Topic }) {
  const table = useTable();

  const [tableData, setTableData] = useState<Question[]>(topic.questions);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const notFound = !dataFiltered.length;

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

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters("status", newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={"lg"}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: "Dashboard", href: routes.home },
            { name: "Sheet", href: routes.sheet },
            { name: "List" },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          ></Tabs>

          {false && (
            <TableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer>
            <Scrollbar>
              <Table size={table.dense ? "small" : "medium"}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <QuestionTableRow
                        key={index}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
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
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
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
