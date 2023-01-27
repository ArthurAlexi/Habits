interface PropsProgressBar{
    progress : number
}



export function ProgressBar(props:PropsProgressBar ) {

    const progressStyle = {

        width : `${props.progress}%`
    }

    return (
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4' >
            <div className='h-3 rounded-xl bg-violet-600 transition-all'
                role={'progressbar'}
                aria-labe='Progresso de hábitos completados nesse dia'
                aria-aria-valuenow={props.progress} 
                style={progressStyle}/>
        </div>
    )
}