import { useEffect, useRef } from "react";

const BaseModal = ({ id, title, children, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const modal = modalRef.current;

    if (!modal) return;

    const handleClose = () => {
      if (onClose) onClose();
    };

    modal.addEventListener("close", handleClose);
    modal.addEventListener("cancel", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
      modal.removeEventListener("cancel", handleClose);
    };
  }, [onClose]);

  return (
    <dialog id={id} ref={modalRef} className="modal">
      <div className="flex flex-col items-center modal-box border border-primary">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default BaseModal;
