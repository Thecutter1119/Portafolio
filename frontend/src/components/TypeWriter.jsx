import { useEffect, useState } from "react"

export default function TypeWriter({ text, speed = 55, delay = 0, className = "", caret = true }) {
  const [out, setOut] = useState("")
  useEffect(() => {
    setOut("")
    let i = 0
    const start = setTimeout(() => {
      const t = setInterval(() => {
        i += 1
        setOut(text.slice(0, i))
        if (i >= text.length) clearInterval(t)
      }, speed)
    }, delay)
    return () => {
      clearTimeout(start)
    }
  }, [text, speed, delay])
  return (
    <span className={`typewriter ${className}`}>
      {out}
      {caret && out.length < text.length ? <span className="caret" /> : null}
    </span>
  )
}
