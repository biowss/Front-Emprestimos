import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

import api from "../../services/api";
import CurrencyInput from './CurrencyInput'

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


export default class LoanSimulator extends Component {
    state = {
        feesTable: [],
        paymentData: {},
        loanValue: 0,    
        isInputValid: false
    };

    componentDidMount() {
        this.loadFees();
    }

    loadFees = async () => {    
        const apiResponse = await api.get(`/defaultFees/`);

        if(apiResponse.status === 200) { 
            const feesTable = apiResponse.data;

            this.setState({ feesTable }); 
        }
        else {
            console.log("Banco de Dados Offline!");
        }     
    };

    validateInput = () => {
        const { loanValue } = this.state;

        if (loanValue < 300 || loanValue > 10000) {
            alert("Solicitação deve ser entre 300,00 e 10.000,00.");
        }
        else{
            this.setState({ isInputValid: true })            
        }
    }

    printTable = () => {
        const { feesTable, loanValue, isInputValid } = this.state
        if(isInputValid === true)
        return (
            <div className="table-of-fees">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th colSpan="5"> <h2> Tabela Padrão </h2></th>
                        </tr>
                        <tr>
                            <th> Parcela </th>
                            <th> Juros da Parcela </th>
                            <th> Valor Parcela </th>
                            <th> Valor Total </th>
                            <th> Comissão Parceiro </th>
                        </tr>
                    </thead>
                    <tbody>
                        {feesTable.map((fees,index) => (             
                            <tr key={index} onClick={ this.selectPayment.bind(this, fees) }>
                                <td> {fees.id}  </td>
                                <td> {fees.juros * 100}% </td>
                                <td> R$ { ((loanValue + loanValue * fees.juros) / fees.id).toFixed(2) } </td>
                                <td> R$ { (loanValue + loanValue * fees.juros).toFixed(2) } </td>
                                <td> R$ { (fees.comissao).toFixed(2) } </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>                
            </div> 
        )
    }

    selectPayment = async (paymentInfo) => {
        const {loanValue} = this.state;

        await this.setState({ paymentData: {loanValue, paymentInfo} });
    }

    handleInput = (event) => {
        let inputValue = event.target.value;

        inputValue = inputValue.substr(3);
        inputValue = inputValue.replace(".", "");
        inputValue = inputValue.replace(",", ".");

        inputValue = parseFloat(inputValue)

        this.setState({ loanValue: inputValue });
    };

    printFooter = () => {
        const {paymentData} = this.state;

        if(paymentData.paymentInfo !== undefined) {

            const parcelas = paymentData.paymentInfo.id;
            const valorParcelas = (paymentData.loanValue + paymentData.loanValue*paymentData.paymentInfo.juros) / parcelas;

            return (
                <div className="footer">
                    <strong> Parcelas: {parcelas} </strong>
                    <strong> Valor da Parcela: RS {valorParcelas.toFixed(2)} </strong>
                    <Link className="btn" to={{
                        pathname: "/emprestimo/pesquisar-clientes",
                        state:{
                            paymentData
                        }
                    }}> Avançar </Link>
                </div>
            )
        }
    }

    render(){
        return (
            <div className="wrap-fields">
                <p> Valor Desejado </p>
                <InputGroup className="mb-3">
                    <CurrencyInput onChange={ this.handleInput } type="text" placeholder="R$ 0.00" />          
                    <InputGroup.Append>
                        <Button variant="info" onClick={ () => this.validateInput() }>Calcular</Button>
                    </InputGroup.Append>
                </InputGroup>
                { this.printTable() }
                { this.printFooter() }
                
            </div>
        );
    }
}