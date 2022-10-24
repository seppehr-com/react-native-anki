import React,{useContext} from 'react';
import { Text,View,StyleSheet, TouchableOpacity,ScrollView,ActivityIndicator } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { CardContext } from '../../context/CardContext';
import theme from '../../../assets/theme';
import { useSelector } from 'react-redux';

const Counter=()=>{
    const {easy,good,again}=useContext(CardContext);

    if(typeof easy == 'number')
        return (
            <View style={styles.answersCounter}>
                <Text style={styles.easyCounter}>{easy}</Text>
                <Text style={styles.againCounter}>{again}</Text>
                <Text style={styles.goodCounter}>{good}</Text>
            </View>
        )
}
const Head=()=>{
    //NightMode
    const {mode} = useSelector(selector => selector.nightMode);
    
    const {visible,cards,counter}=useContext(CardContext);

    const currentCard=cards[counter];

    const convertToHtml=(str)=>{
        return str.replace(/\n/g, "<br />");
    }

    const baseStyleText={
        ...theme.typo.h1,
        color:theme.colors[mode].t1,
    };

    return (
        <ScrollView>
            <Counter />
            <View style={styles.cardWrapper}>
                <View style={styles.frontWrapper}>
                    {/* <Text style={styles.cardText} selectable>{currentCard.frontText}</Text> */}
                    <RenderHtml
                        contentWidth={500}
                        source={{
                            html: convertToHtml(`<b>${currentCard.frontText}</b>`)
                        }}
                        baseStyle={baseStyleText} 
                        // defaultTextProps={{selectable:true}}
                    />
                </View>
                
                <View style={[styles.backWrapper,{
                    display:visible?'flex':'none'
                }]}>
                    <RenderHtml
                        contentWidth={500}
                        source={{
                            html: convertToHtml(currentCard.backText)
                        }}
                        baseStyle={baseStyleText}
                        // defaultTextProps={{selectable:true}}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const Bottom=()=>{
    const {visible,handleShowBack,handleNextCard}=useContext(CardContext);

    return(
        <View style={styles.buttonsWrapper}>
            {!visible && (
                <TouchableOpacity style={styles.showAnswerButtonWrapper} onPress={handleShowBack}>
                    <Text style={styles.showAnswerButtonText}>SHOW ANSWER</Text>
                </TouchableOpacity>
            )}
            {visible && (
                <>
                <TouchableOpacity style={styles.againButton} onPress={()=>handleNextCard(-1,'again')}>
                    <Text style={styles.buttonText}>AGAIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.goodButton} onPress={()=>handleNextCard(1,'good')}>
                    <Text style={styles.buttonText}>GOOD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.easyButton} onPress={()=>handleNextCard(2,'easy')}>
                    <Text style={styles.buttonText}>EASY</Text>
                </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const PreviewBottom=()=>{
    const {visible,handleToggle}=useContext(CardContext);

    return(
        <View style={styles.buttonsWrapper}>
            <TouchableOpacity style={styles.showAnswerButtonWrapper} onPress={handleToggle}>
                <Text style={styles.showAnswerButtonText}>{visible?'HIDE ANSWER':'SHOW ANSWER'}</Text>
            </TouchableOpacity>
        </View>
    );
}



const CardLayout = () => {
    //NightMode
    const {mode} = useSelector(selector => selector.nightMode);
    
    const {cards,preview}=useContext(CardContext);

    return ( 
        <View style={[styles.container,{
            backgroundColor:theme.colors[mode].background
            }]}>
                {Array.isArray(cards)&&
                <>
                <Head />
                {!preview && <Bottom /> }
                {preview && <PreviewBottom /> }
                </>}

                {cards==='empty'&&
                    <View style={[styles.container,{
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:theme.colors[mode].background
                    }]}>
                        <Text style={{...theme.typo.b1,color:theme.colors.darkGray}}>There is no note here!</Text>
                    </View>}

                {!cards&&
                    <View style={[styles.container,{
                        justifyContent:'center',
                        backgroundColor:theme.colors[mode].background
                        }]}>
                        <ActivityIndicator size='large' color={theme.colors.header} />
                    </View>}
        </View> 
    );
}
 
export default CardLayout;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
    },
    answersCounter:{
        height:30,
        backgroundColor:'#B3E5FC',
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:16,
    },
    easyCounter:{
        ...theme.typo.h2,
        color:theme.colors.easy,
    },
    againCounter:{
        ...theme.typo.h2,
        color:theme.colors.again,
        marginLeft:5,
    },
    goodCounter:{
        ...theme.typo.h2,
        color:theme.colors.good,
        marginLeft:5,
    },
    cardWrapper:{
        paddingHorizontal:20,
        alignItems:'center',
    },
    frontWrapper:{
        paddingVertical:15,
    },
    backWrapper:{
        paddingVertical:15,
        width:'100%',
        borderTopWidth:1,
        borderColor:theme.colors.midGray,
    },
    cardText:{
        ...theme.typo.h1,
        color:theme.colors.black,
    },
    buttonsWrapper:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
    },
    showAnswerButtonWrapper:{
        backgroundColor:'#465A65',
        flex:1,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },
    showAnswerButtonText:{
        ...theme.typo.h2,
        color:theme.colors.white
    },
    againButton:{
        backgroundColor:theme.colors.again,
        flex:1,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },
    goodButton:{
        backgroundColor:theme.colors.good,
        flex:1,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },
    easyButton:{
        backgroundColor:'#03A9F5',
        flex:1,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        ...theme.typo.b1,
        color:theme.colors.white
    },
});