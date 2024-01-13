import React from "react";

export default function EmptySession() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h1 className="p-5 text-5xl">Bienvenue</h1>
      <p className="justify-center">
        Veuillez vous connecter à votre compte Spotify pour utiliser
        l&apos;application.
      </p>
      <small className="justify-center">
        Seuls les comptes Spotify premium peuvent utiliser cette application
      </small>
    </div>
  );
}
