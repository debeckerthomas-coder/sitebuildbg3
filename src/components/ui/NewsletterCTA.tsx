"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui-system";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="w-full max-w-2xl mx-auto my-12">
      <div className="relative overflow-hidden bg-abyss border border-gold/30 rounded-xl p-8">
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <h3 className="font-display text-2xl text-gold mb-2">
            🛡️ Survivez aux prochains Patchs
          </h3>
          <p className="text-gray-400 mb-6 font-body leading-relaxed">
            La meta du Mode Honneur change. Laissez votre email pour recevoir
            les mises à jour critiques des builds.
          </p>

          {submitted ? (
            <p className="text-gold font-semibold">
              ✓ Merci ! Vous serez notifié des prochaines mises à jour.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-surface border border-gray-700 text-gray-200 placeholder-gray-500
                  focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors"
              />
              <Button type="submit" size="lg" className="whitespace-nowrap">
                S&apos;inscrire
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
