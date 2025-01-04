'use client'

import { usePageViews } from '../hooks/usePageViews'

export default function PageViewWrapper({ children }) {
  usePageViews()
  return children
}

