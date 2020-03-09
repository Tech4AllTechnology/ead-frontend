import Mock from 'mockjs'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  'admin@admin.com': {
    token: 'admin-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const accessUsers = [
  {
    id: 1,
    type: 'ADMINISTRATOR',
    email: 'matheus.tere7@gmail.com',
    status: 0,
    name: 'Anthony Rodrigues',
    city: 'Rio de Janeiro',
    state: '1',
    number: '20',
    telephone: '21',
    password: '123456',
    neighborhood: 'teste',
    street: 'Rua teste'
  },
  {
    id: 2,
    type: 'ADMINISTRATOR',
    email: 'cabral@gmail.com',
    status: 0,
    name: 'Tiago Cabral',
    city: 'Rio de Janeiro',
    state: '1',
    number: '20',
    telephone: '21',
    password: '123456',
    neighborhood: 'teste',
    street: 'Rua teste'
  }
]

const masterUsers = [
  {
    id: 1,
    name: 'Master 1'
  },
  {
    id: 2,
    name: 'Master 2'
  }
]

const states = [
  {
    ID: 1,
    Initials: 'AC',
    Name: 'Acre'
  },
  {
    ID: 2,
    Initials: 'AL',
    Name: 'Alagoas'
  },
  {
    ID: 3,
    Initials: 'AM',
    Name: 'Amazonas'
  },
  {
    ID: 4,
    Initials: 'AP',
    Name: 'Amapá'
  },
  {
    ID: 5,
    Initials: 'BA',
    Name: 'Bahia'
  },
  {
    ID: 6,
    Initials: 'CE',
    Name: 'Ceará'
  },
  {
    ID: 7,
    Initials: 'DF',
    Name: 'Distrito Federal'
  },
  {
    ID: 8,
    Initials: 'ES',
    Name: 'Espírito Santo'
  },
  {
    ID: 9,
    Initials: 'GO',
    Name: 'Goiás'
  },
  {
    ID: 10,
    Initials: 'MA',
    Name: 'Maranhão'
  },
  {
    ID: 11,
    Initials: 'MG',
    Name: 'Minas Gerais'
  },
  {
    ID: 12,
    Initials: 'MS',
    Name: 'Mato Grosso do Sul'
  },
  {
    ID: 13,
    Initials: 'MT',
    Name: 'Mato Grosso'
  },
  {
    ID: 14,
    Initials: 'PA',
    Name: 'Pará'
  },
  {
    ID: 15,
    Initials: 'PB',
    Name: 'Paraíba'
  },
  {
    ID: 16,
    Initials: 'PE',
    Name: 'Pernambuco'
  },
  {
    ID: 17,
    Initials: 'PI',
    Name: 'Piauí'
  },
  {
    ID: 18,
    Initials: 'PR',
    Name: 'Paraná'
  },
  {
    ID: 19,
    Initials: 'RJ',
    Name: 'Rio de Janeiro'
  },
  {
    ID: 20,
    Initials: 'RN',
    Name: 'Rio Grande do Norte'
  },
  {
    ID: 21,
    Initials: 'RO',
    Name: 'Rondônia'
  },
  {
    ID: 22,
    Initials: 'RR',
    Name: 'Roraima'
  },
  {
    ID: 23,
    Initials: 'RS',
    Name: 'Rio Grande do Sul'
  },
  {
    ID: 24,
    Initials: 'SC',
    Name: 'Santa Catarina'
  },
  {
    ID: 25,
    Initials: 'SE',
    Name: 'Sergipe'
  },
  {
    ID: 26,
    Initials: 'SP',
    Name: 'São Paulo'
  },
  {
    ID: 27,
    Initials: 'TO',
    Name: 'Tocantins'
  }
]

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/user',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessUsers
      }
    }
  },
  {
    url: '/user',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  {
    url: '/user/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/state',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: states
      }
    }
  },
  {
    url: '/user/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/users',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: masterUsers
      }
    }
  }

]
