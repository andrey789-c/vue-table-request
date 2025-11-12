export interface IOption {
  label: string
  value: string
}

export interface IProduct {
  id: number
  name: string
  quantity: string
  price: string
  model: string
  options: IOption[]
}

export interface IRequest {
  id: number
  name: string
  status: string
  result: string
  date: string
}

export interface IError {
  model: boolean
  quantity: boolean
  price: boolean
}