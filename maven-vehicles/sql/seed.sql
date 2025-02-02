-- Inserindo veículos genéricos
INSERT INTO veiculos (id, modelo, fabricante, preco, ano, tipo_veiculo)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'Civic', 'Honda', 120000.00, 2022, 'CARRO'),
    ('22222222-2222-2222-2222-222222222222', 'Gol', 'Volkswagen', 45000.00, 2019, 'CARRO'),
    ('33333333-3333-3333-3333-333333333333', 'Fazer 250', 'Yamaha', 18000.00, 2021, 'MOTO');

-- Inserindo dados específicos de carro
INSERT INTO carro (veiculo_id, quantidade_portas, tipo_combustivel)
VALUES
    ('11111111-1111-1111-1111-111111111111', '4', 'Gasolina'),
    ('22222222-2222-2222-2222-222222222222', '4', 'Flex');

-- Inserindo dados específicos de moto
INSERT INTO moto (veiculo_id, cilindrada)
VALUES
    ('33333333-3333-3333-3333-333333333333', 250);
