"use client";

import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AddToNextPurchaseModal from "@/features/cart/modals/addToNextPurchaseModal/AddToNextPurchaseModal";
import RemoveAllProductsFromBasketModal from "@/features/cart/modals/removeAllProductsFromBasketModal/RemoveAllProductsFromBasketModal";

import usePopoverPosition from "@/hooks/usePopoverPosition";
import { useModal } from "@/contexts/modalContext";

import styles from "./cartPopover.module.css";

export default function CartPopover({ anchorRef, open, onClose }) {
  const { openModal } = useModal();

  const position = usePopoverPosition(anchorRef, open, 108);

  const moveAllProductsToNextPurchaseBasket = () => {
    onClose();

    openModal(<AddToNextPurchaseModal />, {
      name: "addToNextPurchase",
      className: "rounded-medium",
      size: "md",
    });
  };

  const removeAllProductsFromBasketFromBasket = () => {
    onClose();

    openModal(<RemoveAllProductsFromBasketModal />, {
      name: "removeAllProductsFromBasketFromBasket",
      className: "rounded-medium",
      size: "md",
    });
  };

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={position}
      disableScrollLock
      className={styles.popover}
      PaperProps={{
        sx: {
          transform: "translateX(-50%)",
        },
      }}
    >
      <List disablePadding>
        <ListItem
          component="button"
          onClick={moveAllProductsToNextPurchaseBasket}
        >
          <ListItemIcon>
            <div className="d-flex">
              <div
                className={`${styles.saveForLater_icon} cube-font-icon`}
                data-icon-name="cube-action-favorite-list"
                data-icon=""
              ></div>
            </div>
          </ListItemIcon>
          <ListItemText primary="انتقال همه به لیست خرید بعدی" />
        </ListItem>

        <ListItem
          component="button"
          onClick={removeAllProductsFromBasketFromBasket}
        >
          <ListItemIcon>
            <div className="d-flex">
              <div
                data-icon-name="cube-trash"
                data-icon="&#xE90E;"
                className={`${styles.trash_icon} cube-font-icon`}
              ></div>
            </div>
          </ListItemIcon>
          <ListItemText primary="حذف همه" />
        </ListItem>
      </List>
    </Popover>
  );
}
