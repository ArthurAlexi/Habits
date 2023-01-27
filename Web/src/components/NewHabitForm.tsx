import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const avaliableWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira',
    'Quinta-Feira', 'Sexta-Feira', 'Sábado']

export function NewHabitForm() {

    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex:number){
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        }else {
            setWeekDays(prevState => [...prevState,weekDayIndex])
        }
    } 

    async function  createNewHabit(event: FormEvent){
        event.preventDefault()

        if(!title || weekDays.length ===0){
            return
        }

        await api.post('habits',{
            title,
            weekDays,
        })

        setTitle('')
        setWeekDays([])

        alert('Hábito criado com sucesso')
        
    }

    return (

        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual é o seu compremetimento
            </label>
            <input 
            type="text" 
            id="title" 
            placeholder="Exercícios, Beber água..." 
            autoFocus
            value={title}
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none
             focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
             onChange={event => setTitle(event.target.value)}/>

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual é a recorrência
            </label>

            <div className='mt-2 flex flex-col gap-1 '>
                {avaliableWeekDays.map((weekDay,i) => {
                    return (
                        <Checkbox.Root 
                        className='flex items-center gap-1 group 
                        focus:outline-none disabled:cursor-not-allowed'
                        checked={weekDays.includes(i)}
                        onCheckedChange={()=>{
                            handleToggleWeekDay(i)
                        }}
                    >
                            <div
                                className='h-5 w-5 rounded-md flex items-center justify-center
                              bg-zinc-900 border-2 border-zinc-800
                               group-data-[state=checked]:bg-green-500 
                              group-data-[state=checked]:border-green-500 transition-colors'>
                                <Checkbox.Indicator>
                                    <Check size={15} className='text-white'></Check>
                                </Checkbox.Indicator>
                            </div>
                            <span key={weekDay} className=' text-white  leading-tight'>
                                {weekDay}
                            </span>
                        </Checkbox.Root>
                    )
                }
                )}

            </div>


            <button type="submit"
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"> <Check size={20} weight="bold" /> Confirmar</button>
        </form>
    )
}