<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddUser">
      {{ $t('users.addUser') }}
    </el-button>

    <el-table :data="usersList" border>
      <el-table-column label="Nome" align="center" fixed>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Nome: {{ scope.row.name }}</p>
            <p>Matricula: {{ scope.row.application }}</p>
            <p>Telefone: {{ scope.row.telephone }}</p>
            <p>Cidade: {{ scope.row.city }}</p>
            <p>Bairro: {{ scope.row.neighborhood }}</p>
            <p>Rua: {{ scope.row.street }}</p>
            <p>Numero: {{ scope.row.number }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.name }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="E-mail" align="center" fixed>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Nome: {{ scope.row.name }}</p>
            <p>Matricula: {{ scope.row.application }}</p>
            <p>Telefone: {{ scope.row.telephone }}</p>
            <p>Cidade: {{ scope.row.city }}</p>
            <p>Bairro: {{ scope.row.neighborhood }}</p>
            <p>Rua: {{ scope.row.street }}</p>
            <p>Numero: {{ scope.row.number }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.email }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Status" align="center" fixed>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Nome: {{ scope.row.name }}</p>
            <p>Matricula: {{ scope.row.application }}</p>
            <p>Telefone: {{ scope.row.telephone }}</p>
            <p>Cidade: {{ scope.row.city }}</p>
            <p>Bairro: {{ scope.row.neighborhood }}</p>
            <p>Rua: {{ scope.row.street }}</p>
            <p>Numero: {{ scope.row.number }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.status }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Tipo" align="center" fixed>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Nome: {{ scope.row.name }}</p>
            <p>Matricula: {{ scope.row.application }}</p>
            <p>Telefone: {{ scope.row.telephone }}</p>
            <p>Cidade: {{ scope.row.city }}</p>
            <p>Bairro: {{ scope.row.neighborhood }}</p>
            <p>Rua: {{ scope.row.street }}</p>
            <p>Numero: {{ scope.row.number }}</p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.type }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operações" fixed>
        <template slot-scope="scope">
          <!--v-permission="['ASSISTENT']" v-if="checkPermission(['ADMINISTRATOR'])-->
          <el-button
            v-if="scope.row.status == 'ativo'"
            type="primary"
            size="small"
            @click="enableDisable(scope, 0)"
          >
            {{ $t('software.disable') }}
          </el-button>
          <el-button
            v-if="scope.row.status == 'inativo'"
            type="primary"
            size="small"
            @click="enableDisable(scope, 1)"
          >
            {{ $t('software.enable') }}
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('users.editUser') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('users.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Editar Usuário':'Novo Usuário'">
      <el-form ref="user" status-icon :model="user" :rules="userRules" label-width="80px" label-position="left">
        <el-form-item label="Nome" prop="name">
          <el-input ref="name" v-model="user.name" placeholder="Nome" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input ref="email" v-model="user.email" placeholder="User Email" required type="e-mail" />
        </el-form-item>
        <el-form-item label="Senha" prop="password">
          <el-input ref="password" v-model="user.password" placeholder="Senha do Usuário" required show-password type="password" />
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select ref="status" v-model="user.status" required>
            <el-option value="1" label="Ativo" selected>Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tipo" prop="type">
          <el-select v-model="user.type" required>
            <el-option value="ADMINISTRATOR" label="Admin" selected>Admin</el-option>
            <el-option value="PROFESSOR" label="Professor">Professor</el-option>
            <el-option value="IT_SUPPORT" label="TI">TI</el-option>
            <el-option value="ASSISTANT" label="Auxiliar">Auxiliar</el-option>
            <el-option value="STUDENT" label="Aluno">Aluno</el-option>
            <el-option value="MANAGER" label="Gerenciador">Gerenciador</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Matricula" prop="application">
          <el-input v-model.number="user.application" placeholder="Matricula" required />
        </el-form-item>
        <el-form-item label="Estado" prop="state">
          <el-select v-model="user.state" required>
            <el-option
              v-for="item in stateList"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Cidade" prop="city">
          <el-input v-model="user.city" placeholder="City" required />
        </el-form-item>
        <el-form-item label="Bairro" prop="neighborhood">
          <el-input v-model="user.neighborhood" placeholder="Neighborhood" required />
        </el-form-item>
        <el-form-item label="Rua" prop="street">
          <el-input v-model="user.street" placeholder="Street" required />
        </el-form-item>
        <el-form-item label="Número" prop="number">
          <el-input-number v-model="user.number" :min="0" placeholder="Number" required />
        </el-form-item>
        <el-form-item label="Telefone">
          <el-input v-model.number="user.telephone" type="telephone" placeholder="Telephone Number" required />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('users.cancel') }}
        </el-button>
        <el-button type="primary" :loading="loading" @click.native.prevent="confirmRole">
          {{ $t('users.confirm') }}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getUsers, addUser, deleteUser, updateUser } from '@/api/user'
import { getStates } from '@/api/state'
import { validUsername } from '@/utils/validate'
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import store from '@/store'

const defaultUser = {
  id: '',
  type: '',
  email: '',
  status: '',
  name: '',
  city: '',
  state: '',
  number: '',
  telephone: '',
  password: '',
  neighborhood: '',
  street: '',
  application: ''
}

const types = {
  ADMINISTRATOR: 'Admin',
  PROFESSOR: 'Professor',
  IT_SUPPORT: 'TI',
  ASSISTANT: 'Auxiliar',
  STUDENT: 'Aluno',
  MANAGER: 'Gerenciador'
}

const sendTypes = {
  'Admin': 'ADMINISTRATOR',
  'Professor': 'PROFESSOR',
  'TI': 'IT_SUPPORT',
  'Auxiliar': 'ASSISTANT',
  'Aluno': 'STUDENT',
  'Gerenciador': 'MANAGER'
}

const status = {
  1: 'Ativo',
  0: 'Inativo'
}

const sendStatus = {
  'Ativo': 1,
  'Inativo': 0
}
export default {
  directives: { permission },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('E-mail inválido.'))
      } else {
        if (this.checkIfEmailExists(value, this.user.id)) {
          callback(new Error('Já existe um usuário cadastrado com esse e-mail.'))
        } else {
          callback()
        }
      }
    }
    const validateApplication = (rule, value, callback) => {
      if (this.checkIfApplicationExists(value, this.user.id)) {
        callback(new Error('Já existe um usuário cadastrado com essa matricula.'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('A senha não pode ter menos de 6 digitos.'))
      } else {
        callback()
      }
    }
    const validateStatus = (rule, value, callback) => {
      var status_validate = [1, 0, '1', '0', 'Ativo', 'Inativo']
      if (status_validate.includes(value)) {
        callback()
      } else {
        callback(new Error('Selecione um status válido.'))
      }
    }
    const validateType = (rule, value, callback) => {
      if (this.typesList[value] || this.sendTypesList[value]) {
        callback()
      } else {
        callback(new Error('Selecione um tipo válido.'))
      }
    }
    const validateState = (rule, value, callback) => {
      if (!this.stateList[value]) {
        callback(new Error('Selecione um estado válido.'))
      } else {
        callback()
      }
    }
    const validateEmpty = (rule, value, callback) => {
      if (!value) {
        callback(new Error('O campo não pode ser vazio.'))
      } else {
        callback()
      }
    }
    return {
      formReady: false,
      loading: false,
      dialogVisible: false,
      dialogTelephone: false,
      dialogType: 'new',
      checkStrictly: false,
      usersList: [],
      stateList: [],
      typesList: Object.assign({}, types),
      statusList: Object.assign({}, status),
      sendTypesList: Object.assign({}, sendTypes),
      sendStatusList: Object.assign({}, sendStatus),
      user: {
        id: '',
        type: '',
        email: '',
        status: '',
        name: '',
        city: '',
        state: '',
        number: '',
        telephone: '',
        password: '',
        neighborhood: '',
        street: '',
        application: ''
      },
      userRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        type: [{ required: true, trigger: 'blur', validator: validateType }],
        status: [{ required: true, trigger: 'blur', validator: validateStatus }],
        name: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        city: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        state: [{ required: true, trigger: 'blur', validator: validateState }],
        number: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        street: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        neighborhood: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        application: [{ required: true, trigger: 'blur', validator: validateApplication }]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getUsers()
    this.getStates()
  },
  methods: {
    checkPermission,
    closeDialog() {
      this.$refs.user.resetFields()
      this.dialogVisible = false
    },
    async getUsers() {
      const res = await getUsers()
      this.usersList = this.changeType(res.data)
    },
    async getStates() {
      const sta = await getStates()
      this.stateList = sta.data
    },
    handleaddUser() {
      this.user = Object.assign({}, defaultUser)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.user = deepClone(scope.row)
    },

    handleTelephone(scope) {
      this.dialogType = 'edit'
      this.dialogTelephone = true
      this.checkStrictly = true
      this.user = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('Deseja remover o usuário?', 'Aviso', {
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      })
        .then(async() => {
          await deleteUser(row.id)
          this.usersList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Usuário removido com sucesso!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    enableDisable(scope, status) {
      this.dialogType = 'edit'
      this.user = deepClone(scope.row)
      this.user.status = status
      this.confirmRole()
    },
    confirmRole() {
      this.$refs.user.validate(valid => {
        const isEdit = this.dialogType === 'edit'
        if (valid) {
          this.formReady = true
          this.loading = true
          if (isEdit) {
            new Promise((resolve, reject) => {
              updateUser(this.user.id, this.changeSendType(this.user)).then(response => {
                for (let index = 0; index < this.usersList.length; index++) {
                  if (this.usersList[index].id === this.user.id) {
                    this.usersList.splice(index, 1, Object.assign({}, this.changeType(this.user)))
                  }
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          } else {
            new Promise((resolve, reject) => {
              addUser(this.changeSendType(this.user)).then(response => {
                const { data } = response
                this.user.id = data.key
                this.usersList.push(this.changeType(this.user))
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }
          this.loading = false
          this.formReady = false

          const { name } = this.user
          this.dialogVisible = false
          this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `
            <div>Usuário: ${name}</div>
          `,
            type: 'success'
          })
        } else {
          this.formReady = false
          this.loading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    changeType(users) {
      if (Array.isArray(users)) {
        for (let index = 0; index < users.length; index++) {
          if (this.typesList[users[index].type]) {
            users[index].type = this.typesList[users[index].type]
          }
          if (this.statusList[users[index].status]) {
            users[index].status = this.statusList[users[index].status]
          }
        }
        return users
      }
      if (this.typesList[users.type]) {
        users.type = this.typesList[users.type]
      }
      if (this.statusList[users.status]) {
        users.status = this.statusList[users.status]
      }
      return users
    },
    changeSendType(user) {
      if (this.sendTypesList[user.type]) {
        user.type = this.sendTypesList[user.type]
      }
      if (this.sendStatusList[user.status] || user.status == 'Inativo') {
        user.status = this.sendStatusList[user.status]
      }
      return user
    },
    checkIfEmailExists(email, user_id) {
      for (let index = 0; index < this.usersList.length; index++) {
        // eslint-disable-next-line eqeqeq
        if (this.usersList[index].email == email && this.usersList[index].id != user_id) {
          return true
        }
      }
      return false
    },
    checkIfApplicationExists(application, user_id) {
      for (let index = 0; index < this.usersList.length; index++) {
        // eslint-disable-next-line eqeqeq
        if (this.usersList[index].application == application && this.usersList[index].id != user_id) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
    .app-container {
        .roles-table {
            margin-top: 30px;
        }
        .permission-tree {
            margin-bottom: 30px;
        }
    }
</style>
