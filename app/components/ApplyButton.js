'use client'

import { useState } from 'react'

export default function ApplyButton({ applyLink }) {
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [newTabOpened, setNewTabOpened] = useState(false) // Track if tab is opened

  const handleApply = () => {
    if (newTabOpened) return; // Prevent opening multiple tabs

    setIsCountingDown(true)
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1 && !newTabOpened) {
          clearInterval(timer)
          setNewTabOpened(true) // Mark tab as opened
          window.open(applyLink, '_blank', 'noopener,noreferrer') // Open in a new tab
        }
        return prevCount - 1
      })
    }, 1000)
  }

  if (isCountingDown) {
    return (
      <button
        className="flex-1 text-center bg-green-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
        disabled
      >
        Redirecting in {countdown}...
      </button>
    )
  }

  return (
    <button
      onClick={handleApply}
      className="flex-1 text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
    >
      Apply Now
    </button>
  )
}
