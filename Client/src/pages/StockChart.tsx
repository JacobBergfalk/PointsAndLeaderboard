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
import axios from "axios";

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
  const [betAmount, setBetAmount] = useState(100); // Standardinsats
  const [currentProfitLoss, setCurrentProfitLoss] = useState(0);

  const buffer = 2; // Extra space
  const yMin = Math.floor(Math.min(...prices) - buffer);
  const yMax = Math.ceil(Math.max(...prices) + buffer);

  /**
   * Updates stockprice every 0.5 seconds and simulates a change in price depending on the current trade
   *  - If a user choose Long, the stockprice trends downwards
   *  - If a user choose short, the stockprice trends upwards
   *  - If a user does not have a current trade, the stockprice does not follow a trend exept "random"
   *
   *  Only the last 20 elements are relevant to keep.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prevPrices) => {
        // Generates and saves a new generated number
        const lastPrice = prevPrices[prevPrices.length - 1];

        let change = 0;

        if (tradeType === "long") {
          change = -(5 + Math.random() * 5); // -5  -  -10
        } else if (tradeType === "short")
          change = 5 + Math.random() * 5; // +5  -  +10
        else change = (Math.random() - 0.5) * 5; // -2.5  -  +2.5

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

  /**
   *  Calculates the current "winnings" or losses based on the current stockprice and updates currentProfitLoss.
   *  The same calculation is used in the backend when the trade is closed.
   *
   */
  useEffect(() => {
    if (tradePrice !== null && tradeType !== null) {
      const latestPrice = prices[prices.length - 1];

      let profitLoss = 0;
      if (tradeType === "long") {
        profitLoss = (latestPrice - tradePrice) * (betAmount / tradePrice);
      } else if (tradeType === "short") {
        profitLoss = (tradePrice - latestPrice) * (betAmount / tradePrice);
      }

      setCurrentProfitLoss(Math.round(profitLoss));
    }
  }, [prices]);

  /**
   * Starts procedings to handle a long trade
   */
  const handleLong = () => {
    setTradePrice(prices[prices.length - 1]); // Spara nuvarande pris
    setTradeType("long");
    handleTrade();
  };
  /**
   * Starts procedings to handle a short trade
   *
   */
  const handleShort = () => {
    setTradePrice(prices[prices.length - 1]);
    setTradeType("short");
    handleTrade();
  };
  /**
   * Sends a request to backend to start a trade.
   */
  const handleTrade = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/game/stock/trade",
        {
          betAmount: 10,
        }
      );

      if (response.data.success) {
        setTradePrice(prices[prices.length - 1]);
        setTradeType(tradeType);
      }
    } catch (error) {
      console.error("Trade error", error);
    }
  };
  /**
   *  Currects the pris in the opposite direction of the current trade
   *  Sends a request to backend to close the current trade.
   *
   */
  const handleClose = async () => {
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

      try {
        const response = await axios.post(
          "http://localhost:8080/game/stock/close",
          {
            tradeType,
            betAmount: betAmount,
            entryPrice: tradePrice,
            exitPrice: prices[prices.length - 1],
          }
        );

        if (response.data.success) {
          // Visually close the position
          setTradeType(null);
          setTradePrice(null);
          setCurrentProfitLoss(0);
        }
      } catch (error) {
        console.error("Close trade error", error);
      }
    }
  };
  // Only to define color of the current bet
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
      {/* Graph / Canvas container */}
      <div className="graph-container">
        <h2> PL AB</h2>
        <Line
          data={{
            labels: timestamps.map((t) => `${t}s`),
            datasets: [
              {
                label: "Aktiekurs (SEK)",
                data: prices,
                borderColor: mainLineColor,
                backgroundColor: "rgba(75,192,192,0.2)",
              },
              tradePrice !== null
                ? {
                    // The most important data for a active line
                    label: tradeType === "long" ? "Long" : "Short",
                    data: new Array(prices.length).fill(tradePrice), // Horisontell linje
                    borderColor: tradeType === "long" ? "blue" : "orange",
                    borderDash: [5, 5],
                  }
                : {
                    // Necessary information to keep create a false line
                    label: "no position",
                    data: null,
                  },
            ],
          }}
          options={{
            responsive: true,
            animation: false,
            scales: {
              x: {
                title: { display: true, text: "Tid (s)" },
              },
              y: {
                min: yMin, // Hight and Width are defined above
                max: yMax,
                title: { display: true, text: "Kurs (SEK)" },
              },
            },
          }}
        />
      </div>
      {/* Region for buttons and bet amount */}
      <div className="active-bet">
        <div className="profit-loss-container">
          <p>
            Aktuell vinst/förlust:
            <span className={currentProfitLoss >= 0 ? "profit" : "loss"}>
              {currentProfitLoss} SEK
            </span>
          </p>
        </div>
        <div className="bet-container">
          <label>Bet Amount:</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
          />
        </div>
        <div className="button-container">
          <button
            className="long-button"
            onClick={handleLong}
            disabled={tradeType !== null} // disable if active
          >
            Long
          </button>
          <button
            className="short-button"
            onClick={handleShort}
            disabled={tradeType !== null} // disable if active
          >
            Short
          </button>
        </div>
        <div className="close-container">
          <button
            className="closeposition-button"
            onClick={handleClose}
            disabled={tradeType === null} // disable if NOT active
          >
            Close Position
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockChart;
