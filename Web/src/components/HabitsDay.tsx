import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx'
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface PropsHabitsDay {
    date: Date
    defaultCompleted?: number
    amount?: number
}


export function HabitsDay({ defaultCompleted = 0, amount = 0, date }: PropsHabitsDay) {

    const [completed,setCompleted] = useState(defaultCompleted)

    const percentCompleted = amount > 0 ? Math.round((completed / amount) * 100) : 0
    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    const today = dayjs().startOf('day').toDate()
    const isCurrentDay = dayjs(date).isSame(dayjs(today))

    function completedHabitListChanged(completed: number){
        setCompleted(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx("w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background", {
                'bg-zinc-900 border-zinc-800': percentCompleted === 0,
                'bg-violet-900 border-violet-500': percentCompleted > 0 && percentCompleted < 20,
                'bg-violet-800 border-violet-500': percentCompleted >= 20 && percentCompleted < 40,
                'bg-violet-700 border-violet-500': percentCompleted >= 40 && percentCompleted < 60,
                'bg-violet-600 border-violet-500': percentCompleted >= 60 && percentCompleted < 80,
                'bg-violet-500 border-violet-400': percentCompleted >= 80,
                'border-1 border-white' : isCurrentDay,
            })} />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6  rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='text-zinc-400 font-semibold'>{dayOfWeek}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgressBar progress={percentCompleted} />

                    <HabitsList date={date} onCompletedChaged={completedHabitListChanged}/>
                    <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>

    )
}