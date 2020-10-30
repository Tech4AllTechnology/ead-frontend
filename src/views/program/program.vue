<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddProgram">
      {{ $t('program.addProgram') }}
    </el-button>

    <el-table :data="programList" style="width: 100%;margin-top:30px;" border>
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
      <el-table-column align="center" label="Reconhecido pelo MEC" fixed>
        <template slot-scope="scope">
          {{ scope.row.recognized_by_mec }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operações" fixed>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="listCourse(scope)">
            {{ $t('program.listCourses') }}
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('program.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('program.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Editar Curso':'Novo Curso'">
      <el-form ref="program" :model="program" :rules="programRules" label-width="200px" label-position="left">
        <el-form-item label="Nome" prop="name">
          <el-input v-model="program.name" placeholder="Nome" />
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="program.status">
            <el-option value="1" label="Ativo">Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Reconhecido pelo MEC" prop="recognized_by_mec">
          <el-select v-model="program.recognized_by_mec">
            <el-option value="1" label="Ativo">Sim</el-option>
            <el-option value="0" label="Inativo">Não</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tipo do Curso" prop="program_type">
          <el-select v-model="program.program_type">
            <el-option value="1" label="Graduação">Graduação</el-option>
            <el-option value="2" label="Pós-Graduação">Pós-Graduação</el-option>
            <el-option value="3" label="Técnico">Técnico</el-option>
            <el-option value="4" label="Livre">Livre</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Responsável do Polo" prop="responsible_id">
          <el-select v-model="program.responsible_id" required>
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item v-if="dialogType!=='edit'" label="Criar matérias automaticamente" prop="automatic_courses">
          <el-select v-model="program.automatic_courses">
            <el-option value="1" label="Sim">Sim</el-option>
            <el-option value="0" label="Não">Não</el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="program.automatic_courses == '1' && dialogType!=='edit'" label="Quantidade de matérias" prop="recognized_by_mec">
          <el-input-number v-model="program.quantity_courses" :min="1" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('program.cancel') }}
        </el-button>
        <el-button type="primary" :loading="loading" @click.native.prevent="confirmRole">
          {{ $t('program.confirm') }}
        </el-button>
      </div>
    </el-dialog>



      <el-dialog :visible.sync="listCourseVisible" :title="listName">
          <el-table :data="courseList" style="width: 100%;margin-top:30px;" border>
              <el-table-column align="center" label="Nome da Matéria" width="220" fixed>
                  <template slot-scope="scope">
                      {{ scope.row.name }}
                  </template>
              </el-table-column>
              <el-table-column align="center" label="Periodo" fixed>
                  <template slot-scope="scope">
                      {{ scope.row.period }}
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
import { getProgram, addProgram, deleteProgram, updateProgram, getProgramCourses } from '@/api/program'
import { getAdminUsers } from '@/api/user'
import { permission } from '@/directive/permission/index.js'

const defaultProgram = {
  id: '',
  name: '',
  code: '',
  status: '',
  automatic_courses: '',
  quantity_courses: '',
  recognized_by_mec: '',
  program_type: '',
  responsible_id: '',
  responsible: []
}

const defaultCourse = {
    id: '',
    name: '',
    code: '',
    credit: '',
    status: '',
    period: '',
    program_items: []
}

const status = {
  1: 'Ativo',
  0: 'Inativo'
}

const sendStatus = {
  'Ativo': 1,
  'Inativo': 0
}

const recognizedByMec = {
  1: 'Sim',
  0: 'Não'
}

const sendrecognizedByMec = {
  'Sim': 1,
  'Não': 0
}

const programType = {
  1: 'Graduação',
  2: 'Pós-Graduação',
  3: 'Técnico',
  4: 'Livre'
}

const sendProgramType = {
  'Graduação': 1,
  'Pós-Graduação': 2,
  'Técnico': 3,
  'Livre': 4
}

export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('O campo não pode ser vazio.'))
      } else {
        if (this.checkIfNameExists(value, this.program.id)) {
          callback(new Error('Já existe um curso cadastrado com esse nome.'))
        } else {
          callback()
        }
      }
    }
    const validateStatus = (rule, value, callback) => {
      var statusValidate = [1, 0, '1', '0', 'Ativo', 'Inativo']
      if (statusValidate.includes(value)) {
        callback()
      } else {
        callback(new Error('Selecione um status válido.'))
      }
    }
    const validateReconizedByMEC = (rule, value, callback) => {
      var statusValidate = [1, 0, '1', '0', 'Sim', 'Não']
      if (statusValidate.includes(value)) {
        callback()
      } else {
        callback(new Error('Informe se o curso é reconhecido ou não pelo MEC.'))
      }
    }

    const validateProgramType = (rule, value, callback) => {
      callback()
      if (this.programType) {
        callback()
      } else {
        callback(new Error('Informe um tipo de curso correto.'))
      }
    }

    return {
      loading: false,
      program: Object.assign({}, defaultProgram),
      courseList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      programList: [],
      userList: [],
      listCourseVisible: false,
      statusList: Object.assign({}, status),
      recognizedByMec: Object.assign({}, recognizedByMec),
      programType: Object.assign({}, programType),
      sendStatusList: Object.assign({}, sendStatus),
      sendrecognizedByMec: Object.assign({}, sendrecognizedByMec),
      sendProgramType: Object.assign({}, sendProgramType),
      programRules: {
        status: [{ required: true, trigger: 'blur', validator: validateStatus }],
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        recognized_by_mec: [{ required: true, trigger: 'blur', validator: validateReconizedByMEC }],
        program_type: [{ required: true, trigger: 'blur', validator: validateProgramType }]
      },
      listName: ""
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getProgram()
    this.getUsers()
  },
  methods: {
    closeDialog() {
      this.$refs.program.resetFields()
      this.dialogVisible = false
    },
    async getProgram() {
      const res = await getProgram()
      this.programList = this.changeType(res.data)
    },
    async getUsers() {
      const users = await getAdminUsers()
      this.userList = users.data
    },
    handleaddProgram() {
      this.program = Object.assign({}, defaultProgram)
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
      this.program = deepClone(scope.row)
    },
    async listCourse(scope) {
        this.dialogVisible = false
        this.program = deepClone(scope.row)
        const res = await getProgramCourses(this.program.id)
        this.courseList = this.changeType(res.data)
        this.listName = "Lista de Matérias do Curso: " + this.program.name
        this.listCourseVisible = true
    },
    handleDelete({ $index, row }) {
      this.$confirm('Deseja desabilitar o curso? \n Todas as matérias e turmas serão canceladas.', 'Atenção', {
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      })
        .then(async() => {
          await deleteProgram(row.id)
          this.programList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Desabilitado com sucesso!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    confirmRole() {
      this.$refs.program.validate(valid => {
        const isEdit = this.dialogType === 'edit'
        if (valid) {
          this.loading = true
          if (isEdit) {
            new Promise((resolve, reject) => {
              updateProgram(this.program.id, this.changeSendType(this.program)).then(response => {
                for (let index = 0; index < this.programList.length; index++) {
                  if (this.programList[index].id === this.program.id) {
                    this.programList.splice(index, 1, Object.assign({}, this.changeType(this.program)))
                  }
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          } else {
            new Promise((resolve, reject) => {
              addProgram(this.changeSendType(this.program)).then(response => {
                const { data } = response
                this.program.id = data.key
                this.program.code = data.code
                this.programList.push(this.changeType(this.program))
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }

          this.loading = false
          const { name } = this.program
          this.dialogVisible = false
          this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `<div>Curso: ${name}</div>`,
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          this.loading = false
          return false
        }
      })
    },
    changeType(programs) {
      if (Array.isArray(programs)) {
        for (let index = 0; index < programs.length; index++) {
          if (this.statusList[programs[index].status]) {
            programs[index].status = this.statusList[programs[index].status]
          }

          if (this.recognizedByMec[[programs[index].recognized_by_mec]]) {
            programs[index].recognized_by_mec = this.recognizedByMec[programs[index].recognized_by_mec]
          }

          if (this.programType[[programs[index].program_type]]) {
            programs[index].program_type = this.programType[programs[index].program_type]
          }
        }
        return programs
      }
      if (this.statusList[programs.status]) {
        programs.status = this.statusList[programs.status]
      }

      if (this.recognizedByMec[programs.recognized_by_mec]) {
        programs.recognized_by_mec = this.recognizedByMec[programs.recognized_by_mec]
      }

      if (this.programType[programs.program_type]) {
        programs.program_type = this.programType[programs.program_type]
      }

      return programs
    },
    checkIfCodeExists(code, program_id) {
      for (let index = 0; index < this.programList.length; index++) {
        if (this.programList[index].code == code && this.programList[index].id != program_id) {
          return true
        }
      }
      return false
    },
    checkIfNameExists(name, program_id) {
      for (let index = 0; index < this.programList.length; index++) {
        if (this.programList[index].name == name && this.programList[index].id != program_id) {
          return true
        }
      }
      return false
    },
    changeSendType(program) {
      if (this.sendStatusList[program.status] || program.status == 'Inativo') {
        program.status = this.sendStatusList[program.status]
      }

      if (this.sendProgramType[program.program_type]) {
        program.program_type = this.sendProgramType[program.program_type]
      }

      if (this.sendrecognizedByMec[program.recognized_by_mec]) {
        program.recognized_by_mec = this.sendrecognizedByMec[program.recognized_by_mec]
      }

      return program
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
