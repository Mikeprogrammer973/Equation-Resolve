import Solve from "./solve.class.js"


//console.log(Solve.GetResult([1,-1,-30]))

var inputs,m_eq,msg
window.onload = ()=>{
  $("#processo").hide(500)
  //Caixa de mensagem 
  msg = document.getElementById("msg")
  
  //Obter inputs
  inputs = 
  [
    document.getElementById("m-a"),
    document.getElementById("m-b"),
    document.getElementById("m-c")
  ]
  
  //Obter span dos ms-eq
  m_eq = 
  [
    document.getElementById("a"),
    document.getElementById("b"),
    document.getElementById("c")
  ]
  
  //Evento change e click dos inputs
  for(let i = 0; i < 3; i++)
  {
    //change
    inputs[i].addEventListener("change",()=>{
      if(inputs[i].value == "")
      {
        m_eq[i].innerHTML = m_eq[i].id
        m_eq[i].style.color="red"
        return
      }
      m_eq[i].innerHTML = inputs[i].value
    })
    //click
    inputs[i].addEventListener("click",()=>{
        msg.style.color="green"
        msg.innerHTML=`Digite o valor do coeficiente '${m_eq[i].id}'...`
        m_eq[i].style.color="green"
    })
  }
  //btn
   let btn = document.getElementById("solve")
    
    
  //Evento do botão
  btn.addEventListener("click",()=>{
    $("#processo").hide(500)
    btn.value = ""
    document.getElementById("x1").innerHTML="?"
    document.getElementById("x2").innerHTML="?"
    btn.setAttribute("class","spinner-border")


    //Testar inputs
    setTimeout(()=>{
      for(let i = 0; i < 3; i++)
      {
        if(inputs[i].value == "")
        {
          msg.style.color="red"
          msg.innerHTML=`Falta o valor do coeficiente '${m_eq[i].id}'...`
          btn.value="Resolver"
          btn.removeAttribute("class")
          return
        }
        if(inputs[i].value == 0)
        {
          msg.style.color="red"
          msg.innerHTML=`O valor do coeficiente '${m_eq[i].id}' é inválido...`
          btn.value="Resolver"
          btn.removeAttribute("class")
          return
        }
      }
      //Obter resultado da equação
      const result = Solve.GetResult([Number(m_eq[0].innerHTML),Number(m_eq[1].innerHTML),Number(m_eq[2].innerHTML)])
      for(let i = 0; i < 3; i++)
      {
        inputs[i].value = ""
      }
      $("#processo").show(1000)
      btn.value="Resolver"
      btn.removeAttribute("class")
      //alert(result)
      if(isNaN(result[0]))
      {//Equação não resolvida 
        document.getElementById("processo").setAttribute("style","color:red;")
        $("#delta-fp").css("border-color","red")
        $("#m-m").css("border-color","red")
        $("#s-part").hide(100)
        msg.style.color="red"
        msg.innerHTML=`${result[0]}<br>Erro: ∆ < 0`
        return
      }
      //Equação resolvida
      document.getElementById("processo").setAttribute("style","color:green;")
      $("#delta-fp").css("border-color","green")
      $("#m-m").css("border-color","green")
      $("#s-part").show(100)
      document.getElementById("x1").innerHTML=`${result[0]}`
      document.getElementById("x2").innerHTML=`${result[1]}`
    },2000)
  })
}

