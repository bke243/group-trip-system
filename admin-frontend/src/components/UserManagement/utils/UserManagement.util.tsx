import { GridColDef, GridValueGetterParams, GridRenderCellParams } from "@mui/x-data-grid";
import { createElement, MouseEvent } from "react";
import { IconButton } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { iconImageType } from "../../../utils/customTypes";
import { PersonRowProps } from "../UserManagement";
import { useDispatch } from "../../../store/react-redux-hooks";
import { manageUserStatus, USER_STATUS } from "../../../store/userSlice";


const DataGridIconCell = (props: { onClick: (event: MouseEvent | undefined) => void; icon: iconImageType }) => {
  const { icon, onClick } = props;
  return <IconButton onClick={(event) => onClick(event)}>{createElement(icon)}</IconButton>;
};


const DataGridDetailsViewIconCell = (props: PersonRowProps) => {
  const { accountId, isActive } = props;
  const dispatch = useDispatch();
  
  const onDataGridDetailsViewIconCellClickHanlder = (event: MouseEvent | undefined) => {
    event?.stopPropagation();
    event?.preventDefault();
    dispatch(manageUserStatus({ userAccountId: accountId, newStatus: isActive ? USER_STATUS.ACTIVE : USER_STATUS.BLOCKED }));
  };
  return <DataGridIconCell onClick={(event) => onDataGridDetailsViewIconCellClickHanlder(event)} icon={ isActive ? LockOpenIcon : LockIcon} />;
};

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 100 },
  { field: "firstName", headerName: "First name", minWidth: 200, disableColumnMenu: true },
  { field: "lastName", headerName: "Last name", minWidth: 200, disableColumnMenu: true },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    minWidth: 180,
    disableColumnMenu: true,
    valueGetter: ({  row }: GridValueGetterParams<PersonRowProps>) => `${row.firstName} ${row.lastName}`,
  },
  {
    field: "birthDate",
    headerName: "Date of birth",
    type: "number",
    minWidth: 150,
    disableColumnMenu: true,
  },
  {
    field: "accountId",
    headerName: "Account Id",
    type: "number",
    minWidth: 150,
    disableColumnMenu: true,
  },
  {
    field: "status",
    headerName: "Account Status",
    type: "number",
    minWidth: 150,
    disableColumnMenu: true,
    renderCell: ({ row: rowData }: GridRenderCellParams<PersonRowProps>) => <DataGridDetailsViewIconCell {...rowData} />,
  },
];
