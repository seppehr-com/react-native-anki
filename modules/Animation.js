import { Animated } from 'react-native';

class Animation {
    fadeIn(ref,duration,setVisible){
        Animated.timing(ref,{
            toValue:1,
            duration:duration,
            useNativeDriver:true,
        }).start();
        setVisible(true);
    }
    fadeOut(ref,duration,setVisible){
        Animated.timing(ref,{
            toValue:0,
            duration:duration,
            useNativeDriver:true,
        }).start();

        setTimeout(()=>{
            setVisible(false);
        },duration);
    }
}

export default Animation;