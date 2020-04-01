import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

import InputMask from "react-text-mask";
import api from "../../services/api";

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default class ClientSearch extends Component {  
  state = {
    clientData: [],
    paymentData: {},
    input: "",    
  };

  componentDidMount() {
    if(this.props.location.state === undefined){
      alert("Você deve passar pela simulação e escolha de parcelamento do emprestimo primeiro!");
      window.location.href = "http://localhost:3000/emprestimo/simular-emprestimo";
    }
    else{
      this.setState ({ paymentData: this.props.location.state.paymentData })
    }
  }

  searchClient = async () => {
    let { input } = this.state;

    const apiResponse = await api.get(`/users/?cpf=${input}`);

    if(apiResponse.status === 200) { 
      const clientData = apiResponse.data.shift();

      this.setState({ clientData });   

      if(input === "") {
        alert ("Digite um CPF.");
      }
      else if(clientData === undefined && input !== "") {
        alert("CPF não existente.");
      }
    }
    else {
      alert("Banco de Dados Offline!");
    }     
  };

  printResult = () => {
    const { clientData, paymentData } = this.state;
    
    if (clientData === undefined) {      
      return;   
    }
    else if (clientData.cpf !== undefined) { 
      return (
        <div className="search-result">
          <span>Cliente Encontrado:</span>
          <p>{ clientData.cpf }</p>
          <strong>{ `${clientData.firstName} ${clientData.lastName}` }</strong>
          <Link className="btn" to={{
            pathname: "/emprestimo/metodo-de-emprestimo/",
            state:{
                paymentData,
                clientData
            }
          }} > Solicitar </Link>
        </div>  
      )    
    }
  };  
  
  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  render() {    

    return (
      <div className="wrap-fields">    
        <p> Busque o cliente </p>    
        <div className="mb-3 input-group">
          <InputMask onChange={ this.handleChange } type="text" placeholder="Digite o CPF do cliente" mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-" , /\d/, /\d/]} />          
          <InputGroup.Append>
            <Button variant="info" onClick={ this.searchClient }>Buscar</Button>
          </InputGroup.Append>
        </div>
        { this.printResult() }
      </div>
    );
  }
}