<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddCourse">
      {{ $t('course.addCourse') }}
    </el-button>

    <el-table :data="courseList" style="width: 100%;margin-top:30px;" border max-height="250">
      <el-table-column align="center" label="Nome da Matéria" width="220" fixed>
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Código" fixed>
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status" fixed>
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Curso" fixed>
        <template slot-scope="scope">
          {{ scope.row.program.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Crédito" fixed>
        <template slot-scope="scope">
          {{ scope.row.credit }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operações" fixed>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('course.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('course.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Editar Matéria':'Nova Matéria'">
      <el-form ref="course" :model="course" :rules="courseRules" label-width="80px" label-position="left">
        <el-form-item label="Nome">
          <el-input v-model="course.name" placeholder="Nome" required />
        </el-form-item>
        <el-form-item label="Crédito" prop="credit">
          <el-input-number v-model="course.credit" :min="1" placeholder="Crédito" required />
        </el-form-item>
        <el-form-item label="Código" prop="code">
          <el-input v-model="course.code" placeholder="Código" required />
        </el-form-item>
        <el-form-item ref="program.id" label="Curso" prop="program.id">
          <el-select v-model="course.program.id" required>
            <el-option
              v-for="item in programList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="course.status" required>
            <el-option value="1" label="Ativo">Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Periodo" prop="period">
          <el-select v-model="course.period" required>
            <el-option value="11" label="Anual">Anual</el-option>
            <el-option value="1" label="1º">1º</el-option>
            <el-option value="2" label="2º">2º</el-option>
            <el-option value="3" label="3º">3º</el-option>
            <el-option value="4" label="4º">4º</el-option>
            <el-option value="5" label="5º">5º</el-option>
            <el-option value="6" label="6º">6º</el-option>
            <el-option value="7" label="7º">7º</el-option>
            <el-option value="8" label="8º">8º</el-option>
            <el-option value="9" label="9º">9º</el-option>
            <el-option value="10" label="10º">10º</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('course.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('course.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getCourse, addCourse, deleteCourse, updateCourse } from '@/api/course'
import { enableProgram } from '@/api/program'

const defaultCourse = {
  id: '',
  name: '',
  code: '',
  credit: '',
  status: '',
  period: '',
  program: {
    id: '',
    name: ''
  }
}

const defaultProgram = {
  id: '',
  name: '',
  code: ''
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
  data() {
    const validateStatus = (rule, value, callback) => {
      var status_validate = [1, 0, '1', '0', 'Ativo', 'Inativo']
      if (status_validate.includes(value)) {
        callback()
      } else {
        callback(new Error('Selecione um status válido.'))
      }
    }
    const validateEmpty = (rule, value, callback) => {
      if (!value) {
        callback(new Error('O campo não pode ser vazio.'))
      } else {
        callback()
      }
    }
    const validateProgram = (rule, value, callback) => {
      if (value) {
        if (this.checkIfProgramExists(value)) {
          callback(new Error('Selecione um curso válido.'))
        } else {
          callback()
        }
      } else {
        callback(new Error('Selecione um curso válido.'))
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('O campo não pode ser vazio.'))
      } else {
        if (this.checkIfCodeExists(value, this.course.id)) {
          callback(new Error('Já existe uma matéria cadastrada com esse código.'))
        } else {
          callback()
        }
      }
    }
    return {
      course: Object.assign({}, defaultCourse),
      program: Object.assign({}, defaultProgram),
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      courseList: [],
      programList: [],
      statusList: Object.assign({}, status),
      sendStatusList: Object.assign({}, sendStatus),
      courseRules: {
        status: [{ required: true, trigger: 'blur', validator: validateStatus }],
        credit: [{ required: true, trigger: 'blur', validator: validateEmpty }],
        'program.id': [{ required: true, trigger: 'blur', validator: validateProgram }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }],
        period: [{ required: true, trigger: 'blur', validator: validateEmpty }]
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
    this.getProgram()
    this.getCourse()
  },
  methods: {
    closeDialog() {
      this.$refs.course.resetFields()
      this.dialogVisible = false
    },
    async getCourse() {
      const res = await getCourse()
      this.courseList = this.changeType(res.data)
    },
    async getProgram() {
      const res = await enableProgram()
      this.programList = res.data
    },
    handleaddCourse() {
      this.course = Object.assign({}, defaultCourse)
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
      this.course = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('Deseja remover a matéria?', 'Warning', {
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      })
        .then(async() => {
          await deleteCourse(row.id)
          this.courseList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Removido com sucesso!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    confirmRole() {
      this.$refs.course.validate(valid => {
        const isEdit = this.dialogType === 'edit'
        if (valid) {
          this.formReady = true
          this.loading = true
          if (isEdit) {
            new Promise((resolve, reject) => {
              updateCourse(this.course.id, this.changeSendType(this.course)).then(response => {
                for (let index = 0; index < this.courseList.length; index++) {
                  if (this.courseList[index].id === this.course.id) {
                    this.courseList.splice(index, 1, Object.assign({}, this.changeType(this.course)))
                    break
                  }
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          } else {
            new Promise((resolve, reject) => {
              addCourse(this.changeSendType(this.course)).then(response => {
                const { data } = response
                this.course.id = data.key
                this.courseList.push(this.changeType(this.course))
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }
          this.loading = false

          const { name } = this.course
          this.dialogVisible = false
          this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `<div>Matéria: ${name}</div>`,
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

    changeType(courses) {
      if (Array.isArray(courses)) {
        for (let index = 0; index < courses.length; index++) {
          courses[index].status = this.statusList[courses[index].status]
        }
        return courses
      }
      courses.status = this.statusList[courses.status]
      return courses
    },
    changeSendType(course) {
      if (this.sendStatusList[course.status] || course.status == 'Inativo') {
        course.status = this.sendStatusList[course.status]
      }
      for (let index = 0; index < this.programList.length; index++) {
        // eslint-disable-next-line eqeqeq
        if (this.programList[index].id == course.program.id) {
          course.program.name = this.programList[index].name
        }
      }

      return course
    },
    checkIfProgramExists(id) {
      for (let index = 0; index < this.programList.length; index++) {
        // eslint-disable-next-line eqeqeq
        if (this.programList[index].id == id) {
          return false
        }
      }
      return true
    },
    checkIfCodeExists(code, course_id) {
      for (let index = 0; index < this.courseList.length; index++) {
        // eslint-disable-next-line eqeqeq
        if (this.courseList[index].code == code && this.courseList[index].id != course_id) {
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
