"use client";
export const dynamic = "force-dynamic";
import React from 'react';

export default function TheLab() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'transparent',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 12px',
      position: 'relative',
      zIndex: 2
    }}>
      <h1 style={{ fontSize: 38, fontWeight: 900, letterSpacing: 2, margin: 0, textAlign: 'center', lineHeight: 1.1 }}>
        The Lab <span style={{ fontWeight: 400, fontSize: 20, color: '#FFD600' }}>(Experimentos)</span>
      </h1>
      <p style={{ color: '#bdbdbd', marginTop: 18, fontSize: 20, textAlign: 'center', maxWidth: 600 }}>
        Aquí aparecerán los experimentos, demos y lanzamientos exclusivos de Alex Paul.
      </p>
      {/* Aquí puedes agregar más contenido, cards, grids, etc. */}
    </main>
  );
}
// TODO: Descomentar bloques poco a poco para aislar el error SSR