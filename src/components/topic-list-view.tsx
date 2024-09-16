"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Card,
  Table,
  Container,
  TableBody,
  TableContainer,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";

import QuestionTableRow from "./table/table-row";
import { TableHeadCustom } from "./table/table-head-custom";
import { TableNoData } from "./table/table-no-data";
import { Question, QuestionMeta, Topic } from "@/types";
import Iconify from "./iconify";
import TableToolbar from "./table/table-toolbar";
import { filterByValues } from "@/constants";

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
  const [filterBy, setFilterBy] = useState(filterByValues[0]);

  const handleFilterBy = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTableData(
      applyFilter({
        questions: getInitialData({
          questions: topic.questions,
          sheetName,
          title: topic.title,
        }),
        filter: event.target.value,
      })
    );
    setFilterBy(event.target.value);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const onUpdatedRow = useCallback(
    (question: QuestionMeta) => {
      const updatedList = [...tableData];
      let elementIndex = updatedList.findIndex(
        (q) => q.question.id === question.question.id
      );

      updatedList[elementIndex] = question;
      localStorage.setItem(
        sheetName + topic.title,
        JSON.stringify(updatedList)
      );

      setTableData(updatedList);
    },
    [tableData]
  );

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchTerm = event.target.value;

    if (searchTerm !== "") {
      const filteredResult = tableData.filter((item) =>
        item.question.name.includes(searchTerm)
      );
      setTableData(filteredResult);
    } else {
      setTableData(
        applyFilter({
          questions: getInitialData({
            questions: topic.questions,
            sheetName,
            title: topic.title,
          }),
          filter: filterByValues[0],
        })
      );
    }
  };

  useEffect(() => {
    const questions = getInitialData({
      questions: topic.questions,
      sheetName,
      title: topic.title,
    });

    setTableData(
      applyFilter({
        questions,
        filter: filterByValues[0],
      })
    );
  }, []);

  const notFound = !tableData.length;

  return (
    <>
      <Container maxWidth={"lg"} sx={{ mb: 2 }}>
        <Card>
          <>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              sx={{ py: 2.5, px: 3, bgcolor: "#212B36" }}
            >
              <TextField
                fullWidth
                onChange={(e) => handleSearch(e)}
                placeholder={`Search Questions in ${topic.title} ...`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Iconify
                        icon={"eva:search-fill"}
                        sx={{
                          color: "text.disabled",
                          width: 20,
                          height: 20,
                          mr: 2,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <TableToolbar
                filterRole={filterBy}
                name={"Sort By"}
                onFilterRole={handleFilterBy}
                optionsRole={filterByValues}
              />
            </Stack>
            <TableContainer sx={{ bgcolor: "#212B36" }}>
              <Table size={"medium"}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {tableData.map((row, index) => (
                    <QuestionTableRow
                      key={index}
                      row={row}
                      sheetName={sheetName}
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

function applyFilter({
  questions,
  filter,
}: {
  questions: QuestionMeta[];
  filter: string;
}): QuestionMeta[] {
  if (filter === filterByValues[0]) {
    return questions.sort((q1, q2) =>
      q1.question.name.localeCompare(q2.question.name)
    );
  } else if (filter === filterByValues[1]) {
    return questions.sort((q1, q2) => {
      if (q1.revisionDate && q2.revisionDate) {
        return (
          (new Date(q1.revisionDate) as any) -
          (new Date(q2.revisionDate) as any)
        );
      } else if (q1.revisionDate && !q2.revisionDate) {
        return -1;
      } else if (!q1.revisionDate && q2.revisionDate) {
        return 1;
      } else {
        return q1.question.name.localeCompare(q2.question.name);
      }
    });
  }

  return questions;
}

const getInitialData = ({
  questions,
  sheetName,
  title,
}: {
  questions: Question[];
  sheetName: string;
  title: string;
}) => {
  let tempQuestions: QuestionMeta[] = [];
  const item = localStorage.getItem(sheetName + title);
  if (item) {
    const q = JSON.parse(item) as QuestionMeta[];

    return q;
  } else {
    questions.map((question) =>
      tempQuestions.push({
        question,
        isBookMark: false,
        note: "",
        revisionDate: null,
        checked: false,
      })
    );
    localStorage.setItem(sheetName + title, JSON.stringify(tempQuestions));
    return tempQuestions;
  }
};
