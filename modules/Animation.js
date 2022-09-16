import { Animated } from 'react-native';

class Animation {
    fadeIn(ref,setVisible){
        Animated.spring(ref,{
            toValue:1,
            useNativeDriver:true,
        }).start();
        setVisible(true);
    }
    fadeOut(ref,setVisible){
        Animated.spring(ref,{
            toValue:0,
            useNativeDriver:true,
        }).start();

        setTimeout(()=>{
            setVisible(false);
        },100);
    }
}

export default Animation;