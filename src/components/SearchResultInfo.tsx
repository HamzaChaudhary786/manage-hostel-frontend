
type Props = {
    total: number;
    city: any;
}
const SearchResultInfo = ({ total, city }: Props) => {
    return (
        <div>{city} {total}</div>
    )
}

export default SearchResultInfo