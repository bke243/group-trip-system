import Button from "@mui/material/Button";
import { createElement, MouseEvent } from "react";
import { iconImageType } from "../../../utils/customTypes";
import { blueButtonsColors } from "../colors/colors";

interface CustomButtonProps {
  buttonText: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  styles?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  icon: iconImageType;
}

const CutomButtonWithIcon = (props: CustomButtonProps) => {
  const { buttonText, onClick, type, disabled, icon } = props;
  return (
    <Button
      type={type}
      disabled={disabled}
      style={{
        textTransform: "none",
        backgroundColor: disabled ? "#cccccc" : blueButtonsColors,
        color: "white",
        height: "25px",
        borderRadius: "100px",
        fontWeight: 400,
      }}
      onClick={onClick}
      disableRipple>
      {buttonText} {createElement(icon, { fontSize: "small" })}
    </Button>
  );
};
export default CutomButtonWithIcon;
