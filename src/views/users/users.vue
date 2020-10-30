<template>
  <div class="app-container">
      <el-button v-permission="['admin']" type="primary" @click="handleaddUser">
      {{ $t('users.addUser') }}
    </el-button>

    <el-table :data="usersList" style="width: 100%;margin-top:30px;" border>
      <el-table-column label="Nome" align="center" fixed >
        <template slot-scope="scope">
              {{ scope.row.name }}
        </template>
      </el-table-column>
    <el-table-column label="Matricula" align="center" fixed >
        <template slot-scope="scope">
            {{ scope.row.application }}
        </template>
    </el-table-column>
      <el-table-column label="E-mail" align="center" fixed >
        <template slot-scope="scope">
              {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Status" align="center" fixed width="100">
        <template slot-scope="scope">
              {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="Tipo" align="center" fixed width="150">
          <template slot-scope="scope">
              {{ scope.row.user_type }}
          </template>
      </el-table-column>
      <el-table-column align="center" label="Operações" fixed width="300">
        <template slot-scope="scope">
            <el-button v-if="scope.row.user_type == 'Aluno'" type="primary" size="small" @click="listUserCourse(scope)">
                {{ $t('users.ListCourse') }}
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
        <el-form ref="user" status-icon :model="user" :rules="userRules">

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="name" style="width: 50%">
                        <label style="display: block">Nome</label>
                        <el-input ref="name" v-model="user.name" required placeholder="Nome" style="width: 120%"/>
                    </el-form-item>

                    <el-form-item prop="application">
                        <label style="display: block">Matricula</label>
                        <el-input disabled v-model.number="user.application" placeholder="Matricula" required
                                  style="width: 120%"/>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="email" style="width: 50%">
                        <label style="display: block">E-mail</label>
                        <el-input ref="email" v-model="user.email" placeholder="User Email" required type="e-mail"
                                  style="width: 120%"/>
                    </el-form-item>


                    <el-form-item prop="birthday">
                        <label style="display: block">Data de Nascimento</label>

                        <el-date-picker style="width: 120%"
                                        v-model="user.birthday"
                                        type="date"
                                        placeholder="Selecione a data de Nascimento"
                                        value-format="yyyy-MM-dd"
                                        format="dd/MM/yyyy"
                        >
                        </el-date-picker>
                    </el-form-item>

                </div>
            </div>


            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="status" style="width: 50%">
                        <label style="display: block; text-align: center"> Status</label>
                        <el-select ref="status" v-model="user.status" required filterable style="width: 120%">
                            <el-option value="1" label="Ativo" selected>Ativo</el-option>
                            <el-option value="0" label="Inativo">Inativo</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="type">
                        <label style="display: block; text-align: center">Tipo</label>
                        <el-select v-model="user.type" filterable required style="width: 120%">
                            <el-option
                                    v-for="item in rolesList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="marital_status" style="width: 50%">
                        <label style="display: block; text-align: center">Estado Civil</label>
                        <el-select ref="marital_status" filterable v-model="user.marital_status" required
                                   style="width: 120%">
                            <el-option value="SOLTEIRO" label="Solteiro(a)" selected>Solteiro(a)</el-option>
                            <el-option value="CASADO" label="Casado(a)">Casado(a)</el-option>
                            <el-option value="VIUVO" label="Viuvo(a)">Viuvo(a)</el-option>
                            <el-option value="DIVORCIADO" label="Divorciado(a)">Divorciado(a)</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="scholarship_level">
                        <label style="display: block; text-align: center">Nivel de escolaridade</label>

                        <el-select ref="scholarship_level" v-model="user.scholarship_level" filterable required
                                   style="width: 120%">
                            <el-option value="FUNDAMENTAL_NAO_COMPLETO" label="Fundamental Não Completo" selected>
                                Fundamental Não
                                Completo
                            </el-option>
                            <el-option value="FUNDAMENTAL_COMPLETO" label="Fundamental Completo">Fundamental Completo
                            </el-option>
                            <el-option value="MEDIO_NAO_COMPLETO" label="Médio Não Completo">Médio Não Completo
                            </el-option>
                            <el-option value="MEDIO_COMPLETO" label="Médio Completo">Médio Completo</el-option>
                            <el-option value="TECNICO_NAO_COMPLETO" label="Técnico Não Completo">Técnico Não Completo
                            </el-option>
                            <el-option value="TECNICO_COMPLETO" label="Técnico Completo">Técnico Completo</el-option>
                            <el-option value="SUPERIOR_NAO_COMPLETO" label="Superior Não Completo">Superior Não
                                Completo
                            </el-option>
                            <el-option value="SUPERIOR_COMPLETO" label="Superior Completo">Superior Completo</el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="scholarship_conclusion_date" style="width: 50%">
                        <label style="display: block; text-align: center">Data de Conclusão</label>
                        <el-date-picker style="width: 120%"
                                        v-model="user.scholarship_conclusion_date"
                                        type="date"
                                        placeholder="Selecione a data de Conclusão da escolaridade"
                                        value-format="yyyy-MM-dd"
                                        format="dd/MM/yyyy"
                        >
                        </el-date-picker>
                    </el-form-item>


                    <el-form-item prop="latest_school">
                        <label style="display: block; text-align: center">Última instituição</label>
                        <el-input v-model="user.latest_school" placeholder="Última instituição" required
                                  style="width: 120%"/>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="identity_number" style="width: 50%">
                        <label style="display: block; text-align: center">Numero da Identidade</label>

                        <el-input v-model="user.identity_number" placeholder="Numero da Identidade" required
                                  style="width: 120%"/>
                    </el-form-item>

                    <el-form-item prop="issuing_authority">
                        <label style="display: block; text-align: center">Emissor da Identidade</label>
                        <el-input v-model="user.issuing_authority" placeholder="Emissor" required style="width: 120%"/>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="issuing_date" style="width: 50%">
                        <label style="display: block; text-align: center">Data de Emissão</label>
                        <el-date-picker style="width: 120%"
                                        v-model="user.issuing_date"
                                        type="date"
                                        placeholder="Selecione a data de Emissão"
                                        value-format="yyyy-MM-dd"
                                        format="dd/MM/yyyy"
                        >
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="issuing_id_state">
                        <label style="display: block; text-align: center">Estado da Identidade</label>
                        <el-select v-model="user.issuing_id_state" filterable required style="width: 120%">
                            <el-option
                                    v-for="item in stateList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">

                    <el-form-item prop="cpf" style="width: 50%">
                        <label style="display: block; text-align: center">CPF</label>
                        <el-input v-model="user.cpf" placeholder="CPF" required style="width: 120%"/>
                    </el-form-item>

                    <el-form-item prop="nacionalidade">
                        <label style="display: block; text-align: center">Nacionalidade</label>
                        <el-select v-model="user.naturalness_country" filterable required style="width: 120%">
                            <el-option
                                    v-for="item in countriesList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">

                    <el-form-item prop="profession" style="width: 50%">
                        <label style="display: block; text-align: center">Profissão</label>
                        <el-input v-model="user.profession" placeholder="Profissão" required style="width: 120%"/>
                    </el-form-item>

                    <el-form-item prop="naturalness_state">
                        <label style="display: block; text-align: center">Estado de Nascimento</label>
                        <el-select v-model="user.naturalness_state" filterable required style="width: 120%">
                            <el-option
                                    v-for="item in stateList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="voter_id_number" style="width: 50%">
                        <label style="display: block; text-align: center">Titulo de Eleitor</label>
                        <el-input v-model="user.voter_id_number" placeholder="Titulo de Eleitor" required
                                  style="width: 120%"/>
                    </el-form-item>

                    <el-form-item prop="voter_id_zone">
                        <label style="display: block; text-align: center">Zona de Eleitorado</label>
                        <el-input v-model="user.voter_id_zone" placeholder="Zona de Eleitorado" required
                                  style="width: 120%"/>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">

                    <el-form-item prop="voter_id_section" style="width: 50%">
                        <label style="display: block; text-align: center">Seção de Eleitorado</label>
                        <el-input v-model="user.voter_id_section" placeholder="Seção de Eleitorado" required
                                  style="width: 120%"/>
                    </el-form-item>


                    <el-form-item prop="voter_id_state">
                        <label style="display: block; text-align: center"> Estado do Titulo de Eleitor</label>
                        <el-select v-model="user.voter_id_state" filterable required style="width: 120%">
                            <el-option
                                    v-for="item in stateList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">

                    <el-form-item prop="cep" style="width: 50%">
                        <label style="display: block; text-align: center">CEP</label>
                        <el-input v-model="user.cep" placeholder="CEP" required style="width: 120%"/>
                    </el-form-item>


                    <el-form-item prop="state">
                        <label style="display: block; text-align: center">Estado</label>

                        <el-select v-model="user.state_id" filterable required style="width: 120%">
                            <el-option
                                    v-for="item in stateList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">

                    <el-form-item prop="city" style="width: 50%">
                        <label style="display: block; text-align: center">Cidade</label>
                        <el-input v-model="user.city" placeholder="Cidade" required style="width: 120%"/>
                    </el-form-item>


                    <el-form-item prop="neighborhood">
                        <label style="display: block; text-align: center">Bairro</label>
                        <el-input v-model="user.neighborhood" placeholder="Neighborhood" required style="width: 120%"/>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="street" style="width: 50%">
                        <label style="display: block; text-align: center">Rua</label>
                        <el-input v-model="user.street" placeholder="Street" required style="width: 120%"/>
                    </el-form-item>


                    <el-form-item prop="number">
                        <label style="display: block; text-align: center">Número</label>
                        <el-input-number v-model="user.number" :min="0" placeholder="Number" required
                                         style="width: 120%"/>
                    </el-form-item>
                </div>
            </div>

            <div class="row" style="margin-top: 10px">
                <div class="form-group el-form--inline">
                    <el-form-item prop="mother_name" style="width: 50%">
                        <label style="display: block; text-align: center">Nome da Mãe</label>
                        <el-input v-model="user.mother_name" placeholder="Nome da Mãe" required style="width: 120%"/>
                    </el-form-item>


                    <el-form-item prop="father_name">
                        <label style="display: block; text-align: center">Nome da Pai</label>
                        <el-input v-model="user.father_name" placeholder="Nome da Pai" required style="width: 120%"/>
                    </el-form-item>
                </div>
            </div>
            <el-form-item>
                <label style="display: block">Polo</label>
                <el-select v-model="user.university_campus.id">
                    <el-option
                            v-for="campusToShow in this.universityCampusList"
                            :key="campusToShow.id"
                            :label="campusToShow.name"
                            :value="campusToShow.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="telephones">
                <label style="display: block">Telefones</label>
                <div v-for="(line, index) in user.telephones" :key="index" class="row" style="margin-top: 10px">
                    <div class="row">
                        <el-input v-model="line.telephone_number" placeholder="Telefones" style="width: 72%;"/>
                        <el-button type="danger" round icon="el-icon-delete" @click="removeLine(index)"/>
                        <el-button v-if="index + 1 === user.telephones.length" type="primary" round icon="el-icon-plus"
                                   @click="addLine"/>
                    </div>
                </div>
            </el-form-item>

        <el-form-item label="Facebook" prop="facebook_link">
            <el-input v-model="user.facebook_link" placeholder="Perfil Facebook"/>
        </el-form-item>
        <el-form-item label="Instagram" prop="instagram_link">
            <el-input v-model="user.instagram_link" placeholder="Perfil Instagram"/>
        </el-form-item>
        <el-form-item label="Whatsapp" prop="whatsapp_number">
            <el-input v-model="user.whatsapp_number" placeholder="Numero Whatsapp"/>
        </el-form-item>

            <el-form-item>
                <label style="display: block">Cursos</label>
                <div v-for="(line, index) in user.programs" :key="index" class="row" style="margin-top: 10px">
                    <div class="row">
                        <el-select v-model="line.id" label="Courses">
                            <el-option
                                    v-for="item in programList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            />
                        </el-select>
                        <el-button type="danger" round icon="el-icon-delete" @click="removeLineCourse(index)"/>
                        <el-button v-if="index + 1 === user.programs.length" type="primary" round
                                   icon="el-icon-plus" @click="addLineCourse"/>
                    </div>
                </div>
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

      <el-dialog :visible.sync="listCourseVisible" :title="'Cursos'">
          <el-table :data="courseList" style="width: 100%;margin-top:30px;" border>
              <el-table-column align="center" label="Nome do Curso" width="220" fixed>
                  <template slot-scope="scope">
                      {{ scope.row.name }}
                  </template>
              </el-table-column>
              <el-table-column align="center" label="Status" fixed>
                  <template slot-scope="scope">
                      {{ scope.row.status }}
                  </template>
              </el-table-column>
          </el-table>
      </el-dialog>

  </div>
</template>
<script>
import { deepClone } from '@/utils'
import {getUsers, addUser, deleteUser, updateUser, getRoleUsers, getUserCourse} from '@/api/user'
import { getStates } from '@/api/state'
import { validUsername } from '@/utils/validate'
import {permission} from '@/directive/permission/index.js'
import {checkPermission} from '@/utils/permission'
import {store} from '@/store'
import {getCountries} from '@/api/country'
import { enableProgram } from '@/api/program'
import { getCampus } from '@/api/university_campus'

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
    type: '',
    cep: '',
    state_id: '',
    telephones: [],
    programs: [],
    university_campus: {
        id: '',
        name: ''
    }
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

const defaultProgram = {
    id: '',
    name: '',
    code: ''
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
        listCourseVisible: false,
      dialogTelephone: false,
      dialogType: 'new',
      checkStrictly: false,
      usersList: [],
      stateList: [],
        rolesList: [],
        countriesList: [],
        courseList: [],
        programList: [],
        universityCampusList: [],
        program: Object.assign({}, defaultProgram),
        typesList: Object.assign({}, types),
      statusList: Object.assign({}, status),
      sendTypesList: Object.assign({}, sendTypes),
      sendStatusList: Object.assign({}, sendStatus),
        user: Object.assign({}, defaultUser),
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
      this.getProgram()
      this.getCampus()
  },
  methods: {
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
      async getProgram() {
          const res = await enableProgram()
          this.programList = res.data
      },
      async getCampus() {
          const res = await getCampus()
          this.universityCampusList = res.data
      },
    handleaddUser() {
      this.user = Object.assign({}, defaultUser)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
        this.addLine()
        this.addLineCourse()
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
        this.user = deepClone(scope.row)
        this.addLine()
        this.addLineCourse()
        this.dialogVisible = true
      this.checkStrictly = true
    },

     async listUserCourse(scope) {
          this.user = deepClone(scope.row)
          const res = await getUserCourse(this.user.id)
          this.courseList = this.changeType(res.data)
         this.listCourseVisible = true
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
                  const {data} = response
                  this.user.user_type = data.user_type
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
                  this.user.user_type = data.user_type
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
          if (this.usersList[index].email === email && this.usersList[index].id !== user_id) {
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
    },
      addLine() {
          const checkEmptyLines = this.user.telephones.filter(line => line.telephone_number === null)
          if (checkEmptyLines.length >= 1 && this.user.telephones.length > 0) {
              return
          }
          this.user.telephones.push({
              id: null,
              telephone_number: null
          })
      },
      removeLine(lineId) {
          if (this.user.telephones.length > 1) {
              this.user.telephones.splice(lineId, 1)
          }
      },
      addLineCourse() {
          console.log(this.user.programs)
          const checkEmptyLines = this.user.programs.filter(line => line.id === null)
          if (checkEmptyLines.length >= 1 && this.user.programs.length > 0) {
              return
          }
          this.user.programs.push({
              id: null,
              name: null
          })
      },
      removeLineCourse(lineId) {
          console.log(this.user.programs)
          console.log(lineId)
          if (this.user.programs.length > 1) {
              console.log('Entrou no item')
              this.user.programs.splice(lineId, 1)
          }
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
