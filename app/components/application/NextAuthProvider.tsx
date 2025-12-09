"use client";

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'; // Importa il tipo Session

// Definisci i tipi per le props, includendo la sessione opzionale
type Props = {
  children: React.ReactNode;
  session?: Session | null;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  // Passiamo la sessione inizialmente recuperata dal server al provider
  return <SessionProvider session={session}>{children}</SessionProvider>;
};