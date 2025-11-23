"use client";

import React, { useState, useEffect } from "react";

const calculateCheckDigit = (digits12: string): string => {
  let sum = 0;
  for (let i = 0; i < digits12.length; i++) {
    const num = Number(digits12[i]);
    sum += i % 2 === 0 ? num : num * 3;
  }
  return String((10 - (sum % 10)) % 10);
};

type Props = {
  onIsbnChange: (isbn13: string) => void;
};

export default function IsbnInput({ onIsbnChange }: Props) {
  const [prefix, setPrefix] = useState(["9", "7", "8"]);
  const [digits, setDigits] = useState<string[]>(Array(9).fill("0"));
  const [isbn13, setIsbn13] = useState("");

  useEffect(() => {
    const first12 = [...prefix, ...digits].join("");
    const checkDigit = calculateCheckDigit(first12);
    const full = first12 + checkDigit;
    setIsbn13(full);
    onIsbnChange(full);
  }, [prefix, digits, onIsbnChange]);

  const DigitOptions = () =>
    [...Array(10)].map((_, n) => (
      <option key={n} value={String(n)}>
        {n}
      </option>
    ));

  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ marginBottom: 10 }}><strong>Input ISBN Code</strong></h2>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {prefix.map((digit, i) => (
          <select
            key={`prefix-${i}`}
            value={digit}
            onChange={(e) => {
              const copy = [...prefix];
              copy[i] = e.target.value;
              setPrefix(copy);
            }}
            style={{
              width: 36,
              height: 36,
              fontSize: 18,
              background: "#ccf",
              textAlign: "center",
            }}
          >
            <DigitOptions />
          </select>
        ))}

        {digits.map((digit, i) => (
          <select
            key={`digit-${i}`}
            value={digit}
            onChange={(e) => {
              const copy = [...digits];
              copy[i] = e.target.value;
              setDigits(copy);
            }}
            style={{
              width: 36,
              height: 36,
              fontSize: 18,
              background: "#eef",
              textAlign: "center",
            }}
          >
            <DigitOptions />
          </select>
        ))}
      </div>

     <p style={{ marginTop: 10 }}>
        <strong>ISBN:</strong> {isbn13}
     </p>
    </div>
  );
}
