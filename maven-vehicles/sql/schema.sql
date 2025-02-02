-- Criação da tabela veiculos
CREATE TABLE veiculos (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    modelo VARCHAR(20) NOT NULL,
    fabricante VARCHAR(20) NOT NULL,
    preco NUMERIC(13, 2) NOT NULL,
    ano SMALLINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    tipo_veiculo VARCHAR(5) NOT NULL,
    CONSTRAINT veiculos_pkey PRIMARY KEY (id),
    CONSTRAINT chk_tipo_veiculo CHECK (tipo_veiculo IN ('CARRO', 'MOTO'))
);

-- Criação da tabela moto (Herda de veiculos)
CREATE TABLE moto (
    veiculo_id UUID NOT NULL,
    cilindrada SMALLINT NOT NULL,
    CONSTRAINT moto_pkey PRIMARY KEY (veiculo_id),
    CONSTRAINT fk_moto_veiculo FOREIGN KEY (veiculo_id) REFERENCES public.veiculos(id) ON DELETE CASCADE
);

-- Criação da tabela carro (Herda de veiculos)
CREATE TABLE carro (
    veiculo_id UUID NOT NULL,
    quantidade_portas VARCHAR(1) NOT NULL,
    tipo_combustivel VARCHAR(20) NOT NULL,
    CONSTRAINT carro_pkey PRIMARY KEY (veiculo_id),
    CONSTRAINT fk_carro_veiculo FOREIGN KEY (veiculo_id) REFERENCES public.veiculos(id) ON DELETE CASCADE
);
