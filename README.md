# Thesis Manager

Aplicação para gerenciamento centralizado de informações acadêmicas, incluindo cursos, professores, alunos, unidades acadêmicas, departamentos e teses.

## Visão Geral

Thesis Manager é um sistema integrado que fornece uma plataforma unificada para instituições acadêmicas gerenciarem seus dados estruturados. O sistema é composto por um backend robusto em Django e uma interface web moderna construída com Angular.

> [!TIP]
> Este projeto segue uma arquitetura de microsserviços com separação clara entre frontend e backend, facilitando manutenção, escalabilidade e testes independentes.

## Tecnologias

### Backend
- Python 3.x
- Django
- Django REST Framework
- Docker

### Frontend
- Angular
- TypeScript
- Tailwind CSS
- PostCSS

## Estrutura do Projeto

```
thesis-manager/
├── backend/                 # Aplicação Django
│   ├── tcc_project/        # Configurações principais
│   ├── core/               # Aplicação principal com modelos
│   ├── requirements.txt    # Dependências Python
│   └── Dockerfile          # Containerização backend
├── web/                     # Aplicação Angular
│   ├── src/                # Código-fonte
│   │   ├── app/            # Componentes e serviços
│   │   └── environments/   # Configurações de ambiente
│   ├── package.json        # Dependências Node.js
│   ├── tailwind.config.js  # Configuração de estilos
│   └── Dockerfile          # Containerização frontend
└── README.md               # Este arquivo
```

## Pré-requisitos

### Para Desenvolvimento Local
- Python 3.x
- Node.js 18+
- npm ou yarn
- Docker (opcional)

### Variáveis de Ambiente
Consulte os arquivos `environment.ts` (frontend) e `settings.py` (backend) para configurações específicas.

## Instalação e Execução

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

> [!TIP] 
> O servidor estará disponível em `http://localhost:8000`.

### Frontend

```bash
cd web
npm install
ng serve
```

A aplicação estará disponível em `http://localhost:4200`.

### Com Docker

```bash
docker-compose up
```

Ambos os serviços serão inicializados e acessíveis conforme configurado.

## Funcionalidades Principais

- Gerenciamento de unidades acadêmicas
- Gestão de departamentos
- Cadastro e administração de cursos
- Perfil de professores
- Registro de alunos
- Rastreamento de teses e trabalhos acadêmicos
- Dashboard centralizado

## Autores

- [Frederico Maia Estrella](https://github.com/FredMaia)
- [Gabriel Coelho Costa](https://github.com/gabrielzinCoelho)
- [Otávio Sbampato](https://github.com/otaviosbampato)
