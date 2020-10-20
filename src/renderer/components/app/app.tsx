import React, { FC, useEffect } from "react";
import { ipcRenderer } from "electron";
import { useTranslation } from "react-i18next";
import "./app.css";

export const App: FC = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    ipcRenderer.on("get-locale-reply", (e, code: string) => {
      i18n.changeLanguage(code);
    });
  });
  return <div className="app">{t("appName")}</div>;
};
