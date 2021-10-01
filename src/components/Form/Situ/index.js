import React from "react";
import {View , Text } from "react-native"; 

export default function ResultSitu(props){
  var result = (props.media != null) ? "Sua Média no Semestre foi de " + props.media : null;
  return(
    <View>
      <Text>{result}</Text>
     <Text>{props.message}</Text>
    </View>
  );
}