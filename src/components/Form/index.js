import React, { useState } from "react";
import {View , Text, TextInput, Button} from "react-native"; 
import ResultSitu from './Situ/';
export default function Form(){

  const [media , setMedia] = useState(null);
  const [nota1 , setNota1] = useState(null);
  const [nota2 , setNota2] = useState(null);
  const [nota3 , setNota3] = useState(null);
  const [nota4 , setNota4] = useState(null);
  const [message , setMessage] = useState("Preencha o espaço das Notas");
  const [textButton , setTextButton] = useState("VER SITUAÇÃO");


  function calcularMedia(){
    var calculo = ((parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3))/3).toFixed(2);
    return setMedia(calculo);
  }

  function minNota(notas) {
    var menorNota = 10;
    for(i = 0 ; i < notas.length ; i++){
      if(notas[i] <= menorNota){
        menorNota = notas[i];
      }
    }
    return menorNota;
  }

  function menorDe3(notas) {
    var cont = 0;
    for(i = 0 ; i < notas.length ; i++){
      if(notas[i] < 3){
        cont++;
      }
    }
    return (cont < 2) ? false : true; 
  }


  function situAluno() {
    var calculo = ((parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3))/3).toFixed(2);
    var menorNota = minNota([ nota1, nota2 , nota3 ]);
    var resto = parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3) - parseFloat(menorNota);
    var precisa = ((15 - resto) > 3) ? 15 - resto : 3 ;
    var situ;
    if(calculo >= 7){
      situ = "O aluno está Aprovado";
    }
    else if(calculo >= 5 && nota1 >= 3 && nota2 >= 3 && nota3 >= 3 ){
      situ = "O aluno está Aprovado por Média";
    }
    else{
      
      if(menorDe3([ nota1, nota2 , nota3 ]) || precisa > 10){
        situ = "Sinto muito mas você já está reprovado :(";
      }
      else{
        situ = "Você está de Recuperação e precisa tirar nota " + precisa ;
      }  
    }
    return setMessage(situ);
  }

  function validarMedia(){
    if(nota1 != null && nota2 != null && nota3 != null && nota1 <= 10 && nota2 <= 10 && nota3 <= 10 ){
      calcularMedia();
      situAluno();
      setTextButton("Calcular Novamente");
      setNota1(null); 
      setNota2(null); 
      setNota3(null);
      return  
    }
    setMedia(null);
    setMessage("Preencha o espaço das Notas");
    setTextButton("VER SITUAÇÃO");
  }

  return(
    <View>
      <View>
        <Text>Nota da Unidade 1</Text>
        <TextInput placeholder = "Ex: 7.5" keyboardType = "numeric" onChangeText = {setNota1} value ={nota1}/>
        <Text>Nota da Unidade 2</Text>
        <TextInput placeholder = "Ex: 7.5" keyboardType = "numeric" onChangeText = {setNota2} value ={nota2}/>
        <Text>Nota da Unidade 3</Text>
        <TextInput placeholder = "Ex: 7.5" keyboardType = "numeric" onChangeText = {setNota3} value ={nota3}/>
        <Button title = {textButton} onPress = {() => validarMedia()} />
      </View>
      <ResultSitu message = {message} media = {media} />
      <View></View>
      <View></View>
    </View>
  );
}