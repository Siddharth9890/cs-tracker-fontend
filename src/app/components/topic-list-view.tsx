"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Tabs,
  Card,
  Table,
  Button,
  Container,
  TableBody,
  TableContainer,
} from "@mui/material";

import { routes } from "@/routes/routes";
import QuestionTableRow from "./table/table-row";
import { TableEmptyRows } from "./table/table-empty-rows";
import { TableHeadCustom } from "./table/table-head-custom";
import { TableNoData } from "./table/table-no-data";
import CustomBreadcrumbs from "./custom-breadcrumbs/custom-breadcrumbs";
import { Question, QuestionMeta, Topic, UpdateType } from "@/types";

const TABLE_HEAD = [
  { id: "", label: "" },
  { id: "question-name", label: "Question Name" },
  { id: "link", label: "Link" },
  { id: "note", label: "Note" },
  { id: "book-mark", label: "Book Mark" },
  { id: "revision-date", label: "Revision Date" },
];

export default function TopicListView({
  topic,
  sheetName,
}: {
  topic: Topic;
  sheetName: string;
}) {
  const [tableData, setTableData] = useState<QuestionMeta[]>([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  const onUpdatedRow = useCallback(
    (question: QuestionMeta) => {
      const updatedList = [...tableData];
      let elementIndex = updatedList.findIndex(
        (q) => q.question.id === question.question.id
      );
      console.log(updatedList, elementIndex);

      updatedList[elementIndex] = question;
      localStorage.setItem(
        sheetName + topic.title,
        JSON.stringify(updatedList)
      );
      console.log(updatedList);

      setTableData(updatedList);
    },
    [tableData]
  );

  function applyFilter({
    questions,
  }: {
    questions: Question[];
  }): QuestionMeta[] {
    return getInitialData({ questions });
  }

  useEffect(() => {
    setTableData(getInitialData({ questions: topic.questions }));
  }, []);

  const getInitialData = ({ questions }: { questions: Question[] }) => {
    let tempQuestions: QuestionMeta[] = [];
    console.log("1");
    const item = localStorage.getItem(sheetName + topic.title);
    if (item) {
      console.log("2");

      const q = JSON.parse(item) as QuestionMeta[];
      console.log("3");

      return q;
    } else {
      console.log("4");

      questions.map((question) =>
        tempQuestions.push({
          question,
          isBookMark: false,
          note: "",
          revisionDate: null,
          checked: false,
        })
      );
      console.log(tempQuestions);
      localStorage.setItem(
        sheetName + topic.title,
        JSON.stringify(tempQuestions)
      );
      return tempQuestions;
    }
  };

  const notFound = !tableData.length;

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
          <>
            <TableContainer sx={{ minWidth: 800, position: "relative" }}>
              <Table size={"medium"}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {tableData.map((row, index) => (
                    <QuestionTableRow
                      key={index}
                      row={row}
                      onUpdatedRow={(question) => onUpdatedRow(question)}
                    />
                  ))}

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </>
        </Card>
      </Container>
    </>
  );
}
