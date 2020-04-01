Descrição:
    
    Parte de um projeto cujo objetivo tem como pesquisar um cliente, calcular taxas de emprestimo, comissões e baseadas no parcelamento e requisitar a solicitação para a pessoa desejada.


Fluxo:
    Path padrão "/" ou "/emprestimo/simular-emprestimo" -> vai direcionar diretamente para simulação de empréstimos, com taxas e informações sobre o parcelamento, calcule, selecione uma parcela da tabela, irá trazer os dados, clique avançar.
        arquivo: src/pages/loan-simulator
    
    Path "/emprestimo/pesquisar-clientes" -> pesquisa um CPF válido e retorna resposta com informações do cliente, selecione solicitar.
        arquivo: src/pages/client-search
    
    Path "/emprestimo/metodo-de-emprestimo/" -> Pega uma modalidade, imprime informações adicionais sobre o cliente e faz a conclusão, mostrando todos os dados no final
        arquivo: src/pages/loan-method
    
Base de dados utilizada para pegar as informações:
    JSON-Server

Dependencias:

    -Font Awesome
    -Input-Text-Mask
    -Text-Mask-Addons
    -Axios
    -Bootstrap
    -React


    "@fortawesome/fontawesome-svg-core": "^1.2.28",
    "@fortawesome/free-solid-svg-icons": "^5.13.0",
    "@fortawesome/react-fontawesome": "^0.1.9",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "axios": "^0.19.2",
    "bootstrap": "^4.4.1",
    "react": "^16.13.1",
    "react-bootstrap": "^1.0.0",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.1",
    "react-text-mask": "^5.4.3",
    "text-mask-addons": "^3.8.0"

Inicializar:

    Para inicializar, usar o comando abaixo:

        npm start
