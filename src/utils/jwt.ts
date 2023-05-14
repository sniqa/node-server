import { createSigner, createVerifier } from 'fast-jwt'

const SECERT = 'SECERT'

export const signSync = createSigner({ key: SECERT })

export const verifier = createVerifier({ key: SECERT })
