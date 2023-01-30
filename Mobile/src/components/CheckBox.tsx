import { View,TouchableOpacity,TouchableOpacityProps,Text } from "react-native";
import {Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors';
import Animated,{RotateInUpLeft,RotateInDownRight} from "react-native-reanimated";

interface Props extends TouchableOpacityProps{
    title : string
    checked ?: boolean
}

export function CheckBox({title, checked=false, ...rest} : Props){

    return (
        <TouchableOpacity activeOpacity={0.7} {...rest}
        className="flex-row mb-2 items-center mt-4">
            {   checked ? 
                <Animated.View
                 className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
                 entering={RotateInUpLeft}
                 exiting={RotateInDownRight}>
                    <Feather
                    name="check"
                    size={20}
                    color={colors.white}/>
                </Animated.View>

                :

                <View className="h-8 w-8 bg-zinc-700  border-2 border-zinc-800 rounded-lg"/>
                    
            }
            <Text className="text-white ml-3 font-semibold text-base">
                {title}
            </Text>

        </TouchableOpacity>
    )

}