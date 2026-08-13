import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  minWidth: 32,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 10,
      height: 10,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 5,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1672dd",
        border: "none",
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#fff !important",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 10,
    height: 10,
    backgroundColor: "#a1a3a8",
    borderRadius: 50,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 9999,
    opacity: 1,
    backgroundColor: "transparent",
    border: "2px solid #a1a3a8",
    boxSizing: "border-box",
  },
}));

export default function CustomSwitch({ filterKey, checked, onChange }) {
  return (
    <FormGroup>
      <Stack>
        <StyledSwitch name={filterKey} checked={checked} onChange={onChange} />
      </Stack>
    </FormGroup>
  );
}
