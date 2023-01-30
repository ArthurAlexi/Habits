import { ScrollView, View,Text,TextInput,TouchableOpacity,Alert } from "react-native";
import { BackBtn } from "../components/BackBtn";
import { CheckBox } from "../components/CheckBox";
import colors from 'tailwindcss/colors';
import {useState} from 'react'
import {Feather } from '@expo/vector-icons'
import { api } from "../lib/axios";

const avaliableWeekDays = ['Domingo','Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 
'Quinta-Feira', 'Sexta-Feira', 'Sábado']

export function NewHabit(){

    const [weekDays, setWeekDays] = useState<number[]>([])
    const [title,setTitle] = useState('')
    
    function handleToggleWeekDay(weekDayIndex:number){
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        }else {
            setWeekDays(prevState => [...prevState,weekDayIndex])
        }
    } 

   async function createNewHabits() {
    if(!title.trim()){
       return ( Alert.alert('Novo Hábito','Infome o título do novo hábito'))
    }else if(weekDays.length ===0){
        return (Alert.alert('Novo Hábito','Infome os dias'))
    }else{
        await api.post('habits',{
            title,
            weekDays,
        })

        setTitle('')
        setWeekDays([])
        Alert.alert('Novo Hábito','Novo hábito cadastrado com sucesso')
    }

   }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:100}}>
            <BackBtn/>
            <Text className="text-white mt-6 font-extrabold text-3xl">Criando Hábito</Text>

            <Text className="text-white mt-6 font-semibold text-base">Qual é o seu compremetimento?</Text>

            <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-700 text-white 
            border-2 border-zinc-800 focus:border-violet-700  " cursorColor={colors.white} 
            placeholder="Exercício, Ler livro ..."
            onChangeText={setTitle}
            value={title}
            placeholderTextColor={colors.zinc[400]}/>
            
            <Text className="text-white mt-6 font-semibold text-base">Qual a recorrência?</Text>

            {avaliableWeekDays.map((day,index) => 
                <CheckBox key={day} 
                title={day} 
                checked={weekDays.includes(index)}
                onPress={()=>handleToggleWeekDay(index)}/>
            )}

            
                <TouchableOpacity activeOpacity={0.7}
                onPress={createNewHabits}
                className="w-full h-14  flex-row items-center justify-center bg-green-600 rounded-md mt-2">
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}/>
                    <Text className="text-white ml-3 font-semibold text-base"> Confirmar </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}