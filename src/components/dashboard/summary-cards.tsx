import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinanceStat } from '@shared/types';
import { ArrowUpIcon, ArrowDownIcon, WalletIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
interface SummaryCardsProps {
  stats: FinanceStat;
}
export function SummaryCards({ stats }: SummaryCardsProps) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-200">Total Balance</CardTitle>
          <WalletIcon className="h-4 w-4 text-emerald-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatter.format(stats.balance)}</div>
          <p className="text-xs text-slate-400 mt-1">Available funds</p>
        </CardContent>
      </Card>
      <Card className="border-emerald-100/50 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Income</CardTitle>
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
            <ArrowUpIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            {formatter.format(stats.income)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
        </CardContent>
      </Card>
      <Card className="border-rose-100/50 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Expenses</CardTitle>
          <div className="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-full">
            <ArrowDownIcon className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-700 dark:text-rose-400">
            {formatter.format(stats.expenses)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">+4% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}