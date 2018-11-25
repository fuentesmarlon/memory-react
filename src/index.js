import React from 'react';
import ReactDOM from 'react-dom';
import css from './stylo.css';


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          mediaBaraja: [
              'cartaA.png','cartaJ.png','cartaK.png','cartaQ.png','carta2.png','carta3.png','carta4.png','carta5.png'
          ],
          baraja: [],
          mezclada: [],
          barajaFinal: [],
          escogidos: []
        }
        this.start()
      }
      handleClick(name,index){
        if(this.state.escogidos.length == 2){
          setTimeout(() => {
            this.check()
          },750)
        }else {
            //carta
          let carta = {
            name,
            index
          }
          let barajaFinal = this.state.barajaFinal
          let mediaBaraja = this.state.escogidos
          barajaFinal[index].close = false
          //baraja tiene cartas 
          mediaBaraja.push(carta)
          this.setState({
              //cartas
            escogidos: mediaBaraja,
            barajaFinal: barajaFinal
          })
          if(this.state.escogidos.length == 2){
            setTimeout(() => {
              this.check()
            },750)
          }
        }
      } 
      check(){
        let barajaFinal = this.state.barajaFinal
        if((this.state.escogidos[0].name == this.state.escogidos[1].name) && (this.state.escogidos[0].index != this.state.escogidos[1].index)){
          barajaFinal[this.state.escogidos[0].index].complete = true
          barajaFinal[this.state.escogidos[1].index].complete = true
        }else {
          barajaFinal[this.state.escogidos[0].index].close = true
          barajaFinal[this.state.escogidos[1].index].close = true
        }
        this.setState({
          barajaFinal,
          escogidos: []
        })
      }
      start(){
        let barajaFinal = [];
        this.state.baraja = this.state.mediaBaraja.concat(this.state.mediaBaraja)
        this.state.mezclada = this.state.baraja
        this.state.mezclada.map((name,index) => {
          barajaFinal.push({
            name,
            close: true,
            complete: false,
            fail: false
          })
        })
        this.state.barajaFinal = barajaFinal
      }
      render(){
        
        return (
          <div className="game">
              {
                this.state.barajaFinal.map((carta, index) => {
                  return <Card carta={carta.name} click={() => {this.handleClick(carta.name,index)}} close={carta.close} complete={carta.complete}/>
                })
              }
          </div>
        )
      }
  }
  
  class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
      }
    clicked(carta){
      this.props.click(carta)
    }
    render(){
      return (
    
        <div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.carta)}>
          <div className="front">
            <img src={require("./img/back.jpg")}/>
          </div>
          <div className="back">
            <img src={require("./img/" + this.props.carta)}/>
          </div>
        </div>
      )
    }               
  }
  
  ReactDOM.render( <Game/>, document.getElementById('app'))