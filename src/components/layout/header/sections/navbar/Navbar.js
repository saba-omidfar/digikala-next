"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePopper } from "react-popper";

import { useModal } from "@/contexts/modalContext";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useLocation } from "@/contexts/locationContext";
import { useUserContext } from "@/contexts/UserContext";

import LocationModal from "@/components/layout/header/modals/locationModal/LocationModal";
import SelectLocationModal from "@/components/layout/header/modals/selectLocationModal/SelectLocationModal";
import Megamenu from "@/components/layout/header/sections/megamenu/Megamenu";

import NavItem from "./NavItem";

import groupedMenuItems from "@/data/groupedMenuItems";

import styles from "./navbar.module.css";

function Navbar({ hideMenuOnTop, isOpenMegamenu, setIsOpenMegamenu }) {
  const { isSmallScreen } = useScreenStatus();
  const { openModal } = useModal();
  const { selectedLocation } = useLocation();
  const { user } = useUserContext();

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "bottom",

      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: 8,
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top"],
          },
        },
      ],
    },
  );

  useEffect(() => {
    if (isOpenMegamenu) {
      document.body.classList.add("lock-body-scroll");
    } else {
      document.body.classList.remove("lock-body-scroll");
    }
  }, [isOpenMegamenu]);

  const navStyle = useMemo(
    () => ({
      transform: hideMenuOnTop ? "translateY(-100%)" : "translateY(0)",
    }),
    [hideMenuOnTop],
  );

  const modalClickHandler = () => {
    if (selectedLocation) {
      if (isSmallScreen) {
        setShowLocations(true);
      } else {
        openModal(<LocationModal />, {
          name: "location",
          className: "modal__location rounded-large",
          size: "md",
        });
      }

      return;
    }

    openModal(<SelectLocationModal />, {
      name: "select-location",
      className: "modal__select_location rounded-large",
    });
  };

  return (
    <nav className={`${styles.navbar}`} style={navStyle}>
      {!hideMenuOnTop && (
        <div className={styles.navbar_container}>
          <div className="d-flex align-self-stretch">
            {groupedMenuItems?.map((group, groupIndex) => {
              const isMegamenu = group[0]?.isMegamenu;
              return (
                <div
                  className={styles.header_navigation__nav_group}
                  key={groupIndex}
                  onMouseEnter={
                    isMegamenu ? () => setIsOpenMegamenu(true) : undefined
                  }
                  onMouseLeave={
                    isMegamenu ? () => setIsOpenMegamenu(false) : undefined
                  }
                >
                  {group.map((item) => (
                    <NavItem key={item.title} item={item} />
                  ))}

                  {isOpenMegamenu && isMegamenu && <Megamenu />}
                </div>
              );
            })}

            <div className={styles.navbar_menu__border}></div>
          </div>

          {selectedLocation ? (
            <div className={styles.location} onClick={modalClickHandler}>
              <div className={styles.location_icon_container}>
                <div
                  data-icon-name="cube-location-pin"
                  data-icon="&#xE946;"
                  className={`${styles.location_icon} cube-font-icon`}
                ></div>
              </div>
              <div
                ref={setReferenceElement}
                className="position-relative"
                onMouseEnter={() => setIsTooltipOpen(true)}
                onMouseLeave={() => setIsTooltipOpen(false)}
              >
                <div className={styles.location_text}>
                  {selectedLocation?.address}
                </div>

                {isTooltipOpen && (
                  <div
                    ref={setPopperElement}
                    style={popperStyles.popper}
                    {...attributes.popper}
                    className={`${isTooltipOpen ? "tooltip__active" : "tooltip__inactive"} location_tooltip`}
                  >
                    <span className="tooltip_content">
                      مشاهده موجودی کالاها و ارسال سریع‌تر
                    </span>
                    <div
                      data-popper-arrow
                      className={styles.location_popper_arrow}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className={styles.navbar__selectcity}
              id="header-location"
              onClick={modalClickHandler}
            >
              <div>
                <div className={styles.navbar_selectcity_container}>
                  <div className="d-flex" aria-hidden="false">
                    <div
                      data-icon-name="cube-location-pin"
                      data-icon="&#xE946;"
                      className={`${styles.location_icon} cube-font-icon`}
                    ></div>
                  </div>
                  <p className={styles.location_text}>انتخاب آدرس</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
