<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddProgram">
      {{ $t('program.addProgram') }}
    </el-button>

    <el-table :data="programList" style="width: 100%;margin-top:30px;" border max-height="250">
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
      <el-table-column align="center" label="Operações" fixed>
        <template slot-scope="scope">
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
      <el-form ref="program" :model="program" :rules="programRules" label-width="80px" label-position="left">
        <el-form-item label="Nome" prop="name">
          <el-input v-model="program.name" placeholder="Nome" />
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select v-model="program.status">
            <el-option value="1" label="Ativo">Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
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
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getProgram, addProgram, deleteProgram, updateProgram } from '@/api/program'

const defaultProgram = {
  id: '',
  name: '',
  code: '',
  status: ''
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

    return {
      loading: false,
      program: Object.assign({}, defaultProgram),
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      programList: [],
      statusList: Object.assign({}, status),
      sendStatusList: Object.assign({}, sendStatus),
      programRules: {
          status: [{ required: true, trigger: 'blur', validator: validateStatus }],
          name: [{ required: true, trigger: 'blur', validator: validateName }]
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
    handleDelete({ $index, row }) {
      this.$confirm('Deseja desabilitar o curso?', 'Warning', {
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
                              this.programList.push(this.changeType(this.program))
                              resolve()
                          }).catch(error => {
                              reject(error)
                          })
                      })
                  }

                  this.loading = false
                  const { name } = this.program
                  this.dialogVisible=false
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
        }
        return programs
      }
      if (this.statusList[programs.status]) {
        programs.status = this.statusList[programs.status]
      }
      return programs
    },
      checkIfCodeExists(code, program_id) {
          for (let index = 0; index < this.programList.length; index++) {
              // eslint-disable-next-line eqeqeq
              if (this.programList[index].code == code && this.programList[index].id != program_id) {
                  return true
              }
          }
          return false
      },
      checkIfNameExists(name, program_id) {
          for (let index = 0; index < this.programList.length; index++) {
              // eslint-disable-next-line eqeqeq
              if (this.programList[index].name == name && this.programList[index].id != program_id) {
                  return true
              }
          }
          return false
      },
      changeSendType(program) {
          if (this.sendStatusList[program.status]  || program.status == 'Inativo') {
              program.status = this.sendStatusList[program.status]
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
