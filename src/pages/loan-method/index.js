import React from 'react';
import { Component } from 'react';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';




export default class LoanMethod extends Component {
    state = {
      clientData: [],
      paymentData: {},
      paymentMethod: "",    
      next: false
    };
  
    componentDidMount() {
      if(this.props.location.state === undefined){
        alert("Você deve passar pela escolha de parcelamento do emprestimo e escolha do cliente antes!");
        window.location.href = "http://localhost:3000/emprestimo/simular-emprestimo";
      }
      else{
        this.setState ({ paymentData: this.props.location.state.paymentData, clientData: this.props.location.state.clientData })
      }
    }

    choosePayment = () => {
        const { paymentMethod, clientData ,paymentData, next } = this.state;
        if (paymentMethod === "") {
            return (
                <div className="choose-payment-method">
                    <h2> Escolha a modalidade: </h2>
                    <Button variant="info" onClick={ this.handleClick } value="credit-card"> Cartão de Crédito </Button>
                    <p> Ou </p>
                    <div>
                        <Button variant="info" value="payroll-linked" disabled> Crédito Consignado </Button>
                        <span> Em breve! </span>
                    </div>
                </div>
            )
        }
        else if(paymentMethod === "credit-card" && next === false) {
            return (
                <Table borderless className="client-info-table">
                    <thead>
                        <tr>
                            <th> Insira os dados do Cartão </th>
                            <th> Faça o upload dos anexos do Cartão</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="client-info-field">
                                    <strong> { `${clientData.firstName} ${clientData.lastName}` } </strong>
                                </div>
                            </td>
                            <td>
                                <div className="attachment-field">
                                    <strong>Cartão de Crédito (Frente)</strong>
                                    <a href="#">Adicionar</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="client-info-field">
                                    <strong> { clientData.creditCard[0].number } </strong>
                                </div>
                            </td>
                            <td>
                                <div className="attachment-field">
                                    <strong>Cartão de Crédito (Verso)</strong>
                                    <a href="#">Adicionar</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="client-info-field">
                                    <strong> { clientData.creditCard[0].expires } </strong>
                                </div>
                            </td>
                            <td>
                                <div className="attachment-field">
                                    <strong>Selfie com Cartão de Crédito</strong>
                                    <a href="#">Adicionar</a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="client-info-field">
                                    <strong> { clientData.creditCard[0].securityCode } </strong>
                                </div>
                            </td>
                            <td>
                                <div className="attachment-span">
                                    <span> Atenção: As fotos devem estar legíveis, com todas as informações do cartão visíveis. </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                            <Button variant="info" onClick={ this.nextStep }> Concluir </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    solicitationInfo = () => {
        const { clientData ,paymentData, next } = this.state;

        if(next === true){
            return (
                <Table borderless className="soliciation-end-table">
                    <thead>
                        <tr>
                            <th colSpan="2">
                                <h2> Solicitação realizada com sucesso! </h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <div>
                                    <span className="blue-text span-custom"> Resumo da Solicitação: </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="background-div">
                                    <strong className="dark-text"> {`${clientData.firstName} ${clientData.lastName}`} </strong>
                                </div>
                            </td>
                            <td>
                                <div className="background-div">
                                    <strong className="blue-text">Taxa de Juros: </strong>
                                    <strong className="orange-text"> {`${paymentData.paymentInfo.juros*100}%`} </strong>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="background-div">
                                    <strong className="dark-text"> { clientData.creditCard[0].number } </strong>
                                </div>
                            </td>
                            <td>
                                <div className="background-div">
                                    <strong className="blue-text"> Parcelas: </strong>
                                    <strong className="orange-text"> { paymentData.paymentInfo.id } </strong>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="background-div">
                                    <strong className="blue-text"> Valor Desejado: </strong>
                                    <strong className="green-text"> { `R$ ${paymentData.loanValue.toFixed(2)}` } </strong>
                                </div>
                            </td>
                            <td>
                                <div className="background-div">
                                    <strong className="blue-text"> Valor da Parcela: </strong>
                                    <strong className="green-text"> {`R$ ${((paymentData.loanValue + paymentData.loanValue * paymentData.paymentInfo.juros) / paymentData.paymentInfo.id).toFixed(2)}`} </strong>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <div className="background-div">
                                    <strong className="blue-text"> Valor Total do Empréstimo: </strong>
                                    <strong className="green-text"> {`R$ ${(paymentData.loanValue + paymentData.loanValue * paymentData.paymentInfo.juros).toFixed(2)}`} </strong>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Button variant="info"> Detalhe da Solicitação </Button>
                            </td>
                        </tr>
                        
                    </tbody>
                </Table>
            )
        }
    }
    
    nextStep = () => {
        const { next } = this.state;

        this.setState({ next: true })
    }

    handleClick = (event) => {
        const { paymentMethod } = this.state;

        this.setState({ paymentMethod: event.target.value })
    }

    render() {    

        return (
            <div className="wrap-fields">        
                { this.choosePayment() }
                { this.solicitationInfo() }
            </div>
        );
        }

}