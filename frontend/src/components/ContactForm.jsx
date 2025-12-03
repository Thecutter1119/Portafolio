import { useState } from "react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("idle")

  const submit = async (e) => {
    e.preventDefault()
    if (!name || !email || !message) return setStatus("error")
    setStatus("loading")
    try {
      const res = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      })
      const data = await res.json()
      if (data && data.ok) {
        setStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <form className="form" onSubmit={submit} aria-label="Enviar solicitud de contacto">
      <div className="form-row">
        <input className="input" type="text" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
      </div>
      <textarea className="textarea" placeholder="Mensaje" value={message} onChange={(e)=>setMessage(e.target.value)} rows={4} required />
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={status === "loading"}>{status === "loading" ? "Enviando..." : "Enviar"}</button>
        {status === "success" && <span className="form-ok">Mensaje enviado</span>}
        {status === "error" && <span className="form-error">Revisa los datos</span>}
      </div>
    </form>
  )
}
