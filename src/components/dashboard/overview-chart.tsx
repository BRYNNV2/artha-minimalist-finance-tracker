import React, { useMemo } from 'react';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@shared/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useTheme } from '@/hooks/use-theme';
interface OverviewChartProps {
  transactions: Transaction[];
}
export function OverviewChart({ transactions }: OverviewChartProps) {
  const { isDark } = useTheme();
  const data = useMemo(() => {
    // Generate data for the current month
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    const days = eachDayOfInterval({ start, end });
    let runningBalance = 0;
    // Calculate initial balance before this month (mocked as 0 for this view or derived if we had full history)
    // For visual purposes, we'll just track the flow within the month relative to 0 or accumulative
    return days.map(day => {
      const dayTransactions = transactions.filter(t => isSameDay(new Date(t.date), day));
      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      // We can show daily net flow or accumulative. Let's show Expenses trend for now as it's useful
      return {
        date: format(day, 'MMM d'),
        income,
        expense,
        net: income - expense
      };
    }).filter((_, i) => i % 2 === 0); // Optimize points for smoother view if needed, or keep all
  }, [transactions]);
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Financial Overview (This Month)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#e2e8f0"} />
            <XAxis 
              dataKey="date" 
              stroke={isDark ? "#94a3b8" : "#64748b"} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke={isDark ? "#94a3b8" : "#64748b"} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? "#1e293b" : "#fff", 
                borderColor: isDark ? "#334155" : "#e2e8f0",
                borderRadius: "8px" 
              }}
              itemStyle={{ color: isDark ? "#e2e8f0" : "#1e293b" }}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorIncome)" 
              strokeWidth={2}
              name="Income"
            />
            <Area 
              type="monotone" 
              dataKey="expense" 
              stroke="#f43f5e" 
              fillOpacity={1} 
              fill="url(#colorExpense)" 
              strokeWidth={2} 
              name="Expense"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}