'use client'

interface ModalProps {
  modal: boolean
  setModal: (open: boolean) => boolean | void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modal, setModal, children}) => {
  return (
    <div>
        <div className={`modal ${modal ? 'modal-open':''}`}>
        <div className="modal-box">
          <button onClick={() => setModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal