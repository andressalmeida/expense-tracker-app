import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/api";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";


function ManageExpense({route, navigation}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const expensesCtx = useContext(ExpensesContext)

    const expenseId = route.params?.expenseId
    const isEditing = !!expenseId

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === expenseId)


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsLoading(true)
        try {
            await deleteExpense(expenseId)
            expensesCtx.deleteExpense(expenseId)
            navigation.goBack()
        } catch (err) {
            setError('Could nota delete expense. Please try again!')
            setIsLoading(false)
        } 
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler(expenseData) {
        setIsLoading(true)
        try {
            if (isEditing) {
                expensesCtx.updateExpense(expenseId, expenseData)
                await updateExpense(expenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData)
                expensesCtx.addExpense({...expenseData, id: id})
            }
            navigation.goBack()
        } catch (err) {
            setError('Coult not save data. Please try again later.'),
            setIsLoading(false);
        } 
    }

    function errorHandler() {
        setError(null)
    }

    if (error !== null && !isLoading) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isLoading) {
        return <LoadingOverlay />
    }
    
    return (
        <View style={styles.container}>
            <ExpenseForm 
            onCancel={cancelHandler} 
            onSubmit={confirmHandler} 
            defaultValue={selectedExpense}
            submitButtonLabel={isEditing ? 'Update' : 'Add'} 
            />

            {isEditing && 
            <View style={styles.deleteContainer}> 
                <IconButton 
            name="trash" 
            color={GlobalStyles.colors.error500} 
            size={36} 
            onPress={deleteExpenseHandler} 
            />
            </View>
            }

        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        padding: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    }
})