import { DataGrid, GridColumnMenuContainer, GridFilterMenuItem, SortGridMenuItems } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "../../store/react-redux-hooks";
import { columns } from "./utils/UserManagement.util";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { fetchUsers, UserModel } from "../../store/userSlice";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-columnHeadersInner": {
      backgroundColor: "green",
      width: "100%",
      color: "white",
    },
    textTransform: "capitalize",
  },
});

export interface PersonRowProps {
  id: number;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  isActive: boolean;
  accountId: number,
}

const UserManagement = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const usersDetails = users ? users : [];
  
  return (
    <Box style={{ width: "100%", minHeight: "80vh", display: "flex", justifyContent: "center" }}>
      <Box style={{ width: "85%", padding: "15px", maxHeight: "80vh", backgroundColor: "white" }}>
        <DataGrid
          className={classes.root}
          rows={getPersonsRows(usersDetails)}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          components={{
            ColumnMenu: (props: { hideMenu: any; currentColumn: any; open: any; }) => {
              const { hideMenu, currentColumn, open } = props;
              return (
                <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} open={open}>
                  <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
                  <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
                </GridColumnMenuContainer>
              );
            },
          }}
        />
      </Box>
    </Box>
  );
};

const getPersonsRows = (users: UserModel[]): PersonRowProps[] => {
    return users.map((user) => ({
      id: user.id,
      firstName: user.personDetails.firstName,
      lastName: user.personDetails.lastName,
      birthDate: user.personDetails.birthDate,
      isActive: user.isActive,
      accountId: user.accountId,
    }));
  };

export default UserManagement;
