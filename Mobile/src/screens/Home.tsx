import { View, Text, ScrollView, Alert } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from "../lib/axios";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/loading";
import { useCallback, useState,useEffect } from 'react';


import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import { Summaries } from "../models/Summary";
import dayjs from "dayjs";


const datesFromYearStart = generateRangeDatesFromYearStart()
const minimumSummaryDatesSize = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export function Home() {

    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<Summaries>([])
    const { navigate } = useNavigation()

    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get('summary')
            setSummary(response.data)
        } catch (error) {
            console.log(error)
            Alert.alert('Ops', 'Não foi possível carregar os hábitos')
        } finally {
            setLoading(false)
        }

    }

    //Recarrega sempre q a tela tem o foco 
    useFocusEffect(useCallback(() => {
        fetchData()
      }, []))

    // useEffect(()=>{
    //     api.get('summary').then((res)=>{
    //         // console.log(res)
    //         setSummary(res.data)
    //     })
    //     .catch((err)=>{
    //         console.log('Olha o erro' + '\n' + err )
    //     }).finally(()=>{
    //         setLoading(false)
    //     })
    // },[])

    if (loading) {
        return <Loading />
    }

    
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i) => (
                        <Text key={`${weekDay}=${i}`}
                            className='text-zinc-400 text-xl font-bold text-center mx-1'
                            style={{ width: DAY_SIZE, height: DAY_SIZE }}>
                            {weekDay}
                        </Text>
                    ))
                }
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => {
                            const dayWithHabist = summary.find(day => {
                                return dayjs(day.date).isSame(dayjs(date),'day')
                            } )
                            return (
                                <HabitDay
                                    key={date.toISOString()}
                                    amount={dayWithHabist?.amount}
                                    completed={dayWithHabist?.completed}
                                    date={date}
                                    onPress={() => navigate('habit', { date: date.toISOString() })} />
                            )
                        })
                    }

                    {
                        amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill })
                            .map((_, index) => (
                                <View
                                    key={index}
                                    className="bg-zinc-600 rounded-lg border-2 m-1 border-zinc-500 opacity-40"
                                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                                >
                                </View>
                            ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}