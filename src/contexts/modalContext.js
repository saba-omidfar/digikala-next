"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);
  const [mobileModals, setMobileModals] = useState([]);

  const updateAnchorPosition = useCallback((options) => {
    let el = null;

    if (options?.anchorRef?.current) {
      el = options.anchorRef.current;
    } else if (options?.anchorId) {
      el = document.getElementById(options.anchorId);
    }

    if (!el) return {};

    const rect = el.getBoundingClientRect();

    return {
      "--anchor-top": `${rect.top}px`,
      "--anchor-left": `${rect.left}px`,
      "--anchor-right": `${rect.right}px`,
      "--anchor-width": `${rect.width}px`,
    };
  }, []);

  const openModal = useCallback(
    (content, options = {}) => {
      const id = crypto.randomUUID?.() || String(Date.now());

      const anchorStyle = updateAnchorPosition(options);

      const newModal = {
        id,
        name: options.name || null,
        isOpen: true,
        content,
        options,
        className: options.className || "",
        size: options.size || "md",
        scope: options.scope || "global",
        anchorStyle,
      };

      setModals((prev) => [...prev, newModal]);

      return id;
    },
    [updateAnchorPosition],
  );

  const closeModal = useCallback((value) => {
    setModals((prev) => {
      if (!prev.length) return prev;

      if (!value) {
        return prev.slice(0, -1);
      }

      return prev.filter((m) => m.id !== value && m.name !== value);
    });
  }, []);

  const openMobileModal = (name, props = {}, options = {}) => {
    const id = crypto.randomUUID();

    setMobileModals((prev) => [
      ...prev,
      {
        id,
        name,
        props,
        scope: options.scope || "global",
      },
    ]);

    return id;
  };

  const closeMobileModal = (value) => {
    setMobileModals((prev) => {
      if (!prev.length) return prev;

      if (!value) {
        return prev.slice(0, -1);
      }

      return prev.filter((m) => m.id !== value && m.name !== value);
    });
  };

  const closeAll = useCallback(() => setModals([]), []);
  const closeAllMobile = useCallback(() => setMobileModals([]), []);

  const value = useMemo(
    () => ({
      modals,
      openModal,
      closeModal,
      closeAll,
      mobileModals,
      openMobileModal,
      closeMobileModal,
      closeAllMobile,
    }),
    [modals, mobileModals, openModal, closeModal, closeAll, closeAllMobile],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
