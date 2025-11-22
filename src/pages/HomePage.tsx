import React, { useEffect, useState, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { TransactionList } from '@/components/dashboard/transaction-list';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { TransactionForm } from '@/components/dashboard/transaction-form';
import { ThemeToggle } from '@/components/ThemeToggle';
import { api } from '@/lib/api-client';
import { FinanceAccount, Transaction } from '@shared/types';
import { toast, Toaster } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
// Demo User ID - In a real app this would come from auth
const DEMO_USER_ID = 'demo-user-1';
export function HomePage() {
  const [account, setAccount] = useState<FinanceAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchAccount = useCallback(async () => {
    try {
      // In a real scenario, this fetches the single FinanceAccountEntity state
      const data = await api<FinanceAccount>(`/api/finance/account/${DEMO_USER_ID}`);
      setAccount(data);
    } catch (error) {
      console.error('Failed to fetch account:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);
  const handleAddTransaction = async (data: any) => {
    try {
      const newTx = await api<Transaction>(`/api/finance/transactions/${DEMO_USER_ID}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      toast.success('Transaction added successfully');
      // Optimistic update or refetch
      // Refetch is safer for ensuring stats consistency calculated by backend
      await fetchAccount();
    } catch (error) {
      console.error('Failed to add transaction:', error);
      toast.error('Failed to save transaction');
    }
  };
  if (loading) {
    return (
      <AppLayout container>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-7">
            <Skeleton className="h-[400px] md:col-span-4 rounded-xl" />
            <Skeleton className="h-[400px] md:col-span-3 rounded-xl" />
          </div>
        </div>
      </AppLayout>
    );
  }
  const transactions = account?.transactions ?? [];
  const stats = account?.stats ?? { balance: 0, income: 0, expenses: 0 };
  return (
    <AppLayout container>
      <div className="min-h-screen pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, here's your financial overview.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <TransactionForm onSubmit={handleAddTransaction} />
            <ThemeToggle className="static" />
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Summary Cards */}
          <section>
            <SummaryCards stats={stats} />
          </section>
          {/* Main Content Grid */}
          <div className="grid gap-6 md:grid-cols-7 lg:h-[500px]">
            {/* Chart Area */}
            <div className="md:col-span-4 h-full min-h-[400px]">
              <OverviewChart transactions={transactions} />
            </div>
            {/* Recent Transactions List */}
            <div className="md:col-span-3 h-full min-h-[400px]">
              <TransactionList transactions={transactions.slice(0, 10)} />
            </div>
          </div>
        </motion.div>
      </div>
      <Toaster richColors position="bottom-right" />
    </AppLayout>
  );
}