export default class Solve
{
  
  static GetResult(eq)
  {
    var result = [null,null]
    var solved = this.SolveEquation(eq)
    
    if(solved)
    {// Resolvida
      localStorage.eq = JSON.stringify(this.result)
      return this.result
      //alert("Teste True")
    }
    else
    {// Não resolvida
    localStorage.eq = null
    return ["Desculpa, não foi possível resolver essa equação!",localStorage.delta]
    //alert("Teste False")
    }
    //console.log(result)
    //return this.result
  }
  
  welcome()
  {
    return "U're welcome dud!"
  }
  
  static SolveEquation(eq)
  {
    let solve
    // Obter os membros da equação 
    let a = eq[0]
    let b = eq[1]
    let c = eq[2]
    let r = eq[3]
    
    //Verificar ∆
    let delta = Math.pow(b,2) - (4*a*c)
    
    $("#s-a-fp").text(a)
    $("#f-a-fp").text(a)
    $("#f-b-fp").text(b)
    $("#s-b-fp").text(b)
    $("#c-fp").text(c)
    
    $("#b-e").text(b)
    $("#a-e").text(a)
    $("#c-e").text(c)
    
    $("#fm-e").text(Math.pow(b,2))
    $("#sm-e").text(4*a*c)
    
    $("#delta-e").text(delta)
    $("#f-delta-sp").text(delta)
    $("#s-delta-sp").text(delta)
    
    localStorage.delta = delta
    if(delta < 0)
    {
      //alert("Teste ∆")
      solve = false
    }
    else
    {
      // Chamar métodos resolutivos
      let result = this.ByBashkara(a,b,c)
      
      if(result[0])
      {// Resolvida com Bashkara
        this.result = result[1]
        console.log(this.result)
        solve = result[0]
      }
      else
      {
        result = this.ByProductSome(a,b,c)
        if(result[0])
        {// Resolvido com Produto e Soma
          this.result = result[1]
          console.log(this.result)
          solve = result[0]
        }
        else
        {// Não resolvido 
          solve = result[0]
        }
      }
    }
    return solve
  }
  
  static ByBashkara(a,b,c)
  {// Resolver usando a fórmula de bashkara
  
  let result = [false,[null,null]]
  
  //...
  let x1 = (-(b) + Math.sqrt(localStorage.delta))/(2*a)
  let x2 = (-(b) - Math.sqrt(localStorage.delta))/(2*a)
  
  $("#fb-sp").text(-b)
  $("#sb-sp").text(-b)
  $("#fd-sp").text(2*a)
  $("#sd-sp").text(2*a)
    
  result = [true,[x1,x2]]
  //...
  
  return result
    
  }
  
  static ByProductSome(a,b,c)
  {// Resolver usando Soma e Produto
    
    let result = [false,[null,null]]
    /*
    P = c/a = !
    S = -b/a = ?
    
    x1 * x2 = !
    x1 + x2 = ?
    */
    //...
    let x1,x2
    x1=x2=0
    let p = c/a
    let s = -(b)/a
    console.log([p,s])
    let delta = Math.pow(b,2) - (4*a*c)
    localStorage.delta = delta
    //alert(delta)
    if(delta < 0)
    {
      console.log(delta)
    }
    else
    {
      let solved 
      
      do
      {
        solved = false
        
        //Números negativos 
        x1 = Math.round(Math.random()*-1000)
        x2 = Math.round(Math.random()*-1000)
        if((x1+x2) == s && (x1*x2) == p)
        {
          solved = true
          result = [true,[x1,x2]]
          break
        }
        //Números positivos 
        x1 = Math.round(Math.random()*1000)
        x2 = Math.round(Math.random()*1000)
        if((x1+(x2)) == s && (x1*(x2)) == p)
        {
          solved = true
          result = [true,[x1,x2]]
        }
      }while(!solved)
    }
    //...
    
    return result
  }
  
}
