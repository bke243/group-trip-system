import { GridColDef, GridValueGetterParams, GridRenderCellParams } from "@mui/x-data-grid";
import { createElement } from "react";
import { IconButton } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { iconImageType } from "../../../utils/customTypes";
import { PersonRowProps } from "../UserManagement";


const DataGridIconCell = (props: { onClick: () => void; icon: iconImageType }) => {
  const { icon, onClick } = props;
  return <IconButton onClick={onClick}>{createElement(icon)}</IconButton>;
};


const DataGridDetailsViewIconCell = (props: PersonRowProps) => {
  
  const onDataGridDetailsViewIconCellClickHanlder = () => {
    console.log("clickked", props.id)
  };
  return <DataGridIconCell onClick={onDataGridDetailsViewIconCellClickHanlder} icon={ props.blocked ?  LockIcon : LockOpenIcon} />;
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
    field: "status",
    headerName: "Account Status",
    type: "number",
    minWidth: 150,
    disableColumnMenu: true,
    renderCell: ({ row: rowData }: GridRenderCellParams<PersonRowProps>) => <DataGridDetailsViewIconCell {...rowData} />,
  },
];
