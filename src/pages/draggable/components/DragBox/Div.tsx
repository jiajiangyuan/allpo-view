import { FC, memo, useEffect } from "react";

export const DragPreviewDiv: FC<{ connect: any }> = memo(
  function DragPreviewDiv({ connect }) {
    console.log(connect);
    useEffect(() => {
      if (typeof Image === "undefined") return;
      let connected = false;

      // console.log(connected);
      connect(<div>11111111111111</div>);
      return () => {
        if (connected) {
          connect(null);
        }
      };
    });

    return null;
  }
);
