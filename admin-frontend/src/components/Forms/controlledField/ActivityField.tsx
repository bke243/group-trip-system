import { Box, Divider, IconButton } from "@mui/material";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ActivityAccordion from "../../ActivityAccordion/ActivityAccordion";
import CustomButton from "../../common/Button/Button";
import { FormFieldProps } from "../utils/fieldsUtilities";
import ControlledFreeTextField from "./ControlledFreeTextField";
import ClearIcon from "@mui/icons-material/Clear";

const ActivityField = (props: FormFieldProps) => {
  const [activity, setActivity] = useState<string>("")
  const { setValue, getValues, control } = useFormContext();
  const activities = useWatch({ name: "activities", control })

  const onActivityChange = (value: any) => {
    setActivity(value.target?.value ?? "");
  };

  const onAddActivityClick = () => {
    setValue("activities", [ ...getValues("activities"),  activity]);
    setActivity("");
  };

  const onRemoveActivity = (activityIndex: number) => {
    const newActivities = ([ ...getValues("activities") ]).filter((_activity, index) => index !== activityIndex);
    setValue("activities", [...newActivities]);
  };

  return (
  <Box>
    <Box display="flex" justifyContent="space-between">
      <Box width={"70%"}>
        <ControlledFreeTextField errorText="At least one activity is required"  error={props.error} label={"Activity"} name={"activities"} value={activity} onChange={onActivityChange} />
      </Box>
      <Box>
        <CustomButton onClick={onAddActivityClick} disabled={!activity} buttonText="Add activity" size="small" type="button" />
      </Box>
    </Box>
    <Box marginTop={"25px"}>
      <ActivityAccordion>
        {(activities as string[]).map((activity, index) => {
          return <Box  key={`activity-${index}-${activity}`} paddingTop={"10px"} paddingBottom={"10px"}>
          <ActivityViewer activty={activity} onRemove={() => onRemoveActivity(index)} />
          <Divider/>
          </Box>
        })}
        {(activities as string[]).length === 0  ? "No activities" : <></>}
      </ActivityAccordion>
    </Box>
  </Box>)
};

const ActivityViewer = (props: { activty: string, onRemove: () => void }) => {
  const { activty, onRemove } = props;
  return (
  <Box>
    <Box display={"flex"} justifyContent={"flex-end"}>
      <IconButton onClick={onRemove}>
        <ClearIcon color="error" />
      </IconButton> 
    </Box>
    {activty}
  </Box>
  );
}

export default ActivityField;
