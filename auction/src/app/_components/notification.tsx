"use client";

import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import React, { useRef, useState } from "react";
import NotificationMessage from "./notification-message";

type Props = {};

const Notification = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <>
      <NotificationIconButton
        ref={notifButtonRef}
        onClick={(e) => setIsVisible(!isVisible)}
      />
      <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        renderItem={({item, ...props}) => (
          <NotificationCell {...props} item={item} key={item.id}>
            <NotificationMessage
              amount={item.data?.amount}
              name={item.data?.name}
              id={item.data?.id}
            />
          </NotificationCell>
        )}
      />
    </>
  );
};

export default Notification;
