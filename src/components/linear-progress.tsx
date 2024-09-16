import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

export default function LinearProgressWithLabel(
  props: LinearProgressProps & {
    currentProgress: number;
    totalProgress: number;
  }
) {
  return (
    <>
      <Typography
        variant="body1"
        align="center"
        sx={{ color: "text.secondary", mb: 2 }}
      >
        Total Questions Solved: {props.currentProgress}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
    </>
  );
}
