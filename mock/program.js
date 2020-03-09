import Mock from 'mockjs'

const accessProgram = [
  {
    id: 1,
    code: 'SI-01',
    name: 'Sistemas de Informação',
    status: 'ativo'
  },
  {
    id: 2,
    code: 'TUR-01',
    name: 'Turismo',
    status: 'ativo'
  }
]

export default [
  {
    url: '/program',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessProgram
      }
    }
  },
  {
    url: '/program',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  {
    url: '/program/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/program/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/program/space/[A-Za-z0-9]',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessProgram
      }
    }
  },
  {
    url: '/program/enable',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessProgram
      }
    }
  }

]
