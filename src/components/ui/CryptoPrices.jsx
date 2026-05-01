import { useState } from "react";
import { CryptoTable } from "./CryptoTable";
export default function CryptoPrices(props) {

    let { cryptoData } = props;
    const [cryptoInfo, setCryptoInfo] = useState({ name: 'bitcoin', index: 0 })

    return (
        <div className="flex flex-col w-full h-full ">

            {/* Header */}
            <h1 className="pt-3 pl-5 font-bold text-xl text-zinc-400">
                Crypto Prices
            </h1>
            <CryptoTable setCryptoInfo={setCryptoInfo} cryptoData={cryptoData} />

        </div>
    );
}