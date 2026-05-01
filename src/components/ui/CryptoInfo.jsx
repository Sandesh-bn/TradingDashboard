import { formatCurrency, formatLargeNumber } from "../../utils/formatCurrency";

export function CryptoInfo(props) {
    const { selectedCoinInfo } = props;

    if (!selectedCoinInfo) {
        return (
            <div>
                Coin info unavailable.
            </div>
        )
    }
    const { image, name, current_price, market_cap, ath,
        max_supply, price_change_percentage_24h
    } = selectedCoinInfo;

    const dailyChange = Number(price_change_percentage_24h);
    const hasDailyChange = Number.isFinite(dailyChange);

    return (
        <div className="flex flex-col
            hover:shadow-2xl
                                        transform hover:-translate-y-1
                                        transition-all duration-300 ease-linear
                                        shadow-md flex flex-col p-5
                                        border rounded ml-5 justify-between cursor-pointer

                                        bg-white text-zinc-900 border-zinc-200
                                        dark:bg-gradient-to-b dark:from-slate-800 dark:to-zinc-900
                                        dark:text-[#e6e6ea] dark:border-zinc-800
        ">
            
            <div className="flex flex-1">
                <img className="w-10 h-10 mx-5" src={image} />
                <p className="text-2xl font-bold ">{name}</p>
            </div>
            <div className="flex flex-row">
                <p className="text-4xl py-5 font-bold">{formatCurrency(current_price)}</p>
                <span
                    className={`${dailyChange > 0 ? 'bg-green-500' : 'bg-red-500'
                        } h-8 mx-4 my-7 text-white text-center p-[5px] rounded-md`}
                >
                    {hasDailyChange ? dailyChange.toFixed(2) : "0.00"}% (24h)</span>
            </div>
            <div>
                <div className="flex justify-between"><p className="text-sm py-1 ">Market Cap:</p> <p  className="text-sm py-1 ">{formatCurrency(market_cap)}</p></div>
                <div className="flex justify-between"><p className="text-sm py-1 ">All Time High:</p> <p className="text-sm py-1 "> {formatCurrency(ath)}</p></div>
                <div className="flex justify-between"><p className="text-sm py-1 ">Max Supply:</p> <p  className="text-sm py-1 ">{formatLargeNumber(max_supply)}</p></div> 
            </div>
            {/* {JSON.stringify(selectedCoinInfo)} */}
        </div>
    )
}
