import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

const ListTable = ({ data, columns, loading, error, onEditClick }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const hasEditColumn = !!onEditClick;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
            {hasEditColumn && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "total"
                    ? `$${row.total.toFixed(2)}`
                    : row[column.key]}
                </TableCell>
              ))}
              {hasEditColumn && (
                <TableCell>
                  <Button onClick={() => onEditClick(row.id)}>Edit</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ListTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onEditClick: PropTypes.func,
};

export default ListTable;
