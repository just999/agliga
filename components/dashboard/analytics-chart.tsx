'use client';

import data from '@/data/analytics';
import ClientOnly from '@/lib/client-only';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../shadcn/ui/card';

type AnalyticsChartProps = {};

const AnalyticsChart = () => {
  return (
    <ClientOnly>
      <Card className='w-full '>
        <CardHeader>
          <CardTitle>Analytics for Year</CardTitle>
          <CardDescription>Views Per Month</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={data}>
                <Line type='monotone' dataKey='uv' stroke='#8884d8' />
                <CartesianGrid stroke='#ccc' />
                <XAxis dataKey='name' />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </ClientOnly>
  );
};

export default AnalyticsChart;
