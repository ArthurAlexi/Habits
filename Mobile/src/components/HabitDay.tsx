import { TouchableOpacity,TouchableOpacityProps,Dimensions } from "react-native";
import {generateProgressPercentage} from '../utils/generate-progress-percentage'
import clsx from "clsx";
import dayjs from "dayjs";

const WEEKDAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEKDAYS ) - (SCREEN_HORIZONTAL_PADDING + 5)

interface  Props extends TouchableOpacityProps{
    amount ?: number
    completed ?: number
    date : Date
}
export function HabitDay({ amount=0, completed=0,date,...rest}:Props){

    const percentCompleted = amount > 0 ? generateProgressPercentage(amount,completed) : 0

    const today = dayjs().startOf('day').toDate()
    const isCurrentDay = dayjs(date).isSame(dayjs(today))
    return (
        <TouchableOpacity
        className={clsx("rounded-lg border-2 m-1",{
            'bg-zinc-700 border-zinc-600': percentCompleted === 0,
          'bg-violet-900 border-violet-500': percentCompleted > 0 && percentCompleted < 20,
          'bg-violet-800 border-violet-500': percentCompleted >= 20 && percentCompleted < 40,
          'bg-violet-700 border-violet-500': percentCompleted >= 40 && percentCompleted < 60,
          'bg-violet-600 border-violet-500': percentCompleted >= 60 && percentCompleted < 80,
          'bg-violet-500 border-violet-400': percentCompleted >= 80,
          'border-4 border-white' : isCurrentDay
        })}
        style={{width:DAY_SIZE , height:DAY_SIZE}}
        activeOpacity={0.7}
        {...rest}>

        </TouchableOpacity>
    )
}
