
import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/api";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState(null)

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function fetchExpenses() {
            setIsFetching(true)
            try {
                const expenses = await getExpenses()
                expensesCtx.setExpenses(expenses)
            } catch (err) {
                setError('Could not fetch expenses!')
            }
            setIsFetching(false)
        }

        fetchExpenses()
    }, [])

    if(error !== null && !isFetching) {
        return <ErrorOverlay message={error} /> 
    }

    if (isFetching) {
        return <LoadingOverlay  />
    }

    const recentExpenses = expensesCtx.expenses.filter((expenses) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7)

        return expenses.date > date7DaysAgo;
    })

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 Days' fallbackText="No expenses registered for the last 7 days"/>
}

export default RecentExpenses;