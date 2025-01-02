'use client'

import { useEffect } from 'react'

export default function AdSense(props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      data-ad-slot={props.adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

