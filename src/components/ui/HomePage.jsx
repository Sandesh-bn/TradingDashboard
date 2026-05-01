import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { formatCurrency, toNounCase, formatLargeNumber } from "../../utils/formatCurrency";
import { ChartComponent } from "./ChartComponent";
import { DonutChart } from './DonutChart'

export default function HomePage(props) {
    let { assets, overallAssetsData } = props;

    const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
    const labels = ["Bitcoin", "Ethereum", "Dogecoin", "Solana"];
    const values = [assets['bitcoin'].assetValue, assets['ethereum'].assetValue, assets['dogecoin'].assetValue, assets['solana'].assetValue];

    return (
        <div className="flex flex-col w-full h-full ">

            {/* Header */}
            <h1 className="pt-3 pl-5 font-bold text-xl text-zinc-400">
                My Portfolio
            </h1>

            {/* Grid */}
            <div className="flex flex-wrap w-full h-full overflow-auto p-2">
                {Object.entries(assets).map(([key, value]) => (
                    <div key={key} className="w-full sm:w-1/2 lg:w-1/4">
                        <div
                            onClick={() => setSelectedCrypto(key)}
                            className="
                                        hover:shadow-2xl
                                        transform hover:-translate-y-1
                                        transition-all duration-300 ease-linear
                                        shadow-md flex flex-col p-5
                                        border rounded m-5 h-52 justify-between cursor-pointer

                                        bg-white text-zinc-900 border-zinc-200
                                        dark:bg-gradient-to-b dark:from-slate-800 dark:to-zinc-900
                                        dark:text-[#e6e6ea] dark:border-zinc-800
                                        "
                        >

                            {/* Top */}
                            <div className="flex flex-row">
                                <img
                                    className="w-14 h-14 mr-5"
                                    src={assets[key].image}
                                    alt={key}
                                />

                                <div>
                                    <div className="text-xl font-semibold">
                                        {toNounCase(key)}
                                    </div>

                                    <div className="text-sm text-zinc-500 dark:text-zinc-300">
                                        {formatLargeNumber(assets[key].quantity)} {assets[key].symbol}
                                    </div>
                                </div>
                            </div>

                            {/* Value */}
                            <div className="text-3xl font-bold">
                                {formatCurrency(assets[key].assetValue)}
                            </div>

                            {/* Price */}
                            <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
                                <div>{formatCurrency(assets[key].current_price)}</div>

                                <span className="ml-2 font-semibold text-green-600 dark:text-green-400 flex items-center">
                                    <ArrowUp size={15} className="mr-1" />
                                    ({assets[key].price_change_percentage_24h})
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex w-full h-full overflow-auto p-2">
                <div className="flex-1">
                    <ChartComponent  coinId={selectedCrypto} labels={labels} values={values} />
                </div>
                <div>
                    <div className='py-2'>
                        <p className='text-2xl font-bold py-2'>Today: {formatCurrency(overallAssetsData.total)}</p>
                        {
                            overallAssetsData.percentageChangeDaily > 0 ?
                                <p className='text-green-500'>{formatCurrency(overallAssetsData.totalChangeDaily)} ({overallAssetsData.percentageChangeDaily})</p> :
                                <p className='text-green-500'>{formatCurrency(overallAssetsData.totalChangeDaily)} ({overallAssetsData.percentageChangeDaily})</p>}
                    </div>
                    <DonutChart labels={labels} values={values} />

                </div>

            </div>
        </div>
    );
}