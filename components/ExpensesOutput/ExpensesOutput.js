import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
            id: 'e1',
            description: 'A bag',
            amount: 60.65,
            date: new Date('2023-12-4')
    },
    {
        id: 'e2',
        description: 'A Book',
        amount: 30.65,
        date: new Date('2023-11-12')
    },
    {
        id: 'e3',
        description: 'Bananas',
        amount: 6.65,
        date: new Date('2023-10-14')
    },
    {
        id: 'e4',
        description: 'A bag',
        amount: 60.65,
        date: new Date('2023-12-1')
    },
    {
        id: 'e5',
        description: 'A bag',
        amount: 60.65,
        date: new Date('2023-12-1')
    },
    {
        id: 'e6',
        description: 'A bag',
        amount: 60.65,
        date: new Date('2023-12-1')
    },
    {
        id: 'e7',
        description: 'A bag',
        amount: 60.65,
        date: new Date('2023-12-1')
    },
    {
        id: 'e8',
        description: 'A bag',
        amount: 68.65,
        date: new Date('2023-12-1')
    },
]

function ExpensesOutput({expenses, expensesPeriod}) {
    return (
        <View style={styles.container}>
           <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 12,
        backgroundColor: GlobalStyles.colors.primary700,
    }
})