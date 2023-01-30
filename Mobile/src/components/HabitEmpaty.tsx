import {Text} from "react-native";
import { useNavigation } from '@react-navigation/native';
export function HabitEmpaty(){

    const {navigate} = useNavigation()

    return (
        <Text className="text-zinc-400 text-base ">
            Você ainda não criou nenhum hábito para esse dia da semana. {' '}

            <Text className="text-violet-400 text-base underline active:text-violet-500"
            onPress={()=>{navigate('newHabit')}}> Comece cadastrando um</Text>
        </Text>
    )
}