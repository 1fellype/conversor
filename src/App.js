import './App.css';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

function ConversorMoedas() {
  const [valorEntrada, setValorEntrada] = useState(0);
  const [moedaOrigem, setMoedaOrigem] = useState('BRL');
  const [moedaDestino, setMoedaDestino] = useState('USD');
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(() => {
    converterMoeda();
  }, [valorEntrada, moedaOrigem, moedaDestino]);

  const converterMoeda = async () => {
    const taxaCambio = await axios.get('https://api.exchangerate-api.com/v4/latest/' + moedaOrigem);
    const taxa = taxaCambio.data.rates[moedaDestino];
    setValorConvertido(valorEntrada * taxa);
  };

  return (
    <div>
      <input type="number" value={valorEntrada} onChange={(e) => setValorEntrada(e.target.value)} />
      <select value={moedaOrigem} onChange={(e) => setMoedaOrigem(e.target.value)}>
        <option value="BRL">Real (BRL)</option>
        <option value="USD">Dólar (USD)</option>
        <option value="EUR">Euro (EUR)</option>
      </select>
      <select value={moedaDestino} onChange={(e) => setMoedaDestino(e.target.value)}>
        <option value="BRL">Real (BRL)</option>
        <option value="USD">Dólar (USD)</option>
        <option value="EUR">Euro (EUR)</option>
      </select>
      <p>Valor convertido: {valorConvertido.toFixed(2)}</p>
      <button onClick={converterMoeda}>Converter</button>
    </div>
  );
}

export default ConversorMoedas;
