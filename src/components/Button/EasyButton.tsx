import React, {
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { buttonStyles } from "../../themes";
import EasyButtonContext from "../../contexts/Button/EasyButtonContext";
export interface ButtonProps {
  label?: string;
  title?: string;
  theme?: ButtonTheme;
  debounceTimeout?: number;
  disabled?: boolean;
  easyRef?: any;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  resetDefaultStyles?: boolean;
  children?: ReactNode;
  loading?: { isLoading: boolean; loader: ReactNode };
  onClick?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
}

/**
 * Button themes
 */
export type ButtonTheme =
  | string
  | "custom"
  | "easy_success"
  | "easy_info"
  | "easy_warn"
  | "easy_error"
  | "easy_purple"
  // | "primary_success"
  // | "primary_info"
  // | "primary_warn"
  // | "primary_error"
  // | "secondary_success"
  // | "secondary_info"
  // | "secondary_warn"
  // | "secondary_error"
  // | "primary_success_outline"
  // | "primary_info_outline"
  // | "primary_warn_outline"
  // | "primary_error_outline"
  // | "secondary_success_outline"
  // | "secondary_info_outline"
  // | "secondary_warn_outline"
  // | "secondary_error_outline";

export const EasyButton: React.FC<ButtonProps> = ({
  easyRef,
  theme,
  title,
  label,
  debounceTimeout = 0,
  disabled = false,
  style,
  hoverStyle,
  resetDefaultStyles = false,
  children,
  loading = { isLoading: false, loader: <>Loading...</> },
  onClick = () => {},
  onFocus = () => {},
  onHover,
}) => {
  const [debounceDelay, setDebounceDelay] = useState(debounceTimeout);
  const [isHover, setIsHover] = useState<boolean>(false);

  const { themes } = useContext(EasyButtonContext);

  /**
   * Handle hover state
   */
  useEffect(() => {
    if (isHover) {
      onHover && onHover();
    }
  }, [isHover]);

  /**
   * handle debounce
   */
  useEffect(() => {
    setDebounceDelay(debounceTimeout);
  }, [debounceTimeout]);

  const debounce = useDebouncedCallback((fn) => {
    fn();
  }, debounceDelay);

  /**
   * Handle button styles
   * Return all styles based on condition
   */
  const getButtonStyles = (
    theme: ButtonTheme | undefined = "custom",
    styles: React.CSSProperties | undefined,
    hoverStyles: React.CSSProperties | undefined,
    resetDefaultStyles: boolean = false,
    isHovered: boolean,
  ): React.CSSProperties | undefined => {
    if (theme === "custom") {
      return !isHovered ? styles : hoverStyles;
    }

    const easyButtonThemes = { ...buttonStyles, ...themes };

    console.log("themes", easyButtonThemes);

    if (styles || hoverStyles) {
      /* @ts-ignore */
      return !isHovered
        ? {
            /* @ts-ignore */
            ...(resetDefaultStyles ? {} : easyButtonThemes[theme].normal),
            ...styles,
          } /* @ts-ignore */
        : {
            ...(resetDefaultStyles
              ? {}
              : {
                  /* @ts-ignore */
                  ...easyButtonThemes[theme].normal,
                  ...styles,
                  /* @ts-ignore */
                  ...easyButtonThemes[theme].hover,
                }),
            ...hoverStyles,
          };
    }

    /* @ts-ignore */
    return !isHovered
      ? resetDefaultStyles
        ? {}
        : /* @ts-ignore */
          easyButtonThemes[theme].normal
      : resetDefaultStyles
      ? {}
      : /* @ts-ignore */
        easyButtonThemes[theme].hover;
  };

  return (
    <button
      ref={easyRef}
      className={`react-easy-button react-easy-button-${theme} ${theme}`}
      title={title && title}
      style={getButtonStyles(
        theme,
        style,
        hoverStyle,
        resetDefaultStyles,
        isHover,
      )}
      onClick={() =>
        debounce(function () {
          onClick();
        })
      }
      onFocus={() =>
        debounce(function () {
          onFocus();
        })
      }
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      disabled={disabled}
    >
      {!loading.isLoading
        ? children
          ? children
          : label
          ? label
          : false
        : loading.loader}
    </button>
  );
};

export default EasyButton;
