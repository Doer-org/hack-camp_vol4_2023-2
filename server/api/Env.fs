module Env

type IEnv =
    abstract member ENVIRONMENT: string
    abstract member DB_HOST: string
    abstract member DB_USER: string
    abstract member DB_PASSWORD: string
    abstract member DB_DATABASE: string
    abstract member CLIENT_URL: string
    abstract member AUTH0_DOMAIN: string
    abstract member AUTH0_AUDIENCE: string
    abstract member AUTH0_JWKS: string
