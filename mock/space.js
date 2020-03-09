import Mock from 'mockjs'

const accessSpaces = [
  {
    id: 1,
    name: 'Sala 1',
    status: 1,
    type: 'ROOM',
    smartBoard: '0',
    board: '0',
    numberPc: '0',
    numberChair: 15,
    project: '0'
  },
  {
    id: 2,
    name: 'Sala 2',
    status: 1,
    type: 'LAB',
    smartBoard: '0',
    board: '0',
    numberPc: '0',
    numberChair: 15,
    project: '0'
  }
]

export default [
  {
    url: '/space',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessSpaces
      }
    }
  },
  {
    url: '/space',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  {
    url: '/space/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/space/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }

]
