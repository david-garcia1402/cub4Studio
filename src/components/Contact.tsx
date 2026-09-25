import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { serviceOptions, site } from "../data/site";
import { trackLead, whatsappHref } from "../lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const endpoint = `https://formsubmit.co/ajax/${site.email}`;

function orcamentoEnviado() {
  return new URLSearchParams(window.location.search).get("orcamento") === "enviado";
}

export function Contact() {
  const [service, setService] = useState<string>(serviceOptions[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [note, setNote] = useState<ReactNode>(() =>
    orcamentoEnviado() ? "Orçamento enviado! Vamos responder em breve no e-mail informado." : "",
  );
  const [tone, setTone] = useState<"" | "success" | "error">(() => (orcamentoEnviado() ? "success" : ""));
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!orcamentoEnviado()) return;
    window.history.replaceState({}, "", `${window.location.pathname}#contato`);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_honey") || "")) return;

    const nome = String(data.get("Nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const servico = String(data.get("Serviço") || "").trim();
    const projeto = String(data.get("Projeto") || "").trim();

    if (!nome || !email || !projeto) {
      setTone("error");
      setNote("Preencha nome, e-mail e a descrição do projeto para solicitar o orçamento.");
      return;
    }

    setBusy(true);
    setNote("");
    setTone("");

    const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(`Orçamento cub4Studio — ${servico || "Contato"}`)}&body=${encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\nServiço: ${servico}\n\n${projeto}`)}`;
    const zap = whatsappHref({ kind: "servico", service: servico, name: nome, email, project: projeto });
    const showError = () => {
      setTone("error");
      setNote(
        <>
          Não foi possível enviar agora. <a href={zap} target="_blank" rel="noopener">Falar no WhatsApp</a> ou{" "}
          <a href={mailtoHref}>abrir e-mail</a>.
        </>,
      );
    };

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 12000);
      const body = new FormData();
      const payload: Record<string, string> = {
        Nome: nome,
        email,
        Serviço: servico,
        Projeto: projeto,
        Origem: window.location.href,
        _subject: `Novo orçamento cub4Studio — ${servico || "Contato"}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
        _autoresponse: `Olá, ${nome}! Recebemos seu pedido de orçamento no cub4Studio e retornamos em breve.`,
      };
      Object.entries(payload).forEach(([key, value]) => body.append(key, value));

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
        signal: controller.signal,
      });
      window.clearTimeout(timeoutId);
      const result = (await response.json().catch(() => null)) as { success?: boolean | string; message?: string } | null;
      const success = Boolean(result && (result.success === true || result.success === "true"));
      const message = result && typeof result.message === "string" ? result.message : "";
      const needsActivation = /activat|confirm (your )?e-?mail|check your e-?mail|ativar/i.test(message);

      if (success) {
        form.reset();
        setName("");
        setEmail("");
        setProject("");
        setService(serviceOptions[0]);
        trackLead("form", servico);
        setTone("success");
        setNote(
          <>
            Obrigado, {nome}! Seu orçamento chegou no estúdio. Quer agilizar?{" "}
            <a href={zap} target="_blank" rel="noopener">Continuar no WhatsApp</a>.
          </>,
        );
        return;
      }

      if (needsActivation) {
        trackLead("form", servico);
        setTone("success");
        setNote(
          <>
            Pedido registrado. Confirme o e-mail de ativação enviado para {site.email} (só uma vez). Enquanto isso,{" "}
            <a href={zap} target="_blank" rel="noopener">fale no WhatsApp</a>.
          </>,
        );
        return;
      }

      showError();
    } catch {
      showError();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section" id="contato">
      <div className="container contact-grid">
        <Reveal className="contact-copy">
          <p className="section-tag">Contato</p>
          <h2 className="section-title">Vamos criar juntos?</h2>
          <p className="section-desc">Pelo formulário ou direto no WhatsApp — o zap é o caminho mais rápido para o orçamento.</p>
          <div className="contact-info">
            <a className="contact-info-item" href={whatsappHref({ kind: "servico", service, name, email, project })} target="_blank" rel="noopener">
              <WhatsAppIcon size={20} />
              {site.whatsappDisplay}
            </a>
            <a href={site.instagram} target="_blank" rel="noopener" className="contact-info-item">
              <InstagramIcon />
              {site.instagramHandle}
            </a>
            <a href={`mailto:${site.email}`} className="contact-info-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2 5h20v14H2V5Zm2 2.2V17h16V7.2l-8 5.6-8-5.6Zm.6-.2 7.4 5.2L19.4 7H4.6Z" fill="currentColor" />
              </svg>
              {site.email}
            </a>
          </div>
        </Reveal>

        <Reveal>
          <form className="contact-form" onSubmit={onSubmit}>
            <input type="text" name="_honey" className="form-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-row">
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="Nome" placeholder="Seu nome" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" placeholder="voce@email.com" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="servico">Serviço de interesse</label>
              <select id="servico" name="Serviço" value={service} onChange={(event) => setService(event.target.value)}>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="mensagem">Conte sobre seu projeto</label>
              <textarea id="mensagem" name="Projeto" rows={4} placeholder="Descreva sua ideia, marca e objetivo..." required value={project} onChange={(event) => setProject(event.target.value)} />
            </div>
            <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
              {busy ? "Enviando orçamento..." : "Solicitar orçamento"}
            </button>
            <a className="btn btn--ghost btn--block" href={whatsappHref({ kind: "servico", service, name, email, project })} target="_blank" rel="noopener" onClick={() => trackLead("whatsapp", service)}>
              <WhatsAppIcon />
              Prefiro falar no WhatsApp
            </a>
            <p className={`form-note${tone ? ` form-note--${tone}` : ""}`} role="status" aria-live="polite">
              {note}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
