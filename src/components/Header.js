import { Box, StatusBar } from "@gluestack-ui/themed"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "@gluestack-ui/themed"


const Header = () => {
    
    return(
    <SafeAreaView>
        <StatusBar backgroundColor='#2c3e50' />
        <Box bg="#2c3e50" alignItems="center" justifyContent="center" safeAreaTop py={10}>
            <Text color='#fff' fontSize={20} fontWeight='bold' pt={60}>
                Movies App
            </Text>
        </Box>
    </SafeAreaView>
    )

}

export default Header
