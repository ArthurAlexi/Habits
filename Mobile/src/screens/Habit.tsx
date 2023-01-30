import { View ,ScrollView,Text, Alert} from "react-native";
import {useRoute} from '@react-navigation/native'
import dayjs from "dayjs";
import { BackBtn } from "../components/BackBtn";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { api } from "../lib/axios";
import { useState,useEffect } from "react";
import { Loading } from "../components/loading";
import { HabitsInfo } from "../models/HabitsInfo";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitEmpaty } from "../components/HabitEmpaty";
import clsx from "clsx";


interface Params {
    date : string
}

export function Habit(){
    const route = useRoute()
    const {date} = route.params as Params

    const [loading, setLoading] = useState(true)
    const [habitsInfo,setHabitsInfo] = useState<HabitsInfo>()
    const [completedHabits,setCompletedHabits] = useState<string[]>([])

    const parseDate = dayjs(date)
    const dayOfWeek = parseDate.format('dddd')
    const AndMonth = parseDate.format('DD/MM')
    const habitsProgress = habitsInfo?.possibleHabits.length ? generateProgressPercentage(habitsInfo?.possibleHabits.length,completedHabits.length) : 0
    const isDateInPass = dayjs(date).endOf('day').isBefore(new Date())
    

    async function fetchHabits() {
        

        try {
            setLoading(true)
            const response = await api.get('day',{
                params: {date:date}
            })

            setHabitsInfo(response.data)
            setCompletedHabits(response.data.completedHabits)

        } catch (error) {
            Alert.alert('Ops','Não foi possível carregar os hábitos desse dia.')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    async function handleToggleHabit(habitId:string){
        await api.patch(`habits/${habitId}/toggle`)

        if(completedHabits.includes(habitId)){
            setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
        }else{
            setCompletedHabits(prevState => [...prevState,habitId])
        }
    }

    useEffect(()=>{fetchHabits()},[])

    if (loading) {
        return <Loading />
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:100}}>
                <BackBtn/>
                <Text className="mt-6 text-zinc-400 text-base font-semibold lowercase">{dayOfWeek}</Text>
                <Text className="mt-2 text-white font-extrabold text-3xl">{AndMonth}</Text>


                <ProgressBar progress={habitsProgress}/>

                <View className={clsx('mt-6',{
                    'opacity-40' : isDateInPass
                })}>
                    {  habitsInfo?.possibleHabits ? 
                        habitsInfo?.possibleHabits.map(habit =>(
                        
                            <CheckBox 
                            key={habit.id} 
                            title={habit.title} 
                            checked={completedHabits.includes(habit.id)}
                            onPress={()=>{handleToggleHabit(habit.id)}}
                            disabled={isDateInPass}>
                            
                            </CheckBox> 
                            
                        )) :
                         <HabitEmpaty/>
                    }

                    {
                        isDateInPass &&
                        (
                            <Text className="text-white text-base font-semibold m-10 text-center">Você não pode editar hábitos de uma data passada</Text>
                        )
                    }
                    
                </View>
            </ScrollView>
               
        </View>
    )
}