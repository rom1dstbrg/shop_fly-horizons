"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitContact } from "@/lib/actions/contacts";
import { Send, Loader2 } from "lucide-react";

const SUJETS = [
  "Question générale",
  "Vol sur mesure",
  "Commande / livraison",
  "Bug ou problème technique",
  "Autre",
];

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const r = await submitContact(fd);
      if (r.error) {
        toast.error(r.error);
        return;
      }
      toast.success("Message envoyé ! Vous allez être redirigé…", { duration: 2500 });
      setTimeout(() => router.push("/"), 2500);
    });
  }

  const cls = "w-full h-10 px-3 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#fbae17]/20 focus:border-[#fbae17] transition-all placeholder:text-muted-foreground/40";
  const lbl = "block text-sm font-semibold text-foreground mb-2";
  const req = <span className="text-muted-foreground font-normal"> *</span>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={lbl}>Nom complet{req}</label>
          <input name="nom" required placeholder="Jean Dupont" className={cls} />
        </div>
        <div>
          <label className={lbl}>Adresse email{req}</label>
          <input name="email" type="email" required placeholder="jean@exemple.com" className={cls} />
        </div>
      </div>

      <div>
        <label className={lbl}>Sujet{req}</label>
        <select name="sujet" required defaultValue="" className={cls}>
          <option value="" disabled>Choisissez un sujet…</option>
          {SUJETS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className={lbl}>Message{req}</label>
        <textarea
          name="message" required rows={6}
          placeholder="Décrivez votre demande en détail…"
          className="w-full px-3 py-3 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#fbae17]/20 focus:border-[#fbae17] transition-all resize-none placeholder:text-muted-foreground/40"
        />
      </div>

      <button
        type="submit" disabled={isPending}
        className="w-full h-11 flex items-center justify-center gap-2 bg-[#113356] text-white rounded-xl font-bold text-sm hover:bg-[#0b2238] disabled:opacity-40 transition-all shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 cursor-pointer"
      >
        {isPending
          ? <><Loader2 size={15} className="animate-spin" /> Envoi en cours…</>
          : <><Send size={15} /> Envoyer le message</>
        }
      </button>

    </form>
  );
}
