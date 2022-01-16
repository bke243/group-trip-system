import { Box, TextareaAutosize, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store/react-redux-hooks";
import { fetchUsers, sendMessageToUser } from "../../store/userSlice";
import SendIcon from '@mui/icons-material/Send';
import PersonsList, { PersonsListItem } from "./integrant/PersonsList/PersonsList";
import PersonMessages from "./integrant/PersonMessages/PersonMessages";

const AdminMessageTabPanel = () => {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [messageContent, setMessageContent] = useState<string>("");
  const { users } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(fetchUsers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usersDetails = users ? users : [];

  const onItemCLickHandler = (personId: number) => {
    setSelectedUserId(personId);
  }

  const sendMessageHandler = () => {
    dispatch(sendMessageToUser({ content: messageContent, receiverId: selectedUserId! }));
    setMessageContent("");
  }

  const onMessageChange = (value: any) => {
    setMessageContent(value.target?.value ?? "");
  };

  return (
    <Box display={"flex"} width={"100%"} height={"80vh"} maxHeight={"80vh"} border={"1px solid grey"}>
      <Box width={"25%"} maxHeight={"fit-content"} borderRight={"1px solid grey"}>
        <PersonsList>
          {usersDetails.map((userDetail) => (<PersonsListItem userDetail={userDetail} selectedUserId={selectedUserId} key={`user-${userDetail.id}`} onItemCLickHandler={() => onItemCLickHandler(userDetail.id)} />))}
        </PersonsList>
      </Box>  
      <Box width={"75%"} maxHeight={"fit-content"} display="flex" flexDirection="column" justifyContent="space-between">
        <Box height={"70%"} padding={"10px"} style={{ overflowY: "scroll" }}>
          {selectedUserId ? <PersonMessages userId={selectedUserId} /> : <Typography>Select a user</Typography>}
        </Box>
        <Box height={"30%"} maxHeight={"fit-content"} padding={"10px"} display="flex" justifyContent={"space-between"} borderTop={"1px solid grey"}>
          <Box width={"85%"}>
            <TextareaAutosize
                name={"description"}
                placeholder={"Message cotent*"}
                autoComplete="off"
                onChange={onMessageChange}
                value={messageContent}
                minRows={10}
                maxRows={10}
                draggable={false}
                style={{ width: "100%", resize: "none", borderColor: "1px solid #C2C2C2", borderRadius: "5px", border: "2px solid #66b3ff" }}
              />
          </Box>
          <Box>
            <IconButton size="large" disabled={!((messageContent !== "") && (selectedUserId !== undefined))} color="primary" onClick={sendMessageHandler}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>  
    </Box>
  );
};

export default AdminMessageTabPanel;
