/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import styles from "./WidgetSections.module.css";

export function WidgetHeader({ weatherData }) {
  const getCityLocalTime = (date) => {
    if (date) return date.split(" ")[1];
  };

  return (
    <div className={styles.headerWrap}>
      <h2 className={styles.headerCityName}>{weatherData.location.name}</h2>
      <h3 className={styles.headerCityTime}>{getCityLocalTime(weatherData.location.localtime)}</h3>
    </div>
  );
}

export function WidgetContent({ children, isExpanded }) {
  const ContentCSS = css`
    opacity: ${isExpanded ? "1" : "0"};

    transition: all ease-in-out 0.75s;
    transition-property: opacity;
  `;

  return <div css={ContentCSS}>{children}</div>;
}

export function WidgetFooter({ children }) {
  return <div className={styles.footerWrap}>{children}</div>;
}
