"use client";
export const dynamic = "force-dynamic";
import React from 'react';

export default function TheLab() {
  return <div style={{ color: 'red', fontSize: 40, zIndex: 9999, position: 'relative' }}>TEST</div>;
}
// TODO: Descomentar bloques poco a poco para aislar el error SSR