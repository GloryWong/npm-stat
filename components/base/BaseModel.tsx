import type { ButtonProps } from '@nextui-org/react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import type { ReactNode } from 'react'

interface Props {
  modalTitle?: ReactNode
  buttonLabel: string
  children: ReactNode
  buttonSize?: ButtonProps['size']
}

export default function BaseModel({ modalTitle, buttonLabel, children, buttonSize }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} size={buttonSize}>{buttonLabel}</Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modalTitle ?? buttonLabel}</ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
