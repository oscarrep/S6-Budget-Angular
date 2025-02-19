export interface BudgetRequest {
    name: string;
    phone: number;
    email: string;
    services: string[];
    pages: number;
    languages: number;
    totalPrice: number;
}