/* eslint-disable react/jsx-no-target-blank */
import logoSVG from "./icons/logo.svg";
import downloadSVG from "./icons/download.svg";
import joinSVG from "./icons/join.svg";

import React from "react";
import { Avatar, Button } from "antd";
import { useTranslation } from "react-i18next";

import { RouteNameType, usePushHistory } from "../../utils/routes";

export interface JoinPageDesktopProps {
    isLogin: boolean;
    avatar: string;
    roomUUID: string;
    privacyURL: string;
    serviceURL: string;
    joinRoom: () => void;
}

export default function JoinPageDesktop({
    isLogin,
    avatar,
    roomUUID,
    privacyURL,
    serviceURL,
    joinRoom,
}: JoinPageDesktopProps): React.ReactElement {
    const { t } = useTranslation();
    const pushHistory = usePushHistory();

    return (
        <div className="join-page-container">
            <div className="join-page-header-container">
                <img src={logoSVG} alt="flat-logo" />
                {isLogin ? (
                    <Avatar
                        className="join-page-header-avatar"
                        size={32}
                        icon={<img src={avatar} />}
                    />
                ) : (
                    <div
                        className="join-page-header-btn"
                        onClick={() => {
                            if (roomUUID) {
                                sessionStorage.setItem("roomUUID", roomUUID);
                                pushHistory(RouteNameType.LoginPage);
                            }
                        }}
                    >
                        {t("login")}
                    </div>
                )}
            </div>
            <div className="join-page-content-container">
                <div className="join-page-content-title">{t("select-the-way-to-join-room")}</div>
                <div className="join-page-content-btn-container">
                    <Button
                        className="join-page-content-btn"
                        onClick={() =>
                            window.open("https://flat.whiteboard.agora.io/#download", "_blank")
                        }
                    >
                        <img src={downloadSVG} alt="download icon" />
                        <div className="join-page-content-text-container">
                            <div className="join-page-content-text">
                                {t("download-desktop-application")}
                            </div>
                            <span className="join-page-content-sub-text">
                                {t("download-desktop-application-tips")}
                            </span>
                        </div>
                    </Button>
                    <Button className="join-page-content-btn" onClick={joinRoom}>
                        <img src={joinSVG} alt="join icon" />
                        <div className="join-page-content-text-container">
                            <div className="join-page-content-text">
                                {t("web-version-join-room")}
                            </div>
                            <span className="join-page-content-sub-text">
                                {t("web-version-join-room-tips")}
                            </span>
                        </div>
                    </Button>
                </div>
                <div className="join-page-content-divider">
                    <span>{t("or")}</span>
                </div>
                <div className="join-page-content-container-open-flat">
                    <span>{t("already-installed-flat-tips")}</span>
                    <a href={`x-agora-flat-client://joinRoom?roomUUID=${roomUUID}`}>
                        {t("open-now")}
                    </a>
                </div>
            </div>
            <div className="join-page-footer-container">
                <a href={privacyURL} target="_blank" rel="noreferrer">
                    {t("privacy-agreement")}
                </a>
                <span>｜</span>
                <a href={serviceURL} target="_blank" rel="noreferrer">
                    {t("service-policy")}
                </a>
            </div>
        </div>
    );
}
