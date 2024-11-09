
type Props = {
    total: number;
    city: any;
}
const SearchResultInfo = ({ total, city }: Props) => {
    return (
        <div> City: {city} total hostels: {total}</div>
    )
}

export default SearchResultInfo