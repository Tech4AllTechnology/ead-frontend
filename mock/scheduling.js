import Mock from 'mockjs'

const accessSchedulers = [
  {
    id: 1,
    status: 'Negado',
    classes: {
      id: '1',
      name: 'Projeto Final'
    },
    space: {
      id: '1',
      name: 'Sala 1'
    },
    it_responsable: {
      id: '',
      name: ''
    },
    professor: {
      id: '1',
      name: 'André Lucio'
    },
    scheduler: {
      id: '1',
      name: 'André Lucio'
    },
    initialtime: '2019-01-30',
    endtime: '2019-06-30',
    initialdate: '08:30',
    enddate: '10:00'
  },
  {
    id: 1,
    status: 'Aceito',
    classes: {
      id: '1',
      name: 'Projeto Final'
    },
    space: {
      id: '1',
      name: 'Sala 1'
    },
    it_responsable: {
      id: '',
      name: ''
    },
    professor: {
      id: '2',
      name: 'Claudio Fico'
    },
    scheduler: {
      id: '1',
      name: 'André Lucio'
    },
    filterdate: [
      '2019-12-24', '2019-12-27'
    ],
    initialtime: '2019-01-30',
    endtime: '2019-06-30',
    initialdate: '08:30',
    enddate: '10:00'
  },
  {
    id: 1,
    status: 'Esperando resposta do agendamento',
    classes: {
      id: '1',
      name: 'Engenharia de Software'
    },
    space: {
      id: '1',
      name: 'Sala 2'
    },
    it_responsable: {
      id: '',
      name: ''
    },
    professor: {
      id: '2',
      name: 'Claudio Ribeiro'
    },
    scheduler: {
      id: '1',
      name: 'André Lucio'
    },
    filterdate: [
      '2019-12-24', '2019-12-27'
    ],
    initialtime: '2019-01-30',
    endtime: '2019-06-30',
    initialdate: '08:30',
    enddate: '10:00'
  }
]

export default [
  {
    url: '/scheduler',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessSchedulers
      }
    }
  },
  {
    url: '/scheduler',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  {
    url: '/scheduler/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/scheduler/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }

]
