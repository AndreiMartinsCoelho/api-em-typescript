import mongoose, { Document, Schema } from 'mongoose';

export interface DadosEspeciais {
  cpf: string
  data_nascimento: Date
  idade: number
  sexo: string
}

export interface users extends Document {
  nome: string
  email: string
  senha: string
  dados_especiais: DadosEspeciais
}

const DadosEspeciaisSchema: Schema = new Schema(
  {
    cpf: { type: String, required: true },
    data_nascimento: { type: Date, required: true },
    idade: { type: Number, required: true },
    sexo: { type: String, required: true }
  },
  { _id: false }
)

const UsersSchema: Schema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  dados_especiais: { type: DadosEspeciaisSchema, required: true },
}, { versionKey: false })

export default mongoose.model<users>('users', UsersSchema)
