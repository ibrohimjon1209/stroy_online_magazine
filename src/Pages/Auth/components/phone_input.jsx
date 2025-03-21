"use client"

import { useRef, useEffect } from "react"

export function PhoneInput({ value, onChange }) {
  const inputRef = useRef(null)

  // Get the position in the raw digits based on the cursor position in the formatted string
  const getDigitPosition = (formattedPosition) => {
    // Map of positions in formatted string to positions in raw digits
    const positionMap = {
      1: 0, // (X_)-___-__-__
      2: 1, // (_X)-___-__-__
      5: 2, // (__)-X__-__-__
      6: 3, // (__)-_X_-__-__
      7: 4, // (__)-__X-__-__
      9: 5, // (__)-___-X_-__
      10: 6, // (__)-___-_X-__
      12: 7, // (__)-___-__-X_
      13: 8, // (__)-___-__-_X
    }

    // Find the closest mapping position that's less than or equal to the formatted position
    let digitPosition = 0
    for (let pos = formattedPosition; pos >= 0; pos--) {
      if (positionMap[pos] !== undefined) {
        digitPosition = positionMap[pos]
        break
      }
    }

    return digitPosition
  }

  // Handle input changes including deletions
  const handlePhoneChange = (e) => {
    const input = e.target
    const newValue = input.value
    const oldValue = getDisplayValue()
    const newCursorPosition = input.selectionStart

    // Detect if this was a deletion
    if (newValue.length < oldValue.length) {
      // Get the digit position based on cursor
      const digitPosition = getDigitPosition(newCursorPosition)

      // Remove all digits from that position onwards
      const newDigits = value.substring(0, digitPosition)
      onChange(newDigits)

      // Calculate new cursor position
      setTimeout(() => {
        if (inputRef.current) {
          const newFormattedPos = getFormattedPosition(digitPosition)
          inputRef.current.setSelectionRange(newFormattedPos, newFormattedPos)
        }
      }, 0)
    } else {
      // Handle normal input (only digits)
      const digits = newValue.replace(/[^0-9]/g, "")

      // Limit to 9 digits
      const limitedDigits = digits.slice(0, 9)
      onChange(limitedDigits)
    }
  }

  // Get the position in the formatted string based on the digit position
  const getFormattedPosition = (digitPosition) => {
    const positions = [1, 2, 5, 6, 7, 9, 10, 12, 13]
    return positions[digitPosition] || positions[positions.length - 1]
  }

  // Format the display value with empty spaces for missing digits
  const getDisplayValue = () => {
    const digits = value.split("")
    const template = ["(", "_", "_", ")", "-", "_", "_", "_", "-", "_", "_", "-", "_", "_"]

    // Replace underscores with digits where available
    let digitIndex = 0
    for (let i = 0; i < template.length; i++) {
      if (template[i] === "_" && digitIndex < digits.length) {
        template[i] = digits[digitIndex]
        digitIndex++
      }
    }

    return template.join("")
  }

  // Restore cursor position after render
  useEffect(() => {
    if (inputRef.current) {
      const pos = getFormattedPosition(value.length)
      inputRef.current.setSelectionRange(pos, pos)
    }
  }, [value])

  // Handle key press events for better control
  const handleKeyDown = (e) => {
    const curPos = e.target.selectionStart

    // Handle backspace
    if (e.key === "Backspace" && curPos > 0) {
      e.preventDefault()

      // Find the previous digit position
      let prevDigitPos = 0
      for (let i = curPos - 1; i >= 0; i--) {
        const char = getDisplayValue()[i]
        if (/[0-9]/.test(char)) {
          prevDigitPos = getDigitPosition(i)
          break
        }
      }

      // Remove all digits from that position onwards
      const newDigits = value.substring(0, prevDigitPos)
      onChange(newDigits)
    }

    // Handle delete key
    if (e.key === "Delete") {
      e.preventDefault()

      // Find the current digit position
      const digitPos = getDigitPosition(curPos)

      // Remove all digits from that position onwards
      const newDigits = value.substring(0, digitPos)
      onChange(newDigits)
    }
  }

  return (
    <div className="flex">
      <div className="flex rounded-l-[5px] items-center border border-[#D5D5D5] border-r-0 px-3 bg-white">+998</div>
      <input
        ref={inputRef}
        type="text"
        value={getDisplayValue()}
        onChange={handlePhoneChange}
        onKeyDown={handleKeyDown}
        className="flex-1 border border-[#D5D5D5] rounded-r-[5px] p-3 focus:outline-none"
      />
    </div>
  )
}

