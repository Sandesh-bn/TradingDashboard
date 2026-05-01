
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatLargeNumber } from "../../utils/formatCurrency";

export function CryptoTable(props) {
    let { cryptoData, setCryptoInfo } = props;
    console.log("COININFO");
    console.log(cryptoData)

    /*
        ath
        ath_date
        current_price
        max_supply
        name
        total_supply
        market_cap
        market_cap_rank
        image
        circulating_supply
    */

    function handleRowClick(name, index) {
        setCryptoInfo({ name, index })
    }


    return (
        <Table className="w-full table-fixed">
            <TableHeader>
                <TableRow className="border-b border-zinc-700" >
                    <TableHead className="text-base">Name</TableHead>
                    <TableHead className="text-base">Price</TableHead>
                    <TableHead className="text-base">%</TableHead>
                    <TableHead className="text-base">24 hour high</TableHead>
                    <TableHead className="text-base">24 hour low</TableHead>
                    <TableHead className="text-base">24 hour volume</TableHead>
                    <TableHead className="text-base">Market cap</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cryptoData && Array.isArray(cryptoData) && cryptoData.map((data, index) => (
                    <TableRow className="cursor-pointer border-b border-zinc-700" onClick={() => handleRowClick(data.id, index)} key={data.id}>
                        <TableCell className="text-base">
                            <div className="flex items-center gap-2 min-w-0">
                                <img className="w-5 h-5 shrink-0" src={data.image} />
                                <span className="truncate">
                                    {data.name} ({data.symbol})
                                </span>
                            </div>
                        </TableCell>
                        <TableCell className="text-base">{formatCurrency(data.current_price)}</TableCell>
                        <TableCell className={data.price_change_percentage_24h > 0 ? "text-green-400 font-medium" : "text-red-600  text-base"}>{data.price_change_percentage_24h}</TableCell>
                        <TableCell className="text-base">{formatCurrency(data.high_24h)}</TableCell>
                        <TableCell className="text-base" >{formatCurrency(data.low_24h)}</TableCell>
                        <TableCell className="text-base">{data.price_change_percentage_24h}</TableCell>
                        <TableCell className="text-base">{formatLargeNumber(data.market_cap)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>24 hour data</TableCell>
                    <TableCell className="text-right">Top 100 most traded coins</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}