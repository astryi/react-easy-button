import React from "react";

/**
 * Button default styles
 */
export const defaultStyles: React.CSSProperties = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  fontSize: 15,
  fontWeight: "500",
  color: "#000",
  backgroundColor: "#fcfcfc",
  border: 0,
  borderRadius: 5,
  boxShadow: "0px 2px 4px rgba(193, 193, 193, 0.25)",
};

/**
 * Button styles obj contains normal, hover & other values
 */
export const buttonStyles = {
  easy_success: {
    normal: {
      ...defaultStyles,
      color: "#04A100",
      backgroundColor: "#DAFFD9",
      opacity: 1,
    },
    hover: {
      color: "#04A100",
      backgroundColor: "#DAFFD9",
      opacity: 0.7,
    },
  },
  easy_info: {
    normal: {
      ...defaultStyles,
      color: "#006AFE",
      backgroundColor: "#D9E9FF",
      opacity: 1,
    },
    hover: {
      color: "#006AFE",
      backgroundColor: "#D9E9FF",
      opacity: 0.7,
    },
  },
  easy_warn: {
    normal: {
      ...defaultStyles,
      color: "#A48000",
      backgroundColor: "#FFFBD9",
      opacity: 1,
    },
    hover: {
      color: "#A48000",
      backgroundColor: "#FFFBD9",
      opacity: 0.7,
    },
  },
  easy_error: {
    normal: {
      ...defaultStyles,
      color: "#FF0000",
      backgroundColor: "FFD9D9",
      opacity: 1,
    },
    hover: {
      color: "#FF0000",
      backgroundColor: "#A48000",
      opacity: 0.7,
    },
  },
  easy_purple: {
    normal: {
      ...defaultStyles,
      color: "#8D00FF",
      backgroundColor: "#EED9FF",
      opacity: 1,
    },
    hover: {
      color: "#8D00FF",
      backgroundColor: "#EED9FF",
      opacity: 0.7,
    },
  },
};
