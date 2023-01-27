import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { Summaries } from "../models/Summary"
import { generateDatesFromTheYear } from "../utils/generate-dates-from-the-year"
import { HabitsDay } from "./HabitsDay"

const weekDays = ['D','S','T',,'Q','Q','S','S']

const summaryDates = generateDatesFromTheYear()

const minimunSummaryDatesSize = 18 * 7
const amountOfDayToFill = minimunSummaryDatesSize - summaryDates.length

export function SummaryTable(){

    const [summary,setSummary] = useState<Summaries>([])

    useEffect(()=>{
        api.get('summary').then((res)=>{
            // console.log(res)
            setSummary(res.data)
        })
    },[])
    

    return (
        <div className="w-full flex ">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay,i)=>{
                    return (
                        <div key={`${weekDay}-${i}`} className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
                            {weekDay}
                        </div>
                    )
                })}
                
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">

                {summary.length > 0 && summaryDates.map(date=>{
                    const dayInSummary = summary.find(day =>{
                        return dayjs(date).isSame(dayjs(day.date),'day')
                    })

                    return <HabitsDay 
                            key={date.toISOString()}
                            amount={dayInSummary?.amount} 
                            defaultCompleted={dayInSummary?.completed} 
                            date={date}/>
                })}
                {amountOfDayToFill > 0 && Array.from({length: amountOfDayToFill}).map((_,i)=>{
                    return <div key={i}
                    className="w-10 h-10  bg-zinc-900 border-2 border-zinc-800 rounded-lg  opacity-40 cursor-not-allowed"/>
                    
                })}
            </div>
        </div>
    )
}