export interface PieChartList {
    name: string;
    users: number;
    percentage: number;
}

export interface PieChartProps {
    pieData: {
        options: ApexCharts.ApexOptions;
        series: number[];
    };
    pieChartData: PieChartList[];
}
export interface Transaction {
    id: number | string;
    date: string;
    amount: string;
    status: string;
    description: string;
    statusColor: string;
}
export interface TransactionTableProps {
    transactions: Transaction[];
}
export interface Customer {
    id: number;
    name: string;
    email: string;
    amount: string;
    avatarColor: string;
    avatarInitial: string;
}
export interface CustomerListProps {
    customers: Customer[];
}
export interface Country {
    id: string;
    name: string;
    percentage: number;
    flag: string;
}
export interface CountryStatsProps {
    countriesData: Country[];
}