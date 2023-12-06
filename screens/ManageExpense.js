import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../UI/IconButton";
import Button from "../UI/Button";
import { GlobalStyles } from "../constants/styles";


function ManageExpense({route, navigation}) {
    const expenseId = route.params?.expenseId
    const isEditing = !!expenseId


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    function deleteExpenseHandler(expenseId) {

    }

    function cancelHandler() {

    }

    function confirmHandler() {

    }
    
    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>

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
    buttons: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        padding: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    }
})