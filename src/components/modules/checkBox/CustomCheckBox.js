import Checkbox from "@mui/material/Checkbox";

import toPersianDigits from "@/utils/toPersianDigits";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./customCheckBox.module.css";

function CustomCheckBox({
  id,
  isLast,
  checked,
  label,
  engLabel,
  changeHandler,
  customStyle,
  marginTop,
  color,
  titleClassName,
  isList = false,
}) {
  const { isSmallScreen, isSmallMobile } = useScreenStatus();

  return (
    <div
      className="w-100 d-flex align-items-center justify-content-start"
      style={{
        gap: customStyle ? customStyle?.gap : {},
        marginTop: marginTop ? marginTop : "",
      }}
    >
      <Checkbox
        id={id}
        checked={checked}
        onChange={(event) => {
          changeHandler(event.target.checked);
        }}
        disableRipple
        icon={
          <span
            style={{
              border: "2px solid #3f4064",
              borderRadius: "4px",
              width: isSmallMobile ? "15px" : "18px",
              height: isSmallMobile ? "15px" : "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        }
        checkedIcon={
          <span
            style={{
              border: color ? color : "2px solid #ef394e",
              backgroundColor: color ? color : "#ef394e",
              borderRadius: "4px",
              width: isSmallMobile
                ? "15px"
                : isList
                  ? isSmallScreen
                    ? "18px"
                    : "20px"
                  : "18px",
              height: isSmallMobile
                ? "15px"
                : isList
                  ? isSmallScreen
                    ? "18px"
                    : "20px"
                  : "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg className={styles.check_icon}>
              <use href="#check"></use>
            </svg>
          </span>
        }
        sx={{
          padding: 0,
          marginLeft: customStyle?.marginLeft
            ? customStyle?.marginLeft
            : "16px",
          "&:hover": { backgroundColor: "transparent" },
        }}
      />
      {label ? (
        <div className="flex-grow-1">
          <label
            htmlFor={id}
            className={styles.checkbox_label}
            style={
              customStyle
                ? customStyle
                : {
                    borderBottom: isLast ? "none" : "1px solid #f0f0f1",
                    padding: "12px 0 12px 12px",
                  }
            }
          >
            <div
              className={`${styles.checkbox_fa_title} ${titleClassName || ""}`}
            >
              {toPersianDigits(label)}
            </div>
            {engLabel && (
              <div className={styles.checkbox_eng_title}>{engLabel}</div>
            )}
          </label>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CustomCheckBox;
