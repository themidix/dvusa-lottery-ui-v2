import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export const OfficersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;


  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nom complet
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                    Cybercafe
                </TableCell>
                <TableCell>
                    Id User
                </TableCell>
                <TableCell>
                    Options
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((agent) => {
                const isSelected = selected.includes(agent.agentId);
                // const createdAt = format(agent.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={agent.agentId}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(agent.id);
                          } else {
                            onDeselectOne?.(agent.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        {/* <Avatar src={agent.avatar}>
                          {getInitials(agent.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {agent.lastName} {agent.middleName} {agent.firstName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {agent.agentEmail}
                    </TableCell>
                    <TableCell>
                      {agent.agentPhoneNumber}
                    </TableCell>
                    <TableCell>
                      {agent.dvBusiness}
                    </TableCell>
                    <TableCell>
                      {agent.user}
                    </TableCell>
                    <TableCell>
                      <Stack
                          alignItems="center"
                          direction="row"
                          spacing={2}
                        >
                         <EditIcon />  
                         <DeleteIcon />  
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OfficersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
