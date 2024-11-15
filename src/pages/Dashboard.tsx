// In a parent component (e.g., Dashboard)
import { useState } from 'react';
import ViewGraph from '../components/ViewGraph';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
    const [timeframe, setTimeframe] = useState<String>('week');


    const location = useLocation();
    const hostelId = location.state?.hostelId;


    return (
        <div className=''>
            <div className='flex justify-between items-center my-8'>
                <h1 className='text-2xl text-orange-500'>Dashboard</h1>
                <div className='flex space-x-3'>
                    <Button onClick={() => setTimeframe('week')}>Weekly</Button>
                    <Button onClick={() => setTimeframe('month')}>Monthly</Button>
                    <Button onClick={() => setTimeframe('year')}>Yearly</Button>
                </div>
            </div>
            <ViewGraph timeframe={timeframe} hostelId={hostelId} />
        </div>
    );
};

export default Dashboard;
