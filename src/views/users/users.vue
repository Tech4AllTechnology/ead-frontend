<template>
  <div class="app-container">
    <el-button v-permission="['teste']" type="primary" @click="handleaddUser">
      {{ $t('users.addUser') }}
    </el-button>

    <el-table :data="usersList" style="width: 100%;margin-top:30px;" border>
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
        <el-form-item label="Status" prop="status">
          <el-select ref="status" v-model="user.status" required>
            <el-option value="1" label="Ativo" selected>Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tipo" prop="type">
          <el-select v-model="user.user_type" required>
            <el-option
                    v-for="item in rolesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Matricula" prop="application" v-if="dialogType === 'edit'">
          <el-input disabled v-model.number="user.application" placeholder="Matricula" required/>
        </el-form-item>

        <el-form-item label="Estado Civil" prop="marital_status">
          <el-select ref="marital_status" v-model="user.marital_status" required>
            <el-option value="SOLTEIRO" label="Solteiro(a)" selected>Solteiro(a)</el-option>
            <el-option value="CASADO" label="Casado(a)">Casado(a)</el-option>
            <el-option value="VIUVO" label="Viuvo(a)">Viuvo(a)</el-option>
            <el-option value="DIVORCIADO" label="Divorciado(a)">Divorciado(a)</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Nivel de escolaridade" prop="scholarship_level">
          <el-select ref="scholarship_level" v-model="user.scholarship_level" required>
            <el-option value="FUNDAMENTAL_NAO_COMPLETO" label="Fundamental Não Completo" selected>Fundamental Não
              Completo
            </el-option>
            <el-option value="FUNDAMENTAL_COMPLETO" label="Fundamental Completo">Fundamental Completo</el-option>
            <el-option value="MEDIO_NAO_COMPLETO" label="Médio Não Completo">Médio Não Completo</el-option>
            <el-option value="MEDIO_COMPLETO" label="Médio Completo">Médio Completo</el-option>
            <el-option value="TECNICO_NAO_COMPLETO" label="Técnico Não Completo">Técnico Não Completo</el-option>
            <el-option value="TECNICO_COMPLETO" label="Técnico Completo">Técnico Completo</el-option>
            <el-option value="SUPERIOR_NAO_COMPLETO" label="Superior Não Completo">Superior Não Completo</el-option>
            <el-option value="SUPERIOR_COMPLETO" label="Superior Completo">Superior Completo</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Data de Conclusão" prop="scholarship_conclusion_date">
          <el-date-picker
                  v-model="user.scholarship_conclusion_date"
                  type="date"
                  placeholder="Selecione a data de Conclusão da escolaridade"
                  value-format="yyyy-MM-dd"
                  format="dd/MM/yyyy"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Última instituição" prop="latest_school">
          <el-input v-model="user.latest_school" placeholder="Última instituição" required/>
        </el-form-item>

        <el-form-item label="Titulo de Eleitor" prop="voter_id_number">
          <el-input v-model="user.voter_id_number" placeholder="Titulo de Eleitor" required/>
        </el-form-item>
        <el-form-item label="Zona de Eleitorado" prop="voter_id_zone">
          <el-input v-model="user.voter_id_zone" placeholder="Zona de Eleitorado" required/>
        </el-form-item>
        <el-form-item label="Seção de Eleitorado" prop="voter_id_section">
          <el-input v-model="user.voter_id_section" placeholder="Seção de Eleitorado" required/>
        </el-form-item>

        <el-form-item label="Estado" prop="state">
          <el-select v-model="user.state" required>
            <el-option
              v-for="item in stateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
        <el-form-item label="Data de Nascimento" prop="birthday">
          <el-date-picker
                  v-model="user.birthday"
                  type="date"
                  placeholder="Selecione a data de Nascimento"
                  value-format="yyyy-MM-dd"
                  format="dd/MM/yyyy"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Nome da Mãe" prop="mother_name">
          <el-input v-model="user.mother_name" placeholder="Nome da Mãe" required/>
        </el-form-item>
        <el-form-item label="Nome da Pai" prop="father_name">
          <el-input v-model="user.father_name" placeholder="Nome da Pai" required/>
        </el-form-item>
        <el-form-item label="Profissão" prop="profession">
          <el-input v-model="user.profession" placeholder="Profissão" required/>
        </el-form-item>

        <el-form-item label="Numero da Identidade" prop="identity_number">
          <el-input v-model="user.identity_number" placeholder="Numero da Identidade" required/>
        </el-form-item>
        <el-form-item label="Emissor" prop="issuing_authority">
          <el-input v-model="user.issuing_authority" placeholder="Emissor" required/>
        </el-form-item>
        <el-form-item label="Data de Emissão" prop="issuing_date">
          <el-date-picker
                  v-model="user.issuing_date"
                  type="date"
                  placeholder="Selecione a data de Emissão"
                  value-format="yyyy-MM-dd"
                  format="dd/MM/yyyy"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Estado da Identidade" prop="issuing_id_state">
          <el-select v-model="user.issuing_id_state" required>
            <el-option
                    v-for="item in stateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            />
          </el-select>
        </el-form-item>


        <el-form-item label="CPF" prop="cpf">
          <el-input v-model="user.cpf" placeholder="CPF" required/>
        </el-form-item>
        <el-form-item label="Nacionalidade" prop="nacionalidade">
          <el-select v-model="user.naturalness_country" required>
            <el-option
                    v-for="item in countriesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Estado de Nascimento" prop="naturalness_state">
          <el-select v-model="user.naturalness_state" required>
            <el-option
                    v-for="item in stateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Facebook" prop="facebook_link">
          <el-input v-model="user.facebook_link" placeholder="Titulo de Eleitor" required/>
        </el-form-item>
        <el-form-item label="Instagram" prop="instagram_link">
          <el-input v-model="user.instagram_link" placeholder="Zona de Eleitorado" required/>
        </el-form-item>
        <el-form-item label="Whatsapp" prop="whatsapp_number">
          <el-input v-model="user.whatsapp_number" placeholder="Seção de Eleitorado" required/>
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
import {getUsers, addUser, deleteUser, updateUser, getRoleUsers} from '@/api/user'
import { getStates } from '@/api/state'
import { validUsername } from '@/utils/validate'
import {permission} from '@/directive/permission/index.js'
import {checkPermission} from '@/utils/permission'
import store from '@/store'
import {getCountries} from '@/api/country'

const defaultUser = {
    id: '',
    name: '',
    email: '',
    application: '',
    status: '',
    birthday: '',
    mother_name: '',
    father_name: '',
    profession: '',
    identity_number: '',
    issuing_authority: '',
    issuing_date: '',
    issuing_id_state: '',
    marital_status: '',
    cpf: '',
    scholarship_level: '',
    scholarship_conclusion_date: '',
    latest_school: '',
    voter_id_number: '',
    voter_id_zone: '',
    voter_id_section: '',
    facebook_link: '',
    instagram_link: '',
    whatsapp_number: '',
    naturalness_country: '',
    naturalness_state: '',
    voter_id_state: '',
    user_type: ''

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
        rolesList: [],
        countriesList: [],
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
          //type: [{ required: true, trigger: 'blur', validator: validateType }],
        status: [{ required: true, trigger: 'blur', validator: validateStatus }],
        name: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        city: [{ required: true, trigger: 'blur', validator: validateEmpty }],
          //state: [{ required: true, trigger: 'blur', validator: validateState }],
        number: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        street: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        neighborhood: [{ required: true, trigger: 'blur', validator: validateEmpty }],
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
      this.getRoles()
      this.getCountries()
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
      async getRoles() {
          const roles = await getRoleUsers()
          this.rolesList = roles.data
      },
      async getCountries() {
          const countries = await getCountries()
          this.countriesList = countries.data
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
