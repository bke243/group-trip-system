import MenuBookIcon from "@mui/icons-material/MenuBook";

export type iconImageType = typeof MenuBookIcon;

export const truncateText = (text: string, limit: number) => {
    const dots = "...";
    if (text.length > limit) {
      // you can also use substr instead of substring
      const newText = text.substring(0, limit) + dots;
      return newText;
    }
    return text;
  };
  
  export const TRUNCATION_INDEX = 15;
  