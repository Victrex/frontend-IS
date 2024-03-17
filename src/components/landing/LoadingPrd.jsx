import { Box, Grid, Skeleton } from "@mui/material";

const LoadingPrd = () => {
  const times = 20;
  return (
    <Grid container wrap="wrap" item spacing={2} xs={8} gap={2}>
        {Array.from(new Array(times)).map((item, index) => (
          <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={188} />
            <Box sx={{ pt: 0.8 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        ))}
     
    </Grid>
  );
};

export default LoadingPrd;
