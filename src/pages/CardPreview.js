import React,{useState} from 'react';
import CardLayout from '../components/Card/CardLayout';
import { CardProvider } from '../context/CardContext';

const CardPreview = ({route}) => {
    const {frontText,backText} = route.params;
    const [visible,setVisible]=useState(false);

    const cards=[{
        frontText:frontText,
        backText:backText
    }];

    const handleToggle=()=>{
        setVisible(prev=>!prev);
    }

    return ( 
        <CardProvider value={{visible,cards,counter:0,preview:true,handleToggle}}>
            <CardLayout />
        </CardProvider>
    );
}
 
export default CardPreview;