import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { useSelector, useDispatch } from "../../../../store/react-redux-hooks";
import { fecthMessagesByUserId } from "../../../../store/userSlice";

interface PersonMessageProps {
  userId: number 
}

const PersonMessages = (props: PersonMessageProps) => {
  const { userId } = props;;
  const { messages } = useSelector((state) => state.user);
  const { personData } = useSelector((state) => state.system);
  const dispacth = useDispatch();
  const userMessages = messages[userId]?.messages ? messages[userId]?.messages : [];

  useEffect(() => {
    dispacth(fecthMessagesByUserId(userId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const sortedMessages = userMessages && userMessages?.length > 0 ? [...userMessages].sort((firstMessage, secondMessage) => {
    return (new Date(firstMessage.sentDate as any).getTime()) - (new Date(secondMessage.sentDate as any).getTime());
  }) : [];

  return (
    <Box display={"flex"} flexDirection={"column"}>
      {sortedMessages.map((message, index) => {
        return (
        <Typography 
          key={`message-${message.id}-${index}`}
          style={{ 
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "5px",
                  border: "2px solid green",
                  width: "80%",
                  backgroundColor: "#66b3ff",
                  alignSelf: message.originId === personData?.id ? "flex-end" : "flex-start" }}>
            {message.content}
            <span style={{ alignSelf: "flex-end"}}>{moment(message.sentDate).format("YYYY-MM-DDTHH:mm:ss.SSS")}</span>
        </Typography>);
      })}
    </Box>
  );
};

export default PersonMessages;