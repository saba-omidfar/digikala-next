"use client";

import React from "react";
import ReactModal from "react-modal";

import MobileModalRenderer from "@/components/common/MobileModalRenderer";

import { useModal } from "@/contexts/modalContext";
import useScreenStatus from "@/hooks/useScreenStatus";

import "@/styles/modal.css";

ReactModal.setAppElement("#modal-root");

export default function ParentModal({ scope = "global" }) {
  const { isSmallScreen } = useScreenStatus();
  const { modals, closeModal } = useModal();

  const handleClose = (id) => {
    closeModal(id);
  };

  return (
    <>
      {modals
        .filter((m) => m.scope === scope)
        .map((modal) => {
          const sizeClass = modal.size
            ? {
                sm: "modal_sm",
                md: "modal_md",
                lg: "modal_lg",
                full: "modal_full",
              }[modal.size]
            : "modal_md";

          return (
            <ReactModal
              key={modal.id}
              isOpen={modal.isOpen}
              onRequestClose={() => handleClose(modal.id)}
              shouldCloseOnOverlayClick
              shouldCloseOnEsc
              style={{
                content: isSmallScreen ? {} : modal.anchorStyle,
              }}
              className={
                isSmallScreen
                  ? `bottomSheet__content bottomSheet__content--mobile ${modal.isOpen ? "bottomSheet__content--after-open" : ""} ${
                      modal.className
                    } bottomSheet__animation`
                  : `ReactModal__Content ${modal.isOpen ? "ReactModal__Content--after-open" : ""} ${sizeClass} ${modal.className}`
              }
              overlayClassName="modal-overlay"
            >
              {modal.content}
            </ReactModal>
          );
        })}
      <MobileModalRenderer scope={scope} />
    </>
  );
}
