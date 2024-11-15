import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetViewTrackUser } from '@/api/viewTrackUser';

type Props = {
    timeframe: any;
    hostelId: string;
};

const ViewGraph = ({ timeframe, hostelId }: Props) => {
    const { isLoading, getTrackViewUser } = useGetViewTrackUser({ timeframe, hostelId });

    // Show a loading message while data is being fetched
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Show a message if there’s no data available after loading
    if (!getTrackViewUser || getTrackViewUser.length === 0) {
        return <div>No data available for the selected timeframe and hostel.</div>;
    }

    console.log("Track Data:", getTrackViewUser);

    // Map trackData to the format required by Recharts
    const data = getTrackViewUser.map((item: any) => ({
        name: item._id, // Assuming _id is the date or label
        views: item.count, // Assuming count is the number of views
    }));

    return (
        <div>
            <h2 className="text-xl my-4">View Statistics - {timeframe}</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ViewGraph;
