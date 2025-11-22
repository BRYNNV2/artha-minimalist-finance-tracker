import React from 'react';
import { Transaction } from '@shared/types';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ShoppingBag, 
  Coffee, 
  Home, 
  Car, 
  Zap, 
  Film, 
  Briefcase, 
  TrendingUp, 
  CircleDollarSign,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface TransactionListProps {
  transactions: Transaction[];
}
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Food & Drink': return <Coffee className="h-4 w-4" />;
    case 'Shopping': return <ShoppingBag className="h-4 w-4" />;
    case 'Housing': return <Home className="h-4 w-4" />;
    case 'Transportation': return <Car className="h-4 w-4" />;
    case 'Utilities': return <Zap className="h-4 w-4" />;
    case 'Entertainment': return <Film className="h-4 w-4" />;
    case 'Salary': return <Briefcase className="h-4 w-4" />;
    case 'Investments': return <TrendingUp className="h-4 w-4" />;
    default: return <CircleDollarSign className="h-4 w-4" />;
  }
};
export function TransactionList({ transactions }: TransactionListProps) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Note</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No transactions found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx.id} className="group hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full",
                      tx.type === 'income' ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    )}>
                      {getCategoryIcon(tx.category)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{tx.category}</div>
                    <div className="text-xs text-muted-foreground md:hidden">
                      {format(new Date(tx.date), 'MMM d, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {format(new Date(tx.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-[150px]">
                    {tx.description || '-'}
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    tx.type === 'income' ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
                  )}>
                    {tx.type === 'income' ? '+' : '-'}{formatter.format(tx.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}