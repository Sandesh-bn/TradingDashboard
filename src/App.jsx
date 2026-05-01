import { useEffect, useState } from "react";
import { Home, Bitcoin, Star, Settings, Moon, Sun } from "lucide-react";
import HomePage from "./components/ui/HomePage";
import CryptoPrices from "./components/ui/CryptoPrices";
import WatchList from "./components/ui/WatchList";
import SettingsPage from "./components/ui/Settings";
import { defaultAssets } from './utils/defaultAssets';


export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const k = import.meta.env.VITE_API_KEY;
  console.log("K ", k);

  const [cryptoData, setCryptoData] = useState([]);
  const [assets, setAssets] = useState(defaultAssets);

  const [overallAssetsData, setOverallAssetsdata] = useState({
    total: '',
    percentageChangeDaily: '',
    totalChangeDaily: ''
  })

  function calculatePortfolioSummary(assets) {
    let overallTotal = 0;
    let overallChange = 0;

    for (const key in assets) {
      const asset = assets[key];
      const qty = Number(asset.quantity) || 0;
      const price = Number(asset.current_price) || 0;
      const pctChange = Number(asset.price_change_percentage_24h) || 0;

      const value = qty * price;
      overallTotal += value;

      // absolute change in dollars
      overallChange += value * (pctChange / 100);
    }

    const overallChangePct =
      overallTotal !== 0 ? (overallChange / (overallTotal - overallChange)) * 100 : 0;


    setOverallAssetsdata({
      total: overallTotal.toFixed(2),
      percentageChangeDaily: overallChangePct.toFixed(2),
      totalChangeDaily: overallChange.toFixed(2),
    })
  }

  async function updateDefaultAssets() {
    try {
      const ids = Object.keys(defaultAssets).join(",");
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`;
      const res = await fetch(url);
      const data = await res.json();

      const updatedAssets = { ...defaultAssets };

      data.forEach((coin) => {
        if (updatedAssets[coin.id]) {
          updatedAssets[coin.id] = {
            ...updatedAssets[coin.id],
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price,
            price_change_24h: coin.price_change_24h,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            assetValue: (coin.current_price * updatedAssets[coin.id].quantity).toFixed(2),
          };
        }
      });

      setAssets(updatedAssets);
      calculatePortfolioSummary(updatedAssets);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  async function getCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': k } };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCryptoData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCryptoData();
    updateDefaultAssets();
  }, []);



  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const renderPage = () => {
    switch (activePage) {
      case "crypto":
        return <CryptoPrices cryptoData={cryptoData} />;

      case "watchlist":
        return <WatchList cryptoData={cryptoData} />;

      case "settings":
        return <SettingsPage />;

      default:
        return <HomePage overallAssetsData={overallAssetsData} assets={assets} />;
    }
  };

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={18} />,
    },
    {
      id: "crypto",
      label: "Crypto Prices",
      icon: <Bitcoin size={18} />,
    },
    {
      id: "watchlist",
      label: "WatchList",
      icon: <Star size={18} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div>
     
      <div className="flex h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
        {/* Right Sidebar */}
        <aside className="w-60  border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 p-6 flex flex-col justify-between">

          <div>
            <h2 className="text-2xl font-bold mb-8">
              Crypto App
            </h2>

            <nav className="space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition ${activePage === item.id
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </aside>
        {/* Content Area */}
        {/* <main className="flex-1 overflow-auto"> */}
        <main className="flex-1 min-h-0 overflow-hidden">
          <div className="p-2">
            {renderPage()}
          </div>
        </main>


      </div>
    </div>
  );
}