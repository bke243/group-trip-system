import Button from "@mui/material/Button";
import { blueButtonsColors } from "../colors/colors";

interface CustomButtonProps {
  buttonText: string;
  onClick?: (event?: any) => void;
  styles?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  isDanger?: boolean;
  size?: "small" | "medium" | "large";
}

const CustomButton = (props: CustomButtonProps) => {
  const { buttonText, onClick, type, disabled, isDanger, size } = props;
  const backgroundColor = isDanger ? "red" : disabled ? "#cccccc" : blueButtonsColors;
  return (
    <Button
      type={type}
      size={size}
      disabled={disabled}
      style={{
        textTransform: "none",
        backgroundColor: backgroundColor,
        color: "white",
        width: "130px",
        height: "40px",
        borderRadius: "100px",
        fontWeight: 400,
      }}
      onClick={onClick}
      disableRipple>
      {buttonText}
    </Button>
  );
};

export default CustomButton;
