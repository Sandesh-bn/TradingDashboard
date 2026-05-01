import { Input } from "@/components/ui/input"
import { useState, useEffect, useMemo, useRef } from 'react';
import { formatCurrency } from "../../utils/formatCurrency";
import { X } from 'lucide-react';

function getSavedWatchlist() {
    try {
        const json = localStorage.getItem("chosenList");
        const savedItems = json ? JSON.parse(json) : [];
        return Array.isArray(savedItems) ? savedItems : [];
    } catch {
        localStorage.removeItem("chosenList");
        return [];
    }
}

export function UserList(props) {
    let { cryptoData = [], setCryptoInfo } = props;
    const wrapperRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState('')
    const [chosenList, setChosenList] = useState(getSavedWatchlist);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setSearchTerm("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const defaultList = useMemo(() => {
        if (!Array.isArray(cryptoData)) {
            return [];
        }

        const chosenIds = new Set(chosenList.map((item) => item.id));
        return cryptoData
            .filter((coin) => coin?.name && coin?.id && coin?.symbol)
            .map((coin, index) => {
                const { name, id, symbol, price_change_percentage_24h, current_price } = coin;
                return {
                    name: name.toLowerCase(),
                    id: id.toLowerCase(),
                    symbol: symbol.toLowerCase(),
                    price_change_percentage_24h,
                    current_price,
                    index
                };
            })
            .filter((item) => !chosenIds.has(item.id));
    }, [cryptoData, chosenList]);

    const searchResults = useMemo(() => {
        let currentSearchTerm = searchTerm.trim().toLowerCase();
        if (!currentSearchTerm || currentSearchTerm.length == 0) {
            return [];
        }

        console.log('searchterm', searchTerm)
        return defaultList.filter((result) => {
            return (result.name.startsWith(currentSearchTerm) ||
                result.id.startsWith(currentSearchTerm) ||
                result.symbol.startsWith(currentSearchTerm)
            )
        })
    }, [searchTerm, defaultList]);

    function handleAddTicker(result) {
        if (chosenList.length == 10) {
            setErrorMessage("Watchlist already has ten tickers.");
            return;
        }

        if (chosenList.some(item => item.id === result.id)) {
            setErrorMessage("This ticker is already in your watchlist.");
            return;
        }

        const newChosenList = [...chosenList, result];
        setChosenList(newChosenList);
        localStorage.setItem("chosenList", JSON.stringify(newChosenList));
        setErrorMessage("");
        setSearchTerm(""); // clear search after add
    }

    function removeFromWatchList(result) {
        const newChosenList = chosenList.filter(item => item.id !== result.id);
        setChosenList(newChosenList);
        localStorage.setItem("chosenList", JSON.stringify(newChosenList));
        setErrorMessage("");
    }

    function handleClickWatchList(result) {
        console.log(result)
        setCryptoInfo({ id: result.id, index: result.index })
    }

    return (
        <div className="flex flex-col p-5">
            <h1 className="text-3xl font-bold mb-5 text-zinc-400">WatchList</h1>
            <div ref={wrapperRef} className="relative">
                <Input className="relative h-10 bg-white text-black dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="email" placeholder="Search for ticker/crypto and click to add to watchlist" />
                {errorMessage && (
                    <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                )}
                {searchTerm.length > 0 && searchResults.length > 0 && <div className="absolute z-50 w-full max-h-60 overflow-y-auto mt-2 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[5px]">
                    {searchResults.map((result) => (
                        <div key={result.id} onClick={() => handleAddTicker(result)} className="p-3 border border-gray-800 "><span className="font-bold mr-5 text-zinc-300 z-1001">{result.name}</span> <span className="text-zinc-300">{result.symbol}</span></div>
                    ))}
                </div>}
                {chosenList && chosenList.length > 0 ?
                    <div className="my-8 flex flex-col border rounded-[5px] bg-white/70 dark:bg-zinc-900/40
                                    backdrop-blur-xl
                                    border border-zinc-200 dark:border-zinc-800">
                        {chosenList.map((result) => (
                            // <div key={result.id} onClick={() => handleClickWatchList(result)} className="flex justify-between py-3 px-4  border-b border-gray-400">
                            //     <div>
                            //         <span className="mr-2 font-bold text-[#e6e6ea] text-base">{result.name}</span>
                            //         <span className="text-sm text-zinc-200">{result.symbol}</span>
                            //     </div>
                            //     <div>
                            //         <span className="mr-2 text-sm text-[#e6e6ea]">{formatCurrency(result.current_price)}</span>

                            //         <span
                            //             className={result.price_change_percentage_24h > 0 ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}
                            //         >
                            //             {result.price_change_percentage_24h}
                            //         </span>
                            //         <button className="ml-2"
                            //             onClick={(e) => {
                            //                 e.stopPropagation();
                            //                 setSearchTerm('')
                            //                 removeFromWatchList(result);
                            //             }
                            //             }
                            //         >
                            //             <X color='red' size={16} />
                            //         </button>
                            //     </div>
                            // </div>
                            <div
                                key={result.id}
                                onClick={() => handleClickWatchList(result)}
                                className="
                                    flex justify-between py-3 px-4
                                    border-b border-zinc-200 dark:border-zinc-800
                                    hover:bg-zinc-100 dark:hover:bg-zinc-800/50
                                "
                            >
                                <div>
                                    <span className="mr-2 font-bold text-zinc-900 dark:text-zinc-100 text-base">
                                        {result.name}
                                    </span>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                        {result.symbol}
                                    </span>
                                </div>

                                <div>
                                    <span className="mr-2 text-sm text-zinc-900 dark:text-zinc-100">
                                        {formatCurrency(result.current_price)}
                                    </span>

                                    <span
                                        className={
                                            result.price_change_percentage_24h > 0
                                                ? "text-green-500 text-sm"
                                                : "text-red-500 text-sm"
                                        }
                                    >
                                        {result.price_change_percentage_24h}
                                    </span>

                                    <button
                                        className="ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSearchTerm("");
                                            removeFromWatchList(result);
                                        }}
                                    >
                                        <X className="text-red-500" size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="my-8 flex flex-1 text-zinc-300 justify-center py-50 border border-zinc-800 rounded-[5px]">
                        Watchlist is empty.
                    </div>

                }
            </div>
        </div>
    )
}
