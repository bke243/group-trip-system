import { List, ListItem, ListItemText } from "@mui/material";
import { UserModel } from "../../../../store/userSlice";

const PersonsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper', display: "flex", flexDirection: "column", padding: "0px" }} >
      {children}
    </List> 
  )
};

interface PersonListitemProps {
  userDetail: UserModel;
  selectedUserId?: number;
  onItemCLickHandler: () => void;
}

export const PersonsListItem = (props: PersonListitemProps) => {
  const { selectedUserId, userDetail, onItemCLickHandler } = props;
  const isPersonSelected = userDetail.id === selectedUserId;
  return (
    <ListItem onClick={onItemCLickHandler} alignItems="flex-start" style={{ backgroundColor: isPersonSelected ? "#66b3ff" : "#E7EBF0", borderBottom: "2px solid grey", cursor: "pointer" }}>
      <ListItemText
        primary={`${userDetail.personDetails.firstName} ${userDetail.personDetails?.lastName}`}
        secondary={`${userDetail.email}`}
      />
    </ListItem>
  )
}

export default PersonsList;