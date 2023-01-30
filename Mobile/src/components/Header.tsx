import { View, TouchableOpacity, Text } from "react-native";
import Logo from '../assets/logo.svg'
import colors from 'tailwindcss/colors';
import {useNavigation} from '@react-navigation/native'

import {Feather } from '@expo/vector-icons'

export function Header(){

    const {navigate } = useNavigation()

    return(
        <View className="w-full flex-row items-center justify-between">
            <Logo/>
            <TouchableOpacity  onPress={()=>navigate('newHabit')}
            className="flex-row h-11 px-4 items-center border border-violet-500 rounded-lg "
            activeOpacity={0.7}>
                <Feather 
                name="plus"
                color={colors.violet[500]}
                size={20}
                />
                <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
            </TouchableOpacity>

            
        </View>
    )
}