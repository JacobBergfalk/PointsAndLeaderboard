import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../assets/styles.css";
import "../assets/buttons.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js-komponenter
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StockChart() {
  const [prices, setPrices] = useState<number[]>([100]); // Startvärde 100
  const [timestamps, setTimestamps] = useState<number[]>([0]);

  const [tradePrice, setTradePrice] = useState<number | null>(null); // Pricereferense
  const [tradeType, setTradeType] = useState<"long" | "short" | null>(null); // Typ av trade

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prevPrices) => {
        // Generates and saves a new generated number
        const lastPrice = prevPrices[prevPrices.length - 1];

        let change = 0;

        if (tradeType === "long") {
          change = -(5 + Math.random() * 5); // Garanterat mellan -5 och -10
        } else if (tradeType === "short")
          change = 5 + Math.random() * 5; // Garanterat mellan +5 och +10
        else change = (Math.random() - 0.5) * 5; // Normalt beteende (-2.5 till +2.5)

        const newPrice = parseFloat(
          Math.max(30, lastPrice + change).toFixed(1)
        );

        return [...prevPrices, newPrice].slice(-20); // Keep only 20 elements, only 20 are necessary. Counts from the latest stockprice
      });

      setTimestamps((prevTimestamps) => {
        const newTime = prevTimestamps[prevTimestamps.length - 1] + 1;
        return [...prevTimestamps, newTime].slice(-20); // Keep only 20 elements, only 20 are necessary.
      });
    }, 500); // Uppdate 0.5s

    return () => clearInterval(interval); // clears if page changes
  }, [tradeType]);

  const buffer = 2; // Extra space
  const yMin = Math.floor(Math.min(...prices) - buffer);
  const yMax = Math.ceil(Math.max(...prices) + buffer);

  const handleLong = () => {
    setTradePrice(prices[prices.length - 1]); // Spara nuvarande pris
    setTradeType("long");
  };

  const handleShort = () => {
    setTradePrice(prices[prices.length - 1]);
    setTradeType("short");
  };

  const handleClose = () => {
    if (tradeType) {
      setPrices((prevPrices) => {
        const lastPrice = prevPrices[prevPrices.length - 1];

        let change = 0;
        if (tradeType === "long") {
          change = 10 + Math.random() * 10; // Jumps up a bit after a long
        } else if (tradeType === "short") {
          change = -(10 + Math.random() * 10); // Jumps down a bit after a short
        }

        const newPrice = parseFloat(
          Math.max(50, lastPrice + change).toFixed(1)
        );
        return [...prevPrices, newPrice].slice(-20);
      });

      setTradeType(null); // Stänger positionen
      setTradePrice(null);
    }
  };

  let mainLineColor = "green";
  if (tradePrice !== null) {
    if (prices[prices.length - 1] > tradePrice) {
      mainLineColor = tradeType === "long" ? "green" : "red";
    } else {
      mainLineColor = tradeType === "long" ? "red" : "green";
    }
  }

  return (
    <div className="container">
      <div className="graph-container">
        <h2> Tesla</h2>
        <Line
          data={{
            labels: timestamps.map((t) => `${t}s`),
            datasets: [
              {
                label: "Aktiekurs (SEK)",
                data: prices,
                borderColor: mainLineColor, // Dynamisk färg på linjen
                backgroundColor: "rgba(75,192,192,0.2)",
              },
              tradePrice !== null
                ? {
                    label: tradeType === "long" ? "Long" : "Short",
                    data: new Array(prices.length).fill(tradePrice), // Horisontell linje
                    borderColor: tradeType === "long" ? "blue" : "orange",
                    borderDash: [5, 5],
                  }
                : {
                    label: "no position",
                    data: null, // Horisontell linje
                  },
            ].filter(Boolean), // Filtrera bort null-värden
          }}
          options={{
            responsive: true,
            animation: false,
            scales: {
              x: {
                title: { display: true, text: "Tid (s)" },
              },
              y: {
                min: yMin,
                max: yMax,
                title: { display: true, text: "Kurs (SEK)" },
              },
            },
          }}
        />
      </div>
      <div className="active-bet">
        <div className="button-container">
          <button
            className="long-button"
            onClick={handleLong}
            disabled={tradeType !== null && tradeType === "short"} // disable if active
          >
            Long
          </button>
          <button
            className="short-button"
            onClick={handleShort}
            disabled={tradeType !== null && tradeType === "long"} // disable if active
          >
            Short
          </button>
          <button
            className="closeposition-button"
            onClick={handleClose}
            disabled={tradeType === null} // disable if not active trade
          >
            Close Position
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockChart;
