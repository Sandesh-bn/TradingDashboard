import { ChartComponent } from "./ChartComponent";
import { UserList } from "./UserList";
import { useState} from 'react';
import { CryptoInfo } from './CryptoInfo'

export default function Watchlist(props) {
  let { cryptoData } = props;
  const [cryptoInfo, setCryptoInfo] = useState({ name: 'bitcoin', index: 0})

  return (
    <div className="flex h-screen p-3 box-border">
      <div className="flex flex-1 flex-col">
        <div className="flex-1">
           <ChartComponent coinId={cryptoInfo.name}/>
        </div>
        <div className="flex-1 flex pt-2 flex items-center  justify-center">
          <CryptoInfo selectedCoinInfo={cryptoData[cryptoInfo.index]}/>
        </div>
      </div>
      <div className="flex-1">
        <UserList setCryptoInfo={setCryptoInfo} cryptoData={cryptoData}/>
      </div>
    </div>
  );
}


