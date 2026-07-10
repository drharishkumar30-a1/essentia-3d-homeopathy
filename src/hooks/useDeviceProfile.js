import { useState, useEffect } from 'react'

function readProfile() {
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.matchMedia('(max-width: 820px)').matches
  const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4
  const isMobile = coarse || narrow
  return {
    isMobile,
    // 'high' gets real glass transmission; 'low' gets the cheap fake-glass material
    quality: isMobile || lowCores ? 'low' : 'high',
    dprMax: isMobile ? 1.5 : 2,
  }
}

export function useDeviceProfile() {
  const [profile, setProfile] = useState(readProfile)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const update = () => setProfile(readProfile())
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return profile
}
