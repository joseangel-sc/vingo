import React from 'react';
import BingoCard from '../BingoCard';
import { colors } from '~/styles/colors';

export default function Index() {
  return (
    <div style={{ padding: '20px', display: "flex", flexFlow: "column", alignItems: "center", gap: "10px" }}>
      <h1 style={{ fontFamily: "monospace", color: colors.tertiary }}>Bingo 2024!</h1>
      <BingoCard />
    </div>
  );
}
