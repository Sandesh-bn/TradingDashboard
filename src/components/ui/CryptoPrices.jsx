import { useState } from 'react';
import { CryptoTable } from "./CryptoTable";
import { CryptoInfo } from './CryptoInfo';
import { Bitcoin } from 'lucide-react';
import { ChartComponent } from './ChartComponent';

export default function CryptoPrices(props) {
    let { cryptoData } = props;
    const [cryptoInfo, setCryptoInfo] = useState({ name: 'bitcoin', index: 0 })
    return (
        // <div className="h-screen flex flex-col">
        <div className="h-screen flex flex-col min-h-0 overflow-hidden">
            <h1 className='font-bold pt-3 px-10 text-2xl flex'>Top 100 Cryptocurrencies</h1>
            <div className="flex flex-1">
                <div className="flex-1 ">
                    {/* <LineChart coinId={cryptoInfo.name} /> */}
                    <ChartComponent coinId={cryptoInfo.name} />

                </div>
                <div className="flex-1 ">
                    <CryptoInfo selectedCoinInfo={cryptoData[cryptoInfo.index]} />
                </div>
            </div>

            {/* <div className="flex flex-1 overflow-y-auto">
                <div className="w-full overflow-x-auto">

                <CryptoTable setCryptoInfo={setCryptoInfo} cryptoData={cryptoData} />
                </div>
            </div> */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
                <div className="w-full overflow-x-auto overflow-y-auto">
                    <CryptoTable setCryptoInfo={setCryptoInfo} cryptoData={cryptoData} />
                </div>
            </div>
        </div>
    )
}
