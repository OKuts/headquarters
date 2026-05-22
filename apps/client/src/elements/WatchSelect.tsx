type Props = {
    watch: string
    setWatch: (value: string) => void
    list: string[]
}

export const WatchSelect = ({list, watch, setWatch}: Props) => {

    return <div className={'flex'}>
        {list.map(el =>
            <span key={el}
                  className={`min-w-16 inline-block text-center cursor-pointer 
                  ${watch === el 
                      ? 'text-blue-500 dark:text-blue-400 font-bold' 
                      : 'dark:text-white text-gray-700'} hover:text-blue-500 `}
                  onClick={() => setWatch(el)}
            >
                {el}
            </span>)}
    </div>
}