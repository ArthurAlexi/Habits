import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { HabitsInfo } from '../models/HabitsInfo';

interface Props {
    date: Date,
    onCompletedChaged: (completed: number) => void
}

export function HabitsList({ date,onCompletedChaged }: Props) {
    const [habitsList, setHabitsList] = useState<HabitsInfo>()


    useEffect(() => {
        api.get('day', {
          params:{
            date: date.toISOString()
          }
        }).then(response => {
            setHabitsList(response.data)
        })
      },[])

    const isDateInPass = dayjs(date).endOf('day').isBefore(new Date())

    async function handleToggleHabit(habitId: string){
        const isHabitAlreadyCompleted = habitsList!.completedHabits.includes(habitId)
        
        await api.patch(`habits/${habitId}/toggle`)

        let completedHabits: string[] = []
        if(isHabitAlreadyCompleted){
            completedHabits = habitsList!.completedHabits.filter(id => id !== habitId )
        }else{
            completedHabits = [...habitsList!.completedHabits, habitId]
        }

        setHabitsList({
            possibleHabits: habitsList!.possibleHabits,
            completedHabits: completedHabits
        })

        onCompletedChaged(completedHabits.length)
    }

    return (

        <div className='mt-6 flex flex-col gap-3'>
            {habitsList?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root 
                    key={habit.id}
                    checked={habitsList.completedHabits.includes(habit.id)}
                    disabled={isDateInPass}
                    onCheckedChange={()=>{handleToggleHabit(habit.id)}}
                    className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'>
                        <div
                            className='h-8 w-8 rounded-lg flex items-center justify-center
                  bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 
                  group-data-[state=checked]:border-green-500 transition-colors 
                  group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900'>
                            <Checkbox.Indicator>
                                <Check size={20} className='text-white'></Check>
                            </Checkbox.Indicator>
                        </div>
                        <span className='font-semibold text-xl text-white leading-tight
                group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                            {habit.title}
                        </span>
                    </Checkbox.Root>

                )

            })}

        </div>

    )
}