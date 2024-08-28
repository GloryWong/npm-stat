import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Input } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  defaultInput?: string
  onConfirmInput: (input: string) => void
}

export default function SelectionPanelSearch({ defaultInput = '', onConfirmInput }: Props) {
  const [input, setInput] = useState(defaultInput)
  useEffect(() => {
    setInput(defaultInput)
  }, [defaultInput])

  const confirmInput = useCallback(() => {
    onConfirmInput(input)
  }, [onConfirmInput, input])

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Author name"
        isClearable
        value={input}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            confirmInput()
          }
        }}
        onValueChange={setInput}
      />
      <Button type="button" isIconOnly onClick={confirmInput}>
        <Icon icon="material-symbols:search" />
      </Button>
    </div>
  )
}
