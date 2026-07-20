"use client";

import Sidebar from "./Sidebar";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileSidebar({
  open,
  setOpen,
}: Props) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-72
          transform
          transition-transform
          duration-300
          lg:hidden
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar mobile />
      </div>
    </>
  );
}