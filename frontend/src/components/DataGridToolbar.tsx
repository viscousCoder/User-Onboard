import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

const DataGridToolbar = () => {
  return (
    <Box>
      <GridToolbarContainer sx={{ display: "flex", gap: 10 }}>
        <GridToolbarExport />
        <GridToolbarFilterButton />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    </Box>
  );
};

export default DataGridToolbar;
