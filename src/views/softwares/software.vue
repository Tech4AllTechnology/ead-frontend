<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddSoftware">
      {{ $t('software.addSoftware') }}
    </el-button>

    <el-table :data="softwareList" style="width: 100%;margin-top:30px;" border max-height="250">
      <el-table-column align="center" label="Nome do Software" fixed>
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status" fixed>
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column :data="softwareList" align="center" label="Operações" fixed>
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 'ativo'" type="primary" size="small" @click="enableDisable(scope, 0)">
            {{ $t('software.disable') }}
          </el-button>
          <el-button v-if="scope.row.status == 'inativo'" type="primary" size="small" @click="enableDisable(scope, 1)">
            {{ $t('software.enable') }}
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('software.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('software.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Editar Software':'Novo Software'">
      <el-form ref="software" :model="software" label-width="80px" :rules="softwareRules" label-position="left">
        <el-form-item label="Nome" prop="name">
          <el-input ref="name" v-model="software.name" placeholder="Nome do Software" />
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-select ref="status" v-model="software.status">
            <el-option value="1" label="Ativo">Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('software.cancel') }}
        </el-button>
        <el-button type="primary" :loading="loading" @click.native.prevent @click="confirmRole">
          {{ $t('software.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getSoftware, addSoftware, deleteSoftware, updateSoftware } from '@/api/software'

const defaultSoftware = {
  id: '',
  name: '',
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
    const validateEmpty = (rule, value, callback) => {
      if (!value) {
        callback(new Error('O campo não pode ser vazio!'))
      } else {
        if (this.checkIfNameExists(value, this.software.id)) {
          callback(new Error('Já existe um software cadastrado com esse nome!'))
        } else {
          callback()
        }
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
    return {
      formReady: false,
      loading: false,
      software: Object.assign({}, defaultSoftware),
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      softwareList: [],
      statusList: Object.assign({}, status),
      sendStatusList: Object.assign({}, sendStatus),
      softwareRules: {
        status: [{ required: true, trigger: 'blur', validator: validateStatus }],
        name: [{ required: true, trigger: 'blur', validator: validateEmpty }]
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
    this.getSoftware()
  },
  methods: {
    closeDialog() {
      this.$refs.software.resetFields()
      this.dialogVisible = false
    },
    async getSoftware() {
      const res = await getSoftware()
      this.softwareList = this.changeType(res.data)
    },
    handleaddSoftware() {
      this.software = Object.assign({}, defaultSoftware)
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
      this.software = deepClone(scope.row)
    },
    enableDisable(scope, status) {
      this.dialogType = 'edit'
      this.software = deepClone(scope.row)
      this.software.status = status
      this.confirmRole()
    },
    handleDelete({ $index, row }) {
      this.$confirm('Deseja remover o software?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteSoftware(row.id)
          this.softwareList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Software deletado com sucesso!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    confirmRole() {
      this.$refs.software.validate(valid => {
        const isEdit = this.dialogType === 'edit'
        if (valid) {
          this.loading = true
          if (isEdit) {
            new Promise((resolve, reject) => {
              updateSoftware(this.software.id, this.changeSendType(this.software)).then(response => {
                for (let index = 0; index < this.softwareList.length; index++) {
                  if (this.softwareList[index].id === this.software.id) {
                    this.softwareList.splice(index, 1, Object.assign({}, this.changeType(this.software)))
                  }
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          } else {
            new Promise((resolve, reject) => {
              addSoftware(this.changeSendType(this.software)).then(response => {
                const { data } = response
                this.software.id = data.key
                this.softwareList.push(this.changeType(this.software))
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }

          this.loading = false
          const { name } = this.software
          this.dialogVisible = false
          this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `
            <div>Software: ${name}</div>
          `,
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          this.loading = false
          return false
        }
      })
    },
    changeType(software) {
      if (Array.isArray(software)) {
        for (let index = 0; index < software.length; index++) {
          software[index].status = this.statusList[software[index].status]
        }
        return software
      }
      software.status = this.statusList[software.status]
      return software
    },
    changeSendType(software) {
      console.log(software.status + ' ' + this.sendStatusList[software.status])
      if (this.sendStatusList[software.status] || software.status == 'Inativo') {
        software.status = this.sendStatusList[software.status]
      }
      return software
    },
    checkIfNameExists(name, software_id) {
      for (let index = 0; index < this.softwareList.length; index++) {
        // eslint-disable-next-line eqeqeq
        if (this.softwareList[index].name == name && this.softwareList[index].id != software_id) {
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
